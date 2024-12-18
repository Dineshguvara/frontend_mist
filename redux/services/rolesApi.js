import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import enhancedBaseQuery from "./helper_services/enhanceBaseQuery";
export const rolesApi = createApi({
  reducerPath: "rolesApi",
  baseQuery: enhancedBaseQuery,
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

    // Get a single role by ID
    showRoleById: builder.query({
      query: (id) => `/roles/role-register/${id}`,
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
  useShowRoleByIdQuery,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} = rolesApi;
