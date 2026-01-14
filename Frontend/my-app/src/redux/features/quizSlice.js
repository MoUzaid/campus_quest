import { createSlice } from "@reduxjs/toolkit";

const initialQuestion = {
  questionText: "",
  imageUrl: [],
  options: ["", "", "", ""],
  correctAnswer: "",
  marks: 0,
  negativeMarks: 0,
};

const initialState = {
  quizTitle: "",
  subject: "",
  description: "",
  department: "",

  selectedCourses: [],
  selectedYears: [],
  selectedGroups: [],

  totalQuestions: 0,
  questions: [],

  marksPerQuestion: 0,
  negativeMarksPerQuestion: 0,
  negativeMark: false,

  totalMarks: 0,
  passingMarks: 0,

  startDate: "",
  startTime: "",
  endDate: "",
  endTime: "",
  durationMinutes: "",
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQuizTitle(state, action) {
      state.quizTitle = action.payload;
    },
    setSubject(state, action) {
      state.subject = action.payload;
    },
    setDescription(state, action) {
      state.description = action.payload;
    },
    setDepartment(state, action) {
      state.department = action.payload;
    },

    setSelectedCourses(state, action) {
      state.selectedCourses = action.payload;
    },
    setSelectedYears(state, action) {
      state.selectedYears = action.payload;
    },
    setSelectedGroups(state, action) {
      state.selectedGroups = action.payload;
    },

    setTotalQuestions(state, action) {
      state.totalQuestions = action.payload;

      state.questions = Array.from(
        { length: action.payload },
        () => ({
          ...initialQuestion,
          marks: state.marksPerQuestion,
          negativeMarks: state.negativeMarksPerQuestion,
        })
      );

      state.totalMarks =
        action.payload * state.marksPerQuestion;
    },

   setMarksPerQuestion(state, action) {
  const value = Math.abs(Number(action.payload)) || 0;

  state.marksPerQuestion = value;

  state.questions.forEach((q) => {
    q.marks = value;
  });

  state.totalMarks = state.totalQuestions * value;
},

    setNegativeMark(state, action) {
      state.negativeMark = action.payload;

      if (!action.payload) {
        state.negativeMarksPerQuestion = 0;
        state.questions.forEach((q) => {
          q.negativeMarks = 0;
        });
      }
    },

    setNegativeMarksPerQuestion(state, action) {
      state.negativeMarksPerQuestion = action.payload;

      state.questions.forEach((q) => {
        q.negativeMarks = action.payload;
      });
    },

    updateQuestion(state, action) {
      const { index, field, value } = action.payload;
      if (state.questions[index]) {
        state.questions[index][field] = value;
      }
    },

    setPassingMarks(state, action) {
      state.passingMarks = action.payload;
    },

    setStartDate(state, action) {
      state.startDate = action.payload;
    },
    setStartTime(state, action) {
      state.startTime = action.payload;
    },
    setEndDate(state, action) {
      state.endDate = action.payload;
    },
    setEndTime(state, action) {
      state.endTime = action.payload;
    },
    setDurationMinutes(state, action) {
      state.durationMinutes = action.payload;
    },
    initializeQuestionsFromAI(state, action) {
  const aiQuestions = action.payload;

  state.totalQuestions = aiQuestions.length;

  state.questions = aiQuestions.map((q) => ({
    questionText: q.questionText || "",
    imageUrl: [],
    options: q.options || ["", "", "", ""],
    correctAnswer: q.correctAnswer || "",
    marks: state.marksPerQuestion,
    negativeMarks: state.negativeMarksPerQuestion,
  }));

  state.totalMarks =
    state.totalQuestions * state.marksPerQuestion;
}
  },
});

export const {
  setQuizTitle,
  setSubject,
  setDescription,
  setDepartment,
  setSelectedCourses,
  setSelectedYears,
  setSelectedGroups,
  setTotalQuestions,
  setMarksPerQuestion,
  setNegativeMark,
  setNegativeMarksPerQuestion,
  updateQuestion,
  setPassingMarks,
  setStartDate,
  setStartTime,
  setEndDate,
  setEndTime,
  setDurationMinutes,
  resetQuiz,
   initializeQuestionsFromAI,
} = quizSlice.actions;

export default quizSlice.reducer;