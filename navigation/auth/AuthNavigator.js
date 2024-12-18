import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../../screens/auth/Login";
import RegisterNavigator from "./RegisterNavigation";
import VerifyOtpScreen from "../../screens/auth/helperScreens/common/VerifyOtpScreen";
import ForgotPasswordScreen from "../../screens/auth/helperScreens/password_reset/ForgetPassword";
import NewPasswordScreen from "../../screens/auth/helperScreens/password_reset/NewPasswordScreen";

const Stack = createStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VerifyOtp"
        component={VerifyOtpScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewPassword"
        component={NewPasswordScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
