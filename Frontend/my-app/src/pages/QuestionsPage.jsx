import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateQuestion } from "../redux/features/quizSlice";
import { useNavigate } from "react-router-dom";
import './styles/QuestionPage.css';
import { useCreateQuizMutation } from "../redux/services/quizApi";
import { toast } from "react-toastify";


const QuestionsPage = () => {
  const [createQuiz, { isLoading, isSuccess, isError }] = useCreateQuizMutation();
  const [textareaVal, setTextAreaVal] = useState("");
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { questions } = useSelector((state) => state.quiz);
  const quizData = useSelector((state) => state.quiz);
 

  const handleRemove = (qIndex, imgIndex) => {
    const newImages = [...questions[qIndex].imageUrl];
    newImages.splice(imgIndex, 1);
    dispatch(updateQuestion({ index: qIndex, field: "imageUrl", value: newImages }));
  };

  if (!questions || questions.length === 0) {
    return (
      <div className="empty-state">
        <h3>No questions found</h3>
        <p>Please set total questions first</p>
      </div>
    );
  }
  const handleImageUpload = (e, qIndex) => {
    const files = Array.from(e.target.files);
   const imageUrls = files.map((file) =>
      URL.createObjectURL(file)
    );
    dispatch(
      updateQuestion({
        index: qIndex,
        field: "imageUrl",
        value: imageUrls,
      })
    );
  };

  const handleSubmit=async()=>{
    try{
  const res = await createQuiz({
    quizData
  }).unwrap();
  if(res?.message){
     toast.success(res.message);
    Navigate("/");
  }
}
catch(err){
  alert(err.message);
}
  }


  return (
    <div className="questions-page">
      <h1>{quizData.quizTitle.toUpperCase()}</h1>
      {/* AI Generator */}
      <div className="ai-box">
        <button className="ai-btn" onClick={(e)=>Navigate("/chat")}>Generate with AI </button>
      </div>

      <h2 className="page-title">Add Questions</h2>

      {questions.map((question, qIndex) => (
        <div className="question-card" key={qIndex}>
          <h4 className="question-heading">
            Question {qIndex + 1}
          </h4>

          <textarea
            className="question-input"
            placeholder="Enter question"
            value={question.questionText}
            onChange={(e) =>
              dispatch(
                updateQuestion({
                  index: qIndex,
                  field: "questionText",
                  value: e.target.value,
                })
              )
            }
            rows={4}
          />

          <div className="image-upload">
            <input
              type="file"
              multiple
              onChange={(e) => handleImageUpload(e, qIndex)}
            />
          </div>

          <div className="image-preview">
            {question.imageUrl.map((img, i) => (
                <span key={i}>
              <img src={img} alt="preview" />
              <button onClick={() => handleRemove(qIndex, i)} >Remove</button>
              </span>
            ))}
          </div>

          <div className="options-box">
            {question.options.map((opt, optIndex) => (
              <div className="option-row" key={optIndex}>
                <input
                  type="radio"
                  name={`correct-${qIndex}`}
                  checked={question.correctAnswer === opt}
                  onChange={() =>
                    dispatch(
                      updateQuestion({
                        index: qIndex,
                        field: "correctAnswer",
                        value: opt,
                      })
                    )
                  }
                />

                <input
                  type="text"
                  placeholder={`Option ${optIndex + 1}`}
                  value={opt}
                  onChange={(e) => {
                    const newOptions = [...question.options];
                    newOptions[optIndex] = e.target.value;

                    dispatch(
                      updateQuestion({
                        index: qIndex,
                        field: "options",
                        value: newOptions,
                      })
                    );
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="btn-div">
      <button className="prev-btn btn" onClick={(e)=>Navigate("/create-quiz")}>Prev</button>
      <button className="nxt-btn btn" onClick={handleSubmit}>Create Quiz</button>
      </div>
    </div>
  );
};

export default QuestionsPage;