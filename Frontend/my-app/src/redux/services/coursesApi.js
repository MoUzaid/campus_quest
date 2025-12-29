import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courseApi = createApi({
  reducerPath: "courseApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/course",
    credentials: "include",
  }),

  tagTypes: ["Course"],

  endpoints: (builder) => ({

    /* =====================
       CREATE
       ===================== */

    createCourse: builder.mutation({
      query: (formData) => ({
        url: "/add",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Course"],
    }),

    createCoursesBulk: builder.mutation({
      query: (data) => ({
        url: "/bulk-create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),

    /* =====================
       READ
       ===================== */

    // GET /api/course
    getAllCourses: builder.query({
      query: () => "/",
      providesTags: ["Course"],
    }),

    // GET /api/course/All-courses
    getAllCoursesFilter: builder.query({
      query: () => "/All-courses",
      providesTags: ["Course"],
    }),

    // GET /api/course/dept?department=XYZ
    getAllCoursesByDept: builder.query({
      query: (department) => ({
        url: "/dept",
        params: { department },
      }),
      providesTags: ["Course"],
    }),

    // GET /api/course/group
    getGroups: builder.query({
      query: () => "/group", // ✅ FIXED
      providesTags: ["Course"],
    }),

    // GET /api/course/:id
    getCourseById: builder.query({
      query: (courseId) => `/${courseId}`,
      providesTags: (result, error, courseId) => [
        { type: "Course", id: courseId },
      ],
    }),

    /* =====================
       UPDATE
       ===================== */

    updateCourseById: builder.mutation({
      query: ({ courseId, data }) => ({
        url: `/${courseId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { courseId }) => [
        { type: "Course", id: courseId },
      ],
    }),

    /* =====================
       DELETE
       ===================== */

    deleteCourseById: builder.mutation({
      query: (courseId) => ({
        url: `/${courseId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Course"],
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useCreateCoursesBulkMutation,

  useGetAllCoursesQuery,
  useGetAllCoursesFilterQuery,
  useGetAllCoursesByDeptQuery,
  useGetGroupsQuery,
  useGetCourseByIdQuery,

  useUpdateCourseByIdMutation,
  useDeleteCourseByIdMutation,
} = courseApi;

export default courseApi;
