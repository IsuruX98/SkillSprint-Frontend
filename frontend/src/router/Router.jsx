import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import CoursePage from "../pages/CoursePage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/courses" element={<CoursePage />} />
    </Routes>
  );
};

export default AppRouter;
