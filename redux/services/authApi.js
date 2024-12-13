import { createApi } from "@reduxjs/toolkit/query/react";
import { TokenService } from "../../utils/token";
import enhancedBaseQuery from "./helper/enhanceBaseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: enhancedBaseQuery,

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/authentication/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { userId, accessToken, refreshToken } = data;
          console.log(data);
          console.log(userId);
          console.log(accessToken, refreshToken);

          await TokenService.handleTokenStorage(
            userId,
            accessToken,
            refreshToken,
            dispatch
          );
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: "/authentication/register",
        method: "POST",
        body: userData,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { userId, accessToken, refreshToken } = data;

          console.log(userId);
          console.log(accessToken, refreshToken);

          await TokenService.handleTokenStorage(
            userId,
            accessToken,
            refreshToken,
            dispatch
          );
        } catch (error) {
          console.error("Registration failed:", error);
        }
      },
    }),

    // startRegistration: builder.mutation({
    //   query: (userDto) => ({
    //     url: "/authentication/register/start",
    //     method: "POST",
    //     body: userDto, // Send the user details to start the registration process
    //   }),
    // }),

    // completeRegistration: builder.mutation({
    //   query: ({ email, otp, userDto }) => ({
    //     url: "/authentication/register/complete",
    //     method: "POST",
    //     body: { email, otp, userDto }, // Verify OTP and complete the registration
    //   }),
    //   async onQueryStarted(args, { dispatch, queryFulfilled }) {
    //     try {
    //       const { data } = await queryFulfilled;
    //       const { userId, accessToken, refreshToken } = data;

    //       console.log(userId);
    //       console.log(accessToken, refreshToken);

    //       await TokenService.handleTokenStorage(
    //         userId,
    //         accessToken,
    //         refreshToken,
    //         dispatch
    //       );
    //     } catch (error) {
    //       console.error("Registration failed:", error);
    //     }
    //   },
    // }),

    // resendOtp: builder.mutation({
    //   query: (email) => ({
    //     url: "/authentication/register/resend-otp",
    //     method: "POST",
    //     body: { email }, // Resend OTP to the provided email
    //   }),
    // }),

    logout: builder.mutation({
      query: () => ({
        url: "/authentication/logout",
        method: "POST",
      }),
    }),

    inviteUser: builder.mutation({
      query: (invitationData) => ({
        url: "/authentication/invite-user",
        method: "POST",
        body: invitationData,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  // useStartRegistrationMutation,
  // useCompleteRegistrationMutation,
  // useResendOtpMutation,
  useLogoutMutation,
  useInviteUserMutation,
} = authApi;
