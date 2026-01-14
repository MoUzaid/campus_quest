// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const studentApi = createApi({
//   reducerPath: "studentApi",

//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:5000/students",
//     credentials: "include", // ✅ cookies
//   }),

//   tagTypes: ["Student", "Feedback"],

//   endpoints: (builder) => ({
//     /* ================= AUTH ================= */

//     registerStudent: builder.mutation({
//       query: (data) => ({
//         url: "/register",
//         method: "POST",
//         body: data,
//       }),
//     }),

//     loginStudent: builder.mutation({
//       query: (data) => ({
//         url: "/login",
//         method: "POST",
//         body: data,
//       }),
//     }),

//     logoutStudent: builder.mutation({
//       query: () => ({
//         url: "/logout",
//         method: "POST",
//       }),
//     }),

//     verifyEmail: builder.mutation({
//       query: (data) => ({
//         url: "/verify-email",
//         method: "POST",
//         body: data,
//       }),
//     }),

//     resendOtp: builder.mutation({
//       query: (data) => ({
//         url: "/resend-otp",
//         method: "POST",
//         body: data,
//       }),
//     }),

//     refreshToken: builder.mutation({
//       query: () => ({
//         url: "/refresh",
//         method: "POST",
//       }),
//     }),

//     forgotPassword: builder.mutation({
//       query: (email) => ({
//         url: "/forgot-password",
//         method: "POST",
//         body: { email },
//       }),
//     }),

//     resetPassword: builder.mutation({
//       query: (data) => ({
//         url: "/reset-password",
//         method: "POST",
//         body: data,
//       }),
//     }),

//     /* 🔥 GET LOGGED-IN STUDENT */
//     getMe: builder.query({
//       query: () => "/profile", // ✅ FIXED
//       providesTags: ["Student"],
//     }),

//     /* ================= STUDENTS ================= */

//     getAllStudents: builder.query({
//       query: () => "/",
//       providesTags: ["Student"],
//     }),

//     getStudentById: builder.query({
//       query: (id) => `/${id}`,
//       providesTags: (result, error, id) => [
//         { type: "Student", id },
//       ],
//     }),

//     deleteStudent: builder.mutation({
//       query: (id) => ({
//         url: `/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["Student"],
//     }),

//     changePassword: builder.mutation({
//       query: (data) => ({
//         url: "/update-password",
//         method: "PUT",
//         body: data,
//       }),
//     }),

//     /* ================= FEEDBACK ================= */

//     submitFeedback: builder.mutation({
//   query: ({ quizId, rating, feedback }) => ({
//     url: `/${quizId}/feedback`, // ✅ quizId URL me
//     method: "POST",
//     body: {
//       rating,
//       feedback, // ✅ sirf ye body me
//     },
//   }),
//   invalidatesTags: ["Feedback"],
// }),

//     getAllFeedbacks: builder.query({
//       query: () => "/all-feedbacks",
//       providesTags: ["Feedback"],
//     }),

//     getQuizRating: builder.query({
//       query: (quizId) => `/rating/${quizId}`,
//       providesTags: ["Feedback"],
//     }),
//   }),
// });

// export const {
//   useRegisterStudentMutation,
//   useLoginStudentMutation,
//   useLogoutStudentMutation,
//   useVerifyEmailMutation,
//   useResendOtpMutation,
//   useRefreshTokenMutation,
//   useForgotPasswordMutation,
//   useResetPasswordMutation,

//   useGetMeQuery,

//   useGetAllStudentsQuery,
//   useGetStudentByIdQuery,
//   useDeleteStudentMutation,

//   useSubmitFeedbackMutation,
//   useGetAllFeedbacksQuery,
//   useGetQuizRatingQuery,
//   useChangePasswordMutation
// } = studentApi;

// export default studentApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const studentApi = createApi({
  reducerPath: "studentApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/students",
    credentials: "include", // ✅ cookies
  }),

  tagTypes: ["Student", "Feedback"],

  endpoints: (builder) => ({
    /* ================= AUTH ================= */

    registerStudent: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
    }),

    loginStudent: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),

    logoutStudent: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),

    verifyEmail: builder.mutation({
      query: (data) => ({
        url: "/verify-email",
        method: "POST",
        body: data,
      }),
    }),

    resendOtp: builder.mutation({
      query: (data) => ({
        url: "/resend-otp",
        method: "POST",
        body: data,
      }),
    }),

    refreshToken: builder.mutation({
      query: () => ({
        url: "/refresh",
        method: "POST",
      }),
    }),

    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/forgot-password",
        method: "POST",
        body: { email },
      }),
    }),

    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/reset-password",
        method: "POST",
        body: data,
      }),
    }),

    /* 🔥 GET LOGGED-IN STUDENT */
    getMe: builder.query({
      query: () => "/profile", // ✅ FIXED
      providesTags: ["Student"],
    }),

    /* ================= STUDENTS ================= */

    getAllStudents: builder.query({
      query: () => "/",
      providesTags: ["Student"],
    }),

    getStudentById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [
        { type: "Student", id },
      ],
    }),

    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Student"],
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: "/update-password",
        method: "PUT",
        body: data,
      }),
    }),

    /* ================= FEEDBACK ================= */

    submitFeedback: builder.mutation({
      query: ({ quizId, rating, message }) => ({
        url: `/${quizId}/feedback`, // ✅ quizId URL me
        method: "POST",
        body: {
          rating,
          message,
        },
      }),
      invalidatesTags: ["Feedback"],
    }),

    getAllFeedbacks: builder.query({
      query: () => "/all-feedbacks",
      providesTags: ["Feedback"],
    }),

    getQuizRating: builder.query({
      query: (quizId) => `/rating/${quizId}`,
      providesTags: ["Feedback"],
    }),
  }),
});

export const {
  useRegisterStudentMutation,
  useLoginStudentMutation,
  useLogoutStudentMutation,
  useVerifyEmailMutation,
  useResendOtpMutation,
  useRefreshTokenMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,

  useGetMeQuery,

  useGetAllStudentsQuery,
  useGetStudentByIdQuery,
  useDeleteStudentMutation,
  useChangePasswordMutation,

  useSubmitFeedbackMutation,
  useGetAllFeedbacksQuery,
  useGetQuizRatingQuery,
} = studentApi;

export default studentApi;