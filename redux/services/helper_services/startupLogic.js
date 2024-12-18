import { TokenService } from "../../../utils/token";
import {
  logoutSuccess,
  setAuthenticated,
} from "../../reducers/authenticationReducer";
import authBaseQuery from "./authBaseQuery"; // Use authBaseQuery for token refresh

export const initializeAuth = async (store, userId) => {
  try {
    // Check if the access token is valid
    const isValid = await TokenService.isAccessTokenValid(userId);

    if (isValid) {
      store.dispatch(setAuthenticated(true)); // User is authenticated
    } else {
      console.warn("Access token expired. Attempting to refresh...");

      // Attempt to refresh the token
      const refreshResult = await authBaseQuery(
        {
          url: "/authentication/refresh-token",
          method: "POST",
          body: {
            refreshToken: await TokenService.getRefreshToken(userId),
          },
        },
        {
          getState: store.getState,
          dispatch: store.dispatch,
        },
        {} // Extra options (if needed)
      );

      if (refreshResult.data) {
        const { accessToken, refreshToken: newRefreshToken } =
          refreshResult.data;

        // Update tokens
        await TokenService.handleTokenStorage(
          userId,
          accessToken,
          newRefreshToken,
          store.dispatch
        );

        console.log("Token refresh successful.");
        store.dispatch(setAuthenticated(true)); // Mark user as authenticated
      } else {
        console.error("Token refresh failed. Logging out.");
        await TokenService.clearTokens(userId);
        store.dispatch(logoutSuccess());
      }
    }
  } catch (error) {
    console.error("Error during auth initialization:", error.message || error);
    await TokenService.clearTokens(userId);
    store.dispatch(logoutSuccess());
  }
};
