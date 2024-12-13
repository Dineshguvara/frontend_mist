import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import {
  setAuthenticated,
  logout,
  loginSuccess,
} from "../redux/reducers/authReducer";

export const TokenService = {
  // Helper to generate keys based on userId
  generateKey(key, userId) {
    return `${key}_${userId}`;
  },

  // Store tokens
  async handleTokenStorage(userId, accessToken, refreshToken, dispatch = null) {
    if (!userId || !accessToken || !refreshToken) {
      throw new Error("Missing parameters for token storage.");
    }

    try {
      const accessKey = this.generateKey("accessToken", userId);
      const refreshKey = this.generateKey("refreshToken", userId);

      await AsyncStorage.multiSet([
        [accessKey, accessToken],
        [refreshKey, refreshToken],
      ]);
      console.log("Tokens stored successfully for userId:", userId);

      // Dispatch actions if dispatch is provided
      if (dispatch) {
        dispatch(loginSuccess({ user: { id: userId }, token: accessToken }));
      }
    } catch (error) {
      console.error("Error storing tokens:", error);
      throw error; // Re-throw for upstream handling
    }
  },

  // Retrieve token by key and userId
  async getToken(key, userId) {
    try {
      const tokenKey = this.generateKey(key, userId);
      const token = await AsyncStorage.getItem(tokenKey);
      console.log(`Retrieved token for key (${tokenKey}):`, token);
      return token || null;
    } catch (error) {
      console.error(
        `Failed to retrieve token (${key}) for userId (${userId}):`,
        error
      );
      return null;
    }
  },

  // Retrieve access token for userId
  async getAccessToken(userId) {
    return this.getToken("accessToken", userId);
  },

  // Retrieve refresh token for userId
  async getRefreshToken(userId) {
    return this.getToken("refreshToken", userId);
  },

  // Centralized token validation logic
  async isTokenValid(token) {
    try {
      if (!token) {
        console.error("Token is missing or undefined");
        return false;
      }

      const decoded = jwtDecode(token);
      console.log("Decoded token:", decoded);

      const currentTime = Math.floor(Date.now() / 1000);
      console.log(
        "Token expiry time:",
        decoded.exp,
        "Current time:",
        currentTime
      );

      if (decoded.exp && decoded.exp > currentTime) {
        return true;
      } else {
        console.error("Token has expired");
        return false;
      }
    } catch (error) {
      console.error("Error validating token:", error);
      return false;
    }
  },

  // Verify access token validity for userId
  async isAccessTokenValid(userId) {
    const token = await this.getAccessToken(userId);
    return this.isTokenValid(token);
  },

  // Verify refresh token validity for userId
  async isRefreshTokenValid(userId) {
    const token = await this.getRefreshToken(userId);
    return this.isTokenValid(token);
  },

  // Clear tokens for a specific userId
  // async clearTokens(userId, dispatch) {
  //   try {
  //     const accessKey = this.generateKey("accessToken", userId);
  //     const refreshKey = this.generateKey("refreshToken", userId);

  //     await AsyncStorage.multiRemove([accessKey, refreshKey]);
  //     console.log("Tokens cleared successfully for userId:", userId);

  //     // Update Redux state through dispatch
  //     if (dispatch) {
  //       dispatch(logout());
  //     }
  //   } catch (error) {
  //     console.error("Failed to clear tokens for userId:", userId, error);
  //   }
  // },

  async clearTokens(userId, dispatch = null) {
    if (!userId) {
      console.error("Invalid userId passed to clearTokens");
      return;
    }

    try {
      const accessKey = this.generateKey("accessToken", userId);
      const refreshKey = this.generateKey("refreshToken", userId);

      await AsyncStorage.multiRemove([accessKey, refreshKey]);
      console.log("Tokens cleared successfully for userId:", userId);

      if (dispatch) {
        dispatch(logout());
      }
    } catch (error) {
      console.error("Failed to clear tokens for userId:", error);
    }
  },

  // // Clear all tokens for all users (optional utility)
  // async (dispatch) {
  //   try {
  //     await AsyncStorage.clear();
  //     console.log("All tokens cleared successfully");

  //     if (dispatch) {
  //       dispatch(logout());
  //     }
  //   } catch (error) {
  //     console.error("Failed to clear all tokens:", error);
  //   }
  // },
};

//              USAGE OF TOKEN IN APP
// --------------------------------------------------------------------
// --------------------------------------------------------------------

//  import { TokenService } from "./path-to-token-service";

//  // Store tokens
//  await TokenService.storeTokens("access-token-value", "refresh-token-value");

//  // Retrieve access token
//  const accessToken = await TokenService.getAccessToken();

//  // Verify token validity
//  const isValid = await TokenService.isAccessTokenValid();
//  console.log("Is access token valid?", isValid);

//  // Clear tokens
//  await TokenService.clearTokens();
