import { createApi } from "@reduxjs/toolkit/query/react";
import enhancedBaseQuery from "../helper_services/enhanceBaseQuery";

export const forgetPasswordApi = createApi({
  reducerPath: "forgetPasswordApi",
  baseQuery: enhancedBaseQuery,

  endpoints: (builder) => ({
    generateForgetPasswordOtp: builder.mutation({
      query: (dto) => ({
        url: "/forget-password/start/generate_otp",
        method: "POST",
        body: dto,
      }),
    }),
    verifyForgetPasswordOtp: builder.mutation({
      query: (dto) => ({
        url: "/forget-password/finish/verify_otp",
        method: "POST",
        body: dto,
      }),
    }),
    resendForgetPasswordOtp: builder.mutation({
      query: (dto) => ({
        url: "/forget-password/resend_otp",
        method: "POST",
        body: dto,
      }),
    }),
    updateForgetPassword: builder.mutation({
      query: (data) => ({
        url: "/forget-password/update/complete",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

// Export hooks for use in components
export const {
  useGenerateForgetPasswordOtpMutation,
  useVerifyForgetPasswordOtpMutation,
  useResendForgetPasswordOtpMutation,
  useUpdateForgetPasswordMutation,
} = forgetPasswordApi;
