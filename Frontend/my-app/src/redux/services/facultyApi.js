import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const facultyApi = createApi({
  reducerPath: "facultyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/faculty",
    credentials: "include", // 👈 cookies (access + refresh token)
  }),
  tagTypes: ["Faculty"],
  endpoints: (builder) => ({

    /* =========================
       AUTH
       ========================= */

    loginFaculty: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),

    refreshToken: builder.mutation({
      query: () => ({
        url: "/refresh_token",
        method: "POST",
      }),
    }),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/forgot-password",
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/reset-password",
        method: "POST",
        body: data,
      }),
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: "/update-password",
        method: "PUT",
        body: data,
      }),
    }),

    /* =========================
       FACULTY CRUD (HOD / ADMIN)
       ========================= */

    addFaculty: builder.mutation({
      query: (data) => ({
        url: "/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Faculty"],
    }),

    deleteFaculty: builder.mutation({
      query: (facultyId) => ({
        url: `/delete/${facultyId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Faculty"],
    }),

    getAllFaculty: builder.query({
      query: (params) => ({
        url: "/all",
        method: "GET",
        params, // pagination + filters
      }),
      providesTags: ["Faculty"],
    }),

    /* =========================
       PROFILE
       ========================= */

    getFacultyProfile: builder.query({
      query: () => ({
        url: "/me",
        method: "GET",
      }),
    }),

  }),
});

export const {
  useLoginFacultyMutation,
  useRefreshTokenMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useAddFacultyMutation,
  useDeleteFacultyMutation,
  useGetAllFacultyQuery,
  useGetFacultyProfileQuery,
} = facultyApi;
