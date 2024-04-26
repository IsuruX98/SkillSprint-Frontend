import React from "react";
import Hero from "../components/Hero/Hero";
import FeaturedCourses from "../components/FeaturedCourses/FeaturedCourses";
import Services from "../components/Services/Services";
import FAQ from "../components/FAQ/FAQ";

const Home = () => {
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
