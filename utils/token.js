import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import { setAuthenticated, logout } from "../redux/reducers/authReducer";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export const TokenService = {
  // Store tokens
  async storeTokens(accessToken, refreshToken, dispatch) {
    try {
      await AsyncStorage.multiSet([
        [ACCESS_TOKEN_KEY, accessToken],
        [REFRESH_TOKEN_KEY, refreshToken],
      ]);
      // console.log("Tokens stored successfully");

      if (dispatch) {
        dispatch(setAuthenticated(true)); // Make sure you pass dispatch here
      }
    } catch (error) {
      console.error("Failed to store tokens:", error);
    }
  },

  // Retrieve tokens
  async getToken(key) {
    try {
      const token = await AsyncStorage.getItem(key);
      return token || null;
    } catch (error) {
      console.error(`Failed to retrieve token (${key}):`, error);
      return null;
    }
  },

  // Retrieve access token
  async getAccessToken() {
    return this.getToken(ACCESS_TOKEN_KEY);
  },

  // Retrieve refresh token
  async getRefreshToken() {
    return this.getToken(REFRESH_TOKEN_KEY);
  },

  // Verify access token validity
  async isAccessTokenValid() {
    try {
      const token = await this.getAccessToken();
      if (!token) {
        console.error("Access token is missing or undefined");
        return false;
      }

      const decoded = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decoded.exp && decoded.exp > currentTime) {
        return true;
      } else {
        console.error("Access token has expired");
        return false;
      }
    } catch (error) {
      console.error("Error verifying access token:", error);
      return false;
    }
  },

  // Clear tokens
  async clearTokens(dispatch) {
    try {
      await AsyncStorage.multiRemove([ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY]);
      // console.log("Tokens cleared successfully");

      // Update Redux state through dispatch
      if (dispatch) {
        dispatch(logout());
      }
    } catch (error) {
      console.error("Failed to clear tokens:", error);
    }
  },
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
