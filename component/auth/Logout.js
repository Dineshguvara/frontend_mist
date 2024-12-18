import React from "react";
import Button from "../Button";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/services/auth_service/authApi";
import { TokenService } from "../../utils/token";
import store from "../../redux/store/store";

const LogoutButton = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [logoutApi, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      // Attempt API logout
      const result = await logoutApi().unwrap();
      console.log("API Logout successful:", result);

  
      // Retrieve userId from Redux state
      const userId = store.getState().authentication?.userId;

      if (userId) {
        // Clear tokens and update state
        await TokenService.clearTokens(userId, dispatch);
        console.log("Tokens cleared successfully for userId:", userId);
      } else {
        console.error("User ID is not available. Tokens cannot be cleared.");
      }

      // Reset navigation to the Auth screen
      navigation.reset({
        index: 0,
        routes: [{ name: "Auth" }],
      });
    } catch (error) {
      // Handle any errors during logout
      console.error("Logout process failed:", error);
    }
  };

  return (
    <Button
      onPress={handleLogout}
      style={{ marginTop: 20 }}
      disabled={isLoading}
    >
      {isLoading ? "Logging Out..." : "Logout"}
    </Button>
  );
};

export default LogoutButton;
