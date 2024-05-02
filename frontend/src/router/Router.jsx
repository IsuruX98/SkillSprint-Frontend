import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import CoursesPage from "../pages/CoursesPage";
import CourseDetail from "../pages/CourseDetail";
import Dashboard from "../pages/Dashboard";
import LearnModulePage from "../components/LearnModulePage/LearnModulePage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/details" element={<CourseDetail />} />
      <Route path="/admin" element={<Dashboard />} />
      <Route path="/learn-module" element={<LearnModulePage />} />
    </Routes>
  );
};

export default AppRouter;
