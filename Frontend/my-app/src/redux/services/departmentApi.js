const {createApi, fetchBaseQuery} = require("@reduxjs/toolkit/query/react");

export const departmentApi = createApi({
  reducerPath: "departmentApi",
    baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/department",
    credentials: "include", 
  }),
    tagTypes: ["Department"],
    endpoints: (builder) => ({
        addDepartments: builder.mutation({
            query: (formData) => ({
                url: "/add",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Department"],
        }),
        getAllDepartments: builder.query({
            query: () => "/",
            providesTags: ["Department"],
        }),
    }),
});

export const {
  useAddDepartmentsMutation,
  useGetAllDepartmentsQuery,
} = departmentApi;

export default departmentApi;