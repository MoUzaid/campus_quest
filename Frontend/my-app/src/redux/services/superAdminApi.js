import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const superAdminApi = createApi({
    reducerPath:"superAdminApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"http://localhost:5000/api/superAdmin",
        credentials:"include",
    }),
    tagTypes:["superAdmin"],
    endpoints:(builder)=>({
        loginSuperAdmin:builder.mutation({
            query:(data)=>({
                url:"/login",
                method:"POST",
                body:data,
            }),
        }),
        registerSuperAdmin:builder.mutation({
            query:(data) => ({
                url:"/register",
                method:"POST",
                body:data,
            }),
            invalidatesTags:["superAdmin"],
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
    getSuperAdmin:builder.query({
        query:()=>({
            url:"/me",
            method:"GET",
        })
    }),
     refreshTokenSuperAdmin: builder.mutation({
      query: () => ({
        url: "/refresh_token",
        method: "POST",
      }),
    }),
       changePassword: builder.mutation({
      query: (data) => ({
        url: "/change-password",
        method: "PUT",
        body: data,
      }),
    }),
    }),
});

export const {
    useLoginSuperAdminMutation,
    useRegisterSuperAdminMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useGetSuperAdminQuery,
    useRefreshTokenSuperAdminMutation,
    useChangePasswordMutation,
} = superAdminApi;