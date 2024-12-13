import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TokenService } from "../../../utils/token";
import { BASE_URL } from "../../../utils/config";

const UNAUTHENTICATED_ENDPOINTS = [
  "login",
  "register",
  "startRegistration",
  "completeRegistration",
  "resendOtp",
  "refreshToken",
  "showAllSchools",
  "showSchoolById",
  "showRoleById",
];

const authBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: async (headers, { endpoint, getState }) => {
    if (UNAUTHENTICATED_ENDPOINTS.includes(endpoint)) {
      console.log(
        `Endpoint "${endpoint}" does not require authentication, skipping Authorization header.`
      );
      return headers;
    }

    const state = getState();
    const userId = state.auth?.user?.id;

    if (!userId) {
      console.error(
        "User ID is not available in the Redux state inside authBaseQuery"
      );
      return headers;
    }

    const token = await TokenService.getAccessToken(userId);
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export default authBaseQuery;
