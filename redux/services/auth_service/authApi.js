import { createApi } from "@reduxjs/toolkit/query/react";
import { TokenService } from "../../../utils/token";
import enhancedBaseQuery from "../helper_services/enhanceBaseQuery";

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

    // generateRegistrationOtp: builder.mutation({
    //   query: (userDto) => ({
    //     url: "/authentication/register/start/generate_otp",
    //     method: "POST",
    //     body: userDto, // Send the user details to start the registration process
    //   }),
    // }),

    // verifyRegistrationOtp: builder.mutation({
    //   query: ({ email, otp, userDto }) => ({
    //     url: "/authentication/register/finish/verify_otp",
    //     method: "POST",
    //     body: { email, otp, userDto },
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

    // resendRegistrationOtp: builder.mutation({
    //   query: (dto) => ({
    //     url: "/authentication/register/resend_otp",
    //     method: "POST",
    //     body: dto,
    //   }),
    // }),

    inviteUser: builder.mutation({
      query: (invitationData) => ({
        url: "/authentication/invite-user",
        method: "POST",
        body: invitationData,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/authentication/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,

  useRegisterMutation,   
  // useGenerateRegistrationOtpMutation,
  // useVerifyRegistrationOtpMutation,
  // useResendRegistrationOtpMutation,

  useInviteUserMutation,
  useLogoutMutation,
} = authApi;
