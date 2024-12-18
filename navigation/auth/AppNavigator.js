import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthNavigator from "./AuthNavigator";
import MainNavigationStack from "../mainNavigation/MainNavigationStack";
import LoadingScreen from "../../screens/LoadingScreen";

const Stack = createStackNavigator();

function AppNavigator() {
  const isAuthenticated = useSelector(
    (state) => state.authentication.isAuthenticated
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [isAuthenticated]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="Main" component={MainNavigationStack} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
