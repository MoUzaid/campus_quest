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

    attemptedQuizByStudent: builder.query({
      query: (quizId) => `/${quizId}/student`,
      providesTags: (result, error, quizId) => [
        { type: "Quiz", id: quizId },
      ],
    }),

    getAllAttemptedQuizzes: builder.query({
      query: () => '/attempted-quizzes',
      providesTags: ["Quiz"],
    }),

    registerStudentForQuiz: builder.mutation({
      query: ({ quizId, data }) => ({
        url: `/${quizId}/register-student`,
        method: "POST",
        body: data,
      }),
    }),
 
    getRegisteredQuizzesForStudent: builder.query({
      query: () => `/my-registered-quizzes`,
      providesTags: ["Quiz"],
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
  }),
});

export const {
  useCreateQuizMutation,
  useGetAllQuizzesQuery,
  useGetQuizByIdQuery,
  useLazyGetQuizByIdQuery,
  useUpdateQuizByIdMutation,
  useDeleteQuizByIdMutation,
  useAttemptedQuizByStudentQuery,
  useGetAllAttemptedQuizzesQuery,
  useRegisterStudentForQuizMutation,
  useGetRegisteredQuizzesForStudentQuery,
  useSubmitQuizMutation,

  useStartQuizAttemptMutation,
  useStartQuizTimerMutation,

  useGetQuizTimerQuery,
  useGetQuizzesByDepartmentQuery,

  useGenerateCertificateMutation,
} = quizApi;

export default quizApi;
