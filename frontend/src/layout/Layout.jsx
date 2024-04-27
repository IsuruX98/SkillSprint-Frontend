import React from "react";
import { useLocation } from "react-router-dom";
import Router from "../router/Router";
import Navbar from "../components/NavBar/Navbar";
import Footer from "../components/Footer/Footer";

const Layout = () => {
  const location = useLocation();

  // Check if the current path is '/admin'
  const isAdminRoute = location.pathname === "/admin";

  return (
    <div>
      {/* Render Navbar and Footer only if it's not an admin route */}
      {!isAdminRoute && <Navbar />}
      <Router />
      {!isAdminRoute && <Footer />}
    </div>
  );
};

export default Layout;
