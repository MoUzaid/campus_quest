import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const quizApi = createApi({
  reducerPath: "quizApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/quiz",
    credentials: "include",
  }),

  tagTypes: ["Quiz", "Timer"],

  endpoints: (builder) => ({

    /* ================= QUIZ CRUD ================= */

    createQuiz: builder.mutation({
      query: (formData) => ({
        url: "/create-quiz",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Quiz"],
    }),

    getAllQuizzes: builder.query({
      query: () => "/all-quizzes",
      providesTags: ["Quiz"],
    }),

    getQuizById: builder.query({
      query: (quizId) => `/${quizId}`,
      providesTags: (r, e, quizId) => [{ type: "Quiz", id: quizId }],
    }),

    updateQuizById: builder.mutation({
      query: ({ quizId, data }) => ({
        url: `/${quizId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (r, e, { quizId }) => [
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

    /* ================= STUDENT ================= */

    registerStudentForQuiz: builder.mutation({
      query: ({ quizId }) => ({
        url: `/${quizId}/register-student`,
        method: "POST",
      }),
    }),

    getRegisteredQuizzesForStudent: builder.query({
      query: () => "/my-registered-quizzes",
      providesTags: ["Quiz"],
    }),

    startQuizAttempt: builder.query({
      query: (quizId) => `/${quizId}/start`,
    }),

    submitQuiz: builder.mutation({
      query: ({ quizId, data }) => ({
        url: `/${quizId}/submit`,
        method: "POST",
        body: data,
      }),
    }),

    /* ===== ATTEMPT HISTORY ===== */

    getAllAttemptedQuizzes: builder.query({
      query: () => "/attempted-quizzes",
      providesTags: ["Quiz"],
    }),

    getAttemptedQuizById: builder.query({
      query: (quizId) => `/${quizId}/attempted`,
      providesTags: (r, e, quizId) => [{ type: "Quiz", id: quizId }],
    }),

    /* ================= TIMER ================= */

    startTimer: builder.query({
      query: (quizId) => `/${quizId}/start-timer`,
      providesTags: ["Timer"],
    }),

    startQuizTimer: builder.mutation({
      query: ({ quizId }) => ({
        url: `/${quizId}/start-timer`,
        method: "POST",
      }),
      invalidatesTags: ["Timer"],
    }),

    getQuizTimer: builder.query({
      query: (quizId) => `/${quizId}/timer`,
      providesTags: ["Timer"],
    }),

    /* ================= FACULTY ================= */

    getQuizRegisteredStudents: builder.query({
      query: (quizId) => `/${quizId}/registered-students`,
    }),

    /* ================= CERTIFICATE ================= */

    generateCertificate: builder.mutation({
      query: (data) => ({
        url: "/generate-certificate",
        method: "POST",
        body: data,
      }),
    }),

    /* ================= SUPER ADMIN ================= */

    getQuizzesByDepartment: builder.query({
      query: (department) => `/department/${department}`,
      providesTags: ["Quiz"],
    }),
  }),
});

export const {
  useCreateQuizMutation,
  useGetAllQuizzesQuery,
  useGetQuizByIdQuery,
  useUpdateQuizByIdMutation,
  useDeleteQuizByIdMutation,

  useRegisterStudentForQuizMutation,
  useGetRegisteredQuizzesForStudentQuery,
  useStartQuizAttemptQuery,
  useSubmitQuizMutation,

  useGetAllAttemptedQuizzesQuery,
  useGetAttemptedQuizByIdQuery,

  useStartTimerQuery,
  useStartQuizTimerMutation,
  useGetQuizTimerQuery,

  useGetQuizRegisteredStudentsQuery,
  useGenerateCertificateMutation,
  useGetQuizzesByDepartmentQuery,
} = quizApi;

export default quizApi;
