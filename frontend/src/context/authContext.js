import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "../api/axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  console.log(user);

  const fetchUserById = async (userId) => {
    try {
      const response = await axios.get(`users/${userId}`);
      const userData = response.data;
      setUser(userData);
      console.log("userData", userData);
    } catch (error) {
      console.error("Error fetching user profile:", error.response.data);
    } finally {
      setAuthLoading(false); // Set loading to false once user data is fetched or error occurs
    }
  };

  useEffect(() => {
    const jwtToken = Cookies.get("jwt");
    const userIsLoggedIn = jwtToken ? true : false;
    setIsLoggedIn(userIsLoggedIn);

    if (userIsLoggedIn) {
      const decodedToken = jwtDecode(jwtToken);
      const userId = decodedToken.userId;
      fetchUserById(userId);
    } else {
      setAuthLoading(false); // If user is not logged in, set loading to false
    }
  }, []);

  const login = async (formData) => {
    try {
      const response = await axios.post("auth/login", formData);
      console.log(response);
      console.log(response.data);
      Cookies.set("jwt", response.data.content.token, {
        expires: 30,
      });
      setIsLoggedIn(true);
      setUser(response.data.content.user);

      return { success: true, data: response.data };
    } catch (error) {
      let errorMessage = "An error occurred during login.";
      if (
        error.response &&
        error.response.data &&
        error.response.data.content
      ) {
        const { message } = error.response.data.content;
        errorMessage = message || errorMessage;
      }
      console.log("error", errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const register = async (formData) => {
    try {
      const response = await axios.post("auth/signup", formData);
      Cookies.set("jwt", response.data.content.token, {
        expires: 30,
      });
      setIsLoggedIn(true);
      setUser(response.data.content.user);
      return { success: true, data: response.data };
    } catch (error) {
      let errorMessage = "An error occurred during register.";
      if (
        error.response &&
        error.response.data &&
        error.response.data.content
      ) {
        const { message } = error.response.data.content;
        errorMessage = message || errorMessage;
      }
      console.log("error", errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    Cookies.remove("jwt");
    return { success: true, message: "logout successfully" };
  };

  return (
    <AuthContext.Provider
      value={{ user, authLoading, isLoggedIn, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
