import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TokenService } from "../../utils/token"; // Adjust the path based on your project structure
import { BASE_URL } from "../../utils/config";
import { loginSuccess, logout } from "../reducers/authReducer";

// Enhanced base query with token handling
const baseQueryWithReauth = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: async (headers) => {
      const token = await TokenService.getAccessToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });

  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const refreshToken = await TokenService.getRefreshToken();
    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: "/authentication/refresh-token",
          method: "POST",
          body: { refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        const { accessToken, refreshToken: newRefreshToken } =
          refreshResult.data;
        await TokenService.storeTokens(
          accessToken,
          newRefreshToken,
          api.dispatch
        );

        result = await baseQuery(args, api, extraOptions);
      } else {
        await TokenService.clearTokens(api.dispatch); // Pass dispatch here
        api.dispatch(logout());
      }
    } else {
      await TokenService.clearTokens(api.dispatch); // Pass dispatch here
      api.dispatch(logout());
    }
  }

  return result;
};

// Define authApi
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/authentication/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        await handleAuthResponse(queryFulfilled, dispatch);
      },
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: "/authentication/register",
        method: "POST",
        body: userData,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        await handleAuthResponse(queryFulfilled, dispatch);
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/authentication/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch }) {
        try {
          await TokenService.clearTokens(dispatch);
        } catch (error) {
          console.error("Logout failed:", error);
        }
      },
    }),
  }),
});

// Centralized token handling for login and register responses
const handleAuthResponse = async (queryFulfilled, dispatch) => {
  try {
    const { data } = await queryFulfilled;
    const { user, accessToken, refreshToken } = data;

    // Store tokens and update Redux state
    await TokenService.storeTokens(accessToken, refreshToken, dispatch);
    dispatch(loginSuccess({ user, token: accessToken }));
  } catch (error) {
    console.error("Authentication failed:", error);
  }
};

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  authApi;
