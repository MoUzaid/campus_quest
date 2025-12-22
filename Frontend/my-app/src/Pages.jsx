import React from 'react'
import { Routes, Route } from 'react-router-dom';
import CreateQuiz from './pages/CreateQuiz';
import Login from './pages/Login';
import Signup from './pages/Signup';

const Pages = () => {
  return (
    <div>
      <Routes>
        <Route path="/create-quiz" element={<CreateQuiz />} />
        <Route path="/student/login" element={<Login />} />
        <Route path="/student/signup" element={<Signup />} />
      </Routes>
    </div>
  )
}

export default Pages