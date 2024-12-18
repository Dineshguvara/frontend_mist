import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import enhancedBaseQuery from "./helper_services/enhanceBaseQuery";

export const schoolsApi = createApi({
  reducerPath: "schoolApi",
  baseQuery: enhancedBaseQuery,
  tagTypes: ["School"],
  endpoints: (builder) => ({
    createSchool: builder.mutation({
      query: (formData) => ({
        url: "/school",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["School"],
    }),
    getAllSchools: builder.query({
      query: () => "/school",
      providesTags: ["School"],
    }),
    showAllSchools: builder.query({
      query: () => "/school/school-register",
      providesTags: ["School"],
      // extraOptions: { skipAuth: true },
    }),
    getSchoolById: builder.query({
      query: (id) => `/school/${id}`,
      providesTags: (result, error, id) => [{ type: "School", id }],
    }),
    showSchoolById: builder.query({
      query: (id) => `/school/school-register/${id}`,
      providesTags: (result, error, id) => [{ type: "School", id }],
    }),
    updateSchool: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/school/${id}`,
        method: "PATCH",
        body: formData,
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "School", id }],
    }),
    deleteSchool: builder.mutation({
      query: (id) => ({
        url: `/school/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "School", id }],
    }),
  }),
});

export const {
  useCreateSchoolMutation,
  useGetAllSchoolsQuery,
  useShowAllSchoolsQuery,
  useGetSchoolByIdQuery,
  useShowSchoolByIdQuery,
  useUpdateSchoolMutation,
  useDeleteSchoolMutation,
} = schoolsApi;
