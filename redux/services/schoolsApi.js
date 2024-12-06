import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TokenService } from "../../utils/token";
import { BASE_URL } from "../../utils/config";
export const schoolsApi = createApi({
  reducerPath: "schoolApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: async (headers) => {
      const token = await TokenService.getAccessToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["School"],
  endpoints: (builder) => ({
    createSchool: builder.mutation({
      query: (formData) => ({
        url: "/school",
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data", // Important for FormData
        },
      }),
      invalidatesTags: ["School"],
    }),
    getAllSchools: builder.query({
      query: () => "/school",
      providesTags: ["School"],
    }),
    getSchoolById: builder.query({
      query: (id) => `/school/${id}`,
      providesTags: (result, error, id) => [{ type: "School", id }],
    }),
    updateSchool: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/school/${id}`,
        method: "PATCH",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "School", id }],
    }),
    deleteSchool: builder.mutation({
      query: (id) => ({
        url: `school/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "School", id }],
    }),
  }),
});

export const {
  useCreateSchoolMutation,
  useGetAllSchoolsQuery,
  useGetSchoolByIdQuery,
  useUpdateSchoolMutation,
  useDeleteSchoolMutation,
} = schoolsApi;
