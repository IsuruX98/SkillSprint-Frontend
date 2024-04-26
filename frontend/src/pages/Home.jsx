import React from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar/Navbar";
import Hero from "../components/Hero/Hero";
import FeaturedCourses from "../components/FeaturedCourses/FeaturedCourses";
import Services from "../components/Services/Services";
import FAQ from "../components/FAQ/FAQ";
import Footer from "../components/Footer/Footer";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <Hero />
      <Services />
      <FeaturedCourses />
      <FAQ />
    </div>
  );
};

export default Home;
