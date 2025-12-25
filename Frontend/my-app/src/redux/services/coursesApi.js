import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const courseApi = createApi({
  reducerPath: "courseApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/course",
    credentials: "include", 
  }),
    tagTypes: ["Course"],
    endpoints: (builder) => ({
        createCourse: builder.mutation({
            query: (formData) => ({
                url: "/add",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Course"],
        }),
        getAllCourses: builder.query({
            query: () => "/",
            providesTags: ["Course"],
        }),
        getGroups: builder.query({
            query: () => "/groups",
            providesTags: ["Course"],
        }),
        getCourseById: builder.query({
            query: (courseId) => `/${courseId}`,
            providesTags: (result, error, courseId) => [
                { type: "Course", id: courseId },
            ],
        }),
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
  useGetAllCoursesQuery,
    useGetCourseByIdQuery,
    useGetGroupsQuery,
    useUpdateCourseByIdMutation,
    useDeleteCourseByIdMutation,
} = courseApi;