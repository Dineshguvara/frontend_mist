import { useEffect, useState } from "react";
import { Linking } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import SchoolSelectScreen from "../../screens/auth/helperScreens/registration/SchoolSelectScreen";
import RegisterFormScreen from "../../screens/auth/RegisterScreen";
import LoadingScreen from "../../screens/LoadingScreen";
 

const Stack = createStackNavigator();

function RegisterNavigator() {
  const [initialRoute, setInitialRoute] = useState(null);
  const [tokenData, setTokenData] = useState(null);

  useEffect(() => {
    const checkForToken = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();
        if (initialUrl) {
          const urlParts = initialUrl.split("?");
          if (urlParts.length > 1) {
            const token = new URLSearchParams(urlParts[1]).get("token");
            if (token) {
              console.log("Token found:", token);
              setTokenData(token); // Save token data for navigation
              setInitialRoute("RegisterForm");
              return;
            }
          }
        }
        console.log("No token found. Navigating to SchoolSelect.");
        setInitialRoute("SchoolSelect");
      } catch (error) {
        console.error("Error parsing URL or token:", error);
        setInitialRoute("SchoolSelect");
      }
    };

    checkForToken();
  }, []);

  if (!initialRoute) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator initialRouteName={initialRoute}>
      <Stack.Screen
        name="SchoolSelect"
        component={SchoolSelectScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterForm"
        component={RegisterFormScreen}
        options={{ headerShown: false }}
        initialParams={{ tokenData }}
      />

    </Stack.Navigator>
  );
}
export default RegisterNavigator;
