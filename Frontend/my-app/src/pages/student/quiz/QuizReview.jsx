import React from 'react'
import { useLocation } from 'react-router-dom'
import { useAttemptedQuizByStudentQuery } from '../../../redux/services/quizApi';
const QuizReview = () => {
    const location = useLocation();
    const {quizId} = location.state || {};
    console.log("Quiz ID for Review:", quizId);
    const {
    data: prevQuiz,
    isLoading,
    isError,
    error,
  } = useAttemptedQuizByStudentQuery(quizId, {
    skip: !quizId,
  });
    console.log("Previous Quiz Data:", prevQuiz);

  return (
    <div>QuizReview</div>
  )
}

export default QuizReview