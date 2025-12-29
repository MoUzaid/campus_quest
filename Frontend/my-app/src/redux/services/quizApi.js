import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const quizApi = createApi({
  reducerPath: "quizApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/quiz",
    credentials: "include", 
  }),

  tagTypes: ["Quiz", "Timer"],

  endpoints: (builder) => ({

    createQuiz: builder.mutation({
      query: (formData) => ({
        url: "/create-quiz",
        method: "POST",
        body: formData, // FormData (multer upload.any)
      }),
      invalidatesTags: ["Quiz"],
    }),

    getAllQuizzes: builder.query({
      query: () => "/all-quizzes",
      providesTags: ["Quiz"],
    }),

    getQuizById: builder.query({
      query: (quizId) => `/${quizId}`,
      providesTags: (result, error, quizId) => [
        { type: "Quiz", id: quizId },
      ],
    }),

    updateQuizById: builder.mutation({
      query: ({ quizId, data }) => ({
        url: `/${quizId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { quizId }) => [
        { type: "Quiz", id: quizId },
      ],
    }),

    deleteQuizById: builder.mutation({
      query: (quizId) => ({
        url: `/${quizId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Quiz"],
    }),

    registerStudentForQuiz: builder.mutation({
      query: ({ quizId, data }) => ({
        url: `/${quizId}/register-student`,
        method: "POST",
        body: data,
      }),
    }),

    submitQuiz: builder.mutation({
      query: ({ quizId, data }) => ({
        url: `/${quizId}/submit`,
        method: "POST",
        body: data,
      }),
    }),

    startQuizAttempt: builder.query({
      query: (quizId) => `/${quizId}/start`,
    }),

    startTimer: builder.query({
      query: (quizId) => `/${quizId}/start-timer`,
      providesTags: ["Timer"],
    }),

    startQuizTimer: builder.mutation({
      query: ({ quizId, data }) => ({
        url: `/${quizId}/start-timer`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Timer"],
    }),

    getQuizTimer: builder.query({
      query: (quizId) => `/${quizId}/timer`,
      providesTags: ["Timer"],
    }),

    generateCertificate: builder.mutation({
      query: (data) => ({
        url: "/generate-certificate",
        method: "POST",
        body: data,
      }),
    }),

    getQuizzesByDepartment: builder.query({
      query: (departmentName) => `/department/${departmentName}`,
      providesTags: ["Quiz"],
    }),
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
  }),
});

export const {
  useCreateQuizMutation,
  useGetAllQuizzesQuery,
  useGetQuizByIdQuery,
  useLazyGetQuizByIdQuery,
  useUpdateQuizByIdMutation,
  useDeleteQuizByIdMutation,
  useRegisterStudentForQuizMutation,
  useSubmitQuizMutation,

  useStartQuizAttemptMutation,
  useStartQuizTimerMutation,

  useGetQuizTimerQuery,
  useGetQuizzesByDepartmentQuery,

  useGenerateCertificateMutation,
} = quizApi;

export default quizApi;
