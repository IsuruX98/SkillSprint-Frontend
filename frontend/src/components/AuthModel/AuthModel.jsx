import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { AiOutlineClose } from "react-icons/ai";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import {
  SuccessNotification,
  ErrorNotification,
} from "../../notifications/notifications";
import { useNavigate } from "react-router-dom";

const AuthModal = ({ isOpen, onClose, mode }) => {
  const [isLogin, setIsLogin] = useState(mode === "login");
  const { register, login, user } = useAuth();
  // const register = () => {};
  // const login = () => {};
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { name, email, password, mobile } = formData;
      const requestData = {
        userName: name,
        email: email.trim(),
        password,
        contactNo: mobile.trim(),
      };

      if (isLogin) {
        const response = await login(requestData);
        console.log(response.data.content.user.userType);
        if (
          response.success &&
          response.data.content.user.userType == "instructor"
        ) {
          SuccessNotification(
            `Welcome Instructor ${response.data.content.user.user_Name}`
          );
          navigate("/");
          onClose();
        } else if (
          response.success &&
          response.data.content.user.userType == "admin"
        ) {
          SuccessNotification(
            `Welcome Admin ${response.data.content.user.user_Name}`
          );
          navigate("/");
          onClose();
        } else if (
          response.success &&
          response.data.content.user.userType == "student"
        ) {
          SuccessNotification(
            `Welcome Student ${response.data.content.user.user_Name}`
          );
          navigate("/");
          onClose();
        } else {
          console.log(response.error);
          ErrorNotification(response.error);
        }
      } else {
        if (!validateFormData()) {
          setLoading(false);
          return;
        }
        const response = await register(requestData);
        if (response.success) {
          SuccessNotification("Registered successfully");
          if (user.userType == "student") {
            navigate("/instructor");
            onClose();
          } else if (user.userType == "admin") {
            navigate("/admin");
            onClose();
          } else if (user.userType == "instructor") {
            navigate("/instructor");
            onClose();
          } else {
            onClose();
          }
        } else {
          console.log(response.error);
          ErrorNotification(response.error);
        }
      }
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error);
    } finally {
      setLoading(false);
    }
  };

  const validateFormData = () => {
    const { name, email, mobile, password, confirmPassword } = formData;

    if (!isLogin && password !== confirmPassword) {
      ErrorNotification("Passwords do not match");
      return false;
    }

    if (!name.trim()) {
      ErrorNotification("Name is required");
      return false;
    }

    if (!email.trim()) {
      ErrorNotification("Email is required");
      return false;
    } else if (!isValidEmail(email)) {
      ErrorNotification("Invalid email address");
      return false;
    }

    if (!mobile.trim()) {
      ErrorNotification("Mobile is required");
      return false;
    } else if (!isValidMobile(mobile)) {
      ErrorNotification("Invalid mobile number");
      return false;
    }

    return true;
  };

  const isValidEmail = (email) => {
    // Basic email format validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidMobile = (mobile) => {
    // Basic mobile number validation (10 digits)
    const mobileRegex = /^\d{10}$/;
    return mobileRegex.test(mobile);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg w-96">
            <div>
              <div className="flex justify-between">
                <h2 className="text-2xl font-bold mb-4 text-black">
                  {isLogin ? "Login" : "Register"}
                </h2>
                <button onClick={onClose}>
                  <AiOutlineClose className="text-black" />
                </button>
              </div>

              {loading ? (
                <LoadingSpinner />
              ) : (
                <>
                  {isLogin ? (
                    <LoginForm
                      onSubmit={handleSubmit}
                      formData={formData}
                      onChange={handleChange}
                    />
                  ) : (
                    <RegisterForm
                      onSubmit={handleSubmit}
                      formData={formData}
                      onChange={handleChange}
                    />
                  )}

                  <p className="text-black mt-4">
                    {isLogin
                      ? "Don't have an account?"
                      : "Already have an account?"}
                    <button
                      onClick={handleToggle}
                      className="text-black ml-1 underline"
                    >
                      {isLogin ? "Register" : "Login"}
                    </button>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthModal;
