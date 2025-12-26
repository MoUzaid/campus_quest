import React from "react";
import { Routes, Route } from "react-router-dom";

import CreateQuiz from "./pages/CreateQuiz";
import QuestionsPage from "./pages/QuestionsPage";

// Student Auth
import Login from "./pages/student/auth/Login";
import Signup from "./pages/student/auth/Signup";

import ForgotPassword from "./pages/student/auth/ForgotPassword";
import ResetPassword from "./pages/student/auth/ResetPassword";


// Student Profile
import Profile from "./pages/student/profile/Profile";


// Student Dashboard & Quiz
import Dashboard from "./pages/student/dashboard/Dashboard";
import QuizDetails from "./pages/student/quiz/QuizDetails";




const Pages = () => {
  return (
    <Routes>
      {/* Faculty / Admin */}
      <Route path="/create-quiz" element={<CreateQuiz />} />
      <Route path="/questions" element={<QuestionsPage />} />

      {/* Student Auth */}
      <Route path="/student/login" element={<Login />} />
      <Route path="/student/signup" element={<Signup />} />

      <Route path="/student/forgot-password" element={<ForgotPassword />} />
      <Route path="/student/reset-password/:token" element={<ResetPassword />} />

   {/* Student Profile */}
      <Route path="/student/profile" element={<Profile />} />


      {/* Student Dashboard */}
      <Route path="/student/dashboard" element={<Dashboard />} />
      <Route path="/student/quiz/:quizId" element={<QuizDetails />} />
    </Routes>
  );
};

export default Pages;
