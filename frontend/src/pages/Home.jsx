import React from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar/Navbar";
import Hero from "../components/Hero/Hero";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <Hero />
      <h2>Welcome to the Home Page</h2>
      {user && (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          {/* Add other user details here */}
        </div>
      )}
    </div>
  );
};

export default Home;
