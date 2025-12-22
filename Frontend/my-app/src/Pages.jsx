import React from 'react'
import { Routes, Route } from 'react-router-dom';
import CreateQuiz from './pages/CreateQuiz';
import QuestionsPage from './pages/QuestionsPage';

const Pages = () => {
  return (
    <div>
        <Routes>
        <Route path="/create-quiz" element={<CreateQuiz />} />
        <Route path="/questions" element={<QuestionsPage/>}/>
        </Routes>
    </div>
  )
}

export default Pages