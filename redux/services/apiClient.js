// // import axios from "axios";
// // import { TokenService } from "../../utils/token";
// // import { BASE_URL } from "../../utils/config";

// // const apiClient = axios.create({
// //   baseUrl: BASE_URL, // Replace with your API base URL
// // });

// // // Add request interceptor to include Authorization header
// // apiClient.interceptors.request.use(
// //   async (config) => {
// //     const token = await TokenService.getAccessToken();
// //     if (token) {
// //       config.headers.Authorization = `Bearer ${token}`;
// //     } else {
// //       console.warn("No access token found");
// //     }
// //     return config;
// //   },
// //   (error) => Promise.reject(error)
// // );

// // // Add response interceptor for error handling
// // apiClient.interceptors.response.use(
// //   (response) => response,
// //   async (error) => {
// //     const originalRequest = error.config;

// //     if (error.response?.status === 401 && !originalRequest._retry) {
// //       originalRequest._retry = true; // Prevent infinite retry loops

// //       const refreshToken = await TokenService.getRefreshToken();
// //       if (refreshToken) {
// //         try {
// //           // Attempt to refresh tokens
// //           const response = await axios.post(
// //             "https://api.example.com/authentication/refresh-token",
// //             { refreshToken }
// //           );

// //           const { accessToken, refreshToken: newRefreshToken } = response.data;

// //           // Store the new tokens
// //           await TokenService.storeTokens(accessToken, newRefreshToken);

// //           // Update the failed request with the new token and retry
// //           originalRequest.headers.Authorization = `Bearer ${accessToken}`;
// //           return apiClient(originalRequest);
// //         } catch (refreshError) {
// //           console.error("Token refresh failed:", refreshError);
// //           // Clear tokens and redirect to login
// //           await TokenService.clearTokens();
// //           navigation.reset({
// //             index: 0,
// //             routes: [{ name: "Auth" }],
// //           });
// //         }
// //       } else {
// //         console.warn("No refresh token available");
// //         // Clear tokens and redirect to login
// //         await TokenService.clearTokens();
// //         navigation.reset({
// //           index: 0,
// //           routes: [{ name: "Auth" }],
// //         });
// //       }
// //     }

// //     return Promise.reject(error);
// //   }
// // );

// // export default apiClient;
// 2. Integrate apiClient in RTK Query
// You can replace fetchBaseQuery in RTK Query with your Axios-based apiClient. Use RTK Query's customBaseQuery:

// Example: RTK Query with Axios
// import { createApi } from "@reduxjs/toolkit/query/react";
// import apiClient from "../utils/apiClient"; // Import centralized Axios client

// const axiosBaseQuery = 
//   ({ baseUrl } = { baseUrl: "" }) =>
//   async ({ url, method, data, params }) => {
//     try {
//       const result = await apiClient({
//         url: baseUrl + url,
//         method,
//         data,
//         params,
//       });
//       return { data: result.data };
//     } catch (axiosError) {
//       const err = axiosError.response ? axiosError.response : axiosError;
//       return {
//         error: {
//           status: err.status,
//           data: err.data || err.message,
//         },
//       };
//     }
//   };

// export const myApi = createApi({
//   reducerPath: "myApi",
//   baseQuery: axiosBaseQuery({ baseUrl: "https://api.example.com" }),
//   endpoints: (builder) => ({
//     getUser: builder.query({
//       query: () => ({ url: "/user", method: "GET" }),
//     }),
//     login: builder.mutation({
//       query: (credentials) => ({
//         url: "/authentication/login",
//         method: "POST",
//         data: credentials,
//       }),
//     }),
//   }),
// });

// export const { useGetUserQuery, useLoginMutation } = myApi;
// 3. Use apiClient for One-Off API Calls
// For requests not covered by RTK Query, use apiClient directly.

// Example: Fetch User Profile