import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/config";
import { TokenService } from "../../utils/token";

export const rolesApi = createApi({
  reducerPath: "rolesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL, // Replace with your backend base URL
    prepareHeaders: async (headers) => {
      const token = await TokenService.getAccessToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Create a role
    createRole: builder.mutation({
      query: (newRole) => ({
        url: "/roles",
        method: "POST",
        body: newRole,
      }),
    }),
    // Get all roles
    getAllRoles: builder.query({
      query: () => "/roles",
    }),
    // Get a single role by ID
    getRoleById: builder.query({
      query: (id) => `/roles/${id}`,
    }),
    // Update a role
    updateRole: builder.mutation({
      query: ({ id, updatedRole }) => ({
        url: `/roles/${id}`,
        method: "PATCH",
        body: updatedRole,
      }),
    }),
    // Delete a role
    deleteRole: builder.mutation({
      query: (id) => ({
        url: `/roles/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateRoleMutation,
  useGetAllRolesQuery,
  useGetRoleByIdQuery,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} = rolesApi;
