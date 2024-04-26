import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import CoursePage from "../pages/CoursePage";
import CourseDetail from "../pages/CourseDetail";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/courses" element={<CoursePage />} />
      <Route path="/details" element={<CourseDetail />} />
    </Routes>
  );
};

export default AppRouter;
