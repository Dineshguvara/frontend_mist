import React, { useState } from "react";
import Button from "../Button";
import { TokenService } from "../../utils/token";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setAuthenticated } from "../../redux/reducers/authReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LogoutButton = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // Clear tokens from AsyncStorage
      await TokenService.clearTokens();

      // Update Redux state to unauthenticated
      dispatch(setAuthenticated(false));

      // Log the remaining keys in AsyncStorage
      const keys = await AsyncStorage.getAllKeys();

      // Reset navigation to AuthNavigator (login screen)
      navigation.reset({
        index: 0,
        routes: [{ name: "Auth" }], // Reset stack to AuthNavigator
      });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <Button onPress={handleLogout} style={{ marginTop: 20 }}>
      Logout
    </Button>
  );
};

export default LogoutButton;
