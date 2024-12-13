import { TokenService } from "../../../utils/token";

export const handleTokenRefresh = async (
  args,
  api,
  extraOptions,
  baseQuery
) => {
  const dispatch = api.dispatch;
  try {
    const userId = api.getState().auth?.user?.id;
    if (!userId) {
      console.error("User ID is not available in the Redux state inside handle refresh token");
      await TokenService.clearTokens(userId, dispatch); // Clear tokens and logout
      return { error: { status: 401 } };
    }

    const refreshToken = await TokenService.getRefreshToken(userId);
    if (!refreshToken) {
      console.error("Refresh token is not available. Logging out.");
      await TokenService.clearTokens(userId, dispatch); // Clear tokens and logout
      return { error: { status: 401 } };
    }

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
      const { accessToken, refreshToken: newRefreshToken } = refreshResult.data;

      // Update tokens
      await TokenService.handleTokenStorage(
        userId,
        accessToken,
        newRefreshToken,
        dispatch
      );

      // Retry the failed request
      return await baseQuery(args, api, extraOptions);
    } else {
      console.error("Failed to refresh token. Logging out.");
      await TokenService.clearTokens(userId, dispatch); // Clear tokens and logout
      return { error: { status: 401 } };
    }
  } catch (error) {
    console.error("Error during token refresh:", error);
    await TokenService.clearTokens(userId, dispatch); // Clear tokens and logout
    return { error: { status: 401 } };
  }
};
