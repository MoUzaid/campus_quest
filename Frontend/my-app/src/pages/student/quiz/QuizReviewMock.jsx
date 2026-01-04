import React from "react";
import "./QuizReview.css";

const QuizReviewMock = () => {
  const quizTitle = "Sample Quiz";
  const totalQuestions = 3;
  const timeTaken = 754;

  const prevQuiz = {
    quiz: {
      questions: [
        { _id: "1", question: "2 + 2 = ?", correctAnswer: "4" },
        { _id: "2", question: "Capital of India?", correctAnswer: "Delhi" },
        { _id: "3", question: "Sun rises from?", correctAnswer: "East" },
      ],
    },
    answers: [
      { questionId: "1", selectedAnswer: "4" },
      { questionId: "2", selectedAnswer: "Mumbai" },
    ],
  };

  const correct = prevQuiz.quiz.questions.filter((q) => {
    const ans = prevQuiz.answers.find((a) => a.questionId === q._id);
    return ans?.selectedAnswer === q.correctAnswer;
  }).length;

  const wrong = prevQuiz.answers.length - correct;
  const skipped = totalQuestions - prevQuiz.answers.length;
  const accuracy = Math.round((correct / totalQuestions) * 100);

  const minutes = Math.floor(timeTaken / 60);
  const seconds = timeTaken % 60;

  return (
    <div className="quiz-attempt">
      <div className="quiz-attempt-card wide">
        <h1>{quizTitle}</h1>
        <p>Score: {correct} / {totalQuestions}</p>
        <p>Time Taken: {minutes}m {seconds}s</p>
        <p className="meta">
          Accuracy: {accuracy}% | Correct: {correct} | Wrong: {wrong} | Skipped: {skipped}
        </p>

        {prevQuiz.quiz.questions.map((q, i) => {
          const userAnswer = prevQuiz.answers.find(
            (a) => a.questionId === q._id
          )?.selectedAnswer;

          const isCorrect = userAnswer === q.correctAnswer;
          const isSkipped = !userAnswer;

          return (
            <div
              key={q._id}
              className={`review-question ${
                isCorrect ? "correct" : isSkipped ? "skipped" : "wrong"
              }`}
            >
              <h3>Q{i + 1}. {q.question}</h3>
              <p>
                Your Answer:
                <span className={isCorrect ? "green" : "red"}>
                  {userAnswer || "Not Answered"}
                </span>
              </p>
              {!isCorrect && (
                <p>
                  Correct Answer:
                  <span className="green">{q.correctAnswer}</span>
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuizReviewMock;
