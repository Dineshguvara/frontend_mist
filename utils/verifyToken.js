import AsyncStorage from "@react-native-async-storage/async-storage";
import { TokenService } from "./token"; // Assuming you have this helper

export const verifyToken = async () => {
  try {
    // Retrieve the access token
    const token = await TokenService.getAccessToken();
    if (!token) {
      // console.log("Token is missing from AsynStore While try to verify it.");
      return false;
    }

    // Optionally validate the token (e.g., check expiration)
    const isValid = TokenService.isAccessTokenValid(token); // If you have a function to check the token's validity
    return isValid;
  } catch (error) {
    console.error("Error verifying token:", error);
    return false;
  }
};
