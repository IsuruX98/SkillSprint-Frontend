import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import CoursesPage from "../pages/CoursesPage";
import CourseDetail from "../pages/CourseDetail";
import LearnModulePage from "../components/LearnModulePage/LearnModulePage";
import AdminHome from "../pages/Admin/AdminHome";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/details" element={<CourseDetail />} />
      <Route path="/admin" element={<AdminHome />} />
      <Route path="/learn-module" element={<LearnModulePage />} />
    </Routes>
  );
};

export default AppRouter;
