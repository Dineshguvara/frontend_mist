import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthNavigator from "./AuthNavigator";
import MainStack from "../mainNavigation/MainStack";
import LoadingScreen from "../../screens/LoadingScreen";
import { setAuthenticated } from "../../redux/reducers/authReducer";
import { verifyToken } from "../../utils/verifyToken";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

const Stack = createStackNavigator();

function AppNavigator() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      const isValid = await verifyToken();
      dispatch(setAuthenticated(isValid)); // Update Redux state
      setLoading(false); // Stop loading screen
    };

    checkAuthentication();
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      // Log AsyncStorage keys and values once loading is complete (i.e., after authentication check)
      const logAsyncStorageData = async () => {
        const keys = await AsyncStorage.getAllKeys();
        for (const key of keys) {
          const value = await AsyncStorage.getItem(key);
        }
      };

      logAsyncStorageData();
    }
  }, [loading]); // Only run after loading is false (authentication has finished)

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="Main" component={MainStack} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
