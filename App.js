import React, { useState, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store/store";
import { PersistGate } from "redux-persist/integration/react";
import AppNavigator from "./navigation/auth/AppNavigator";
import { initializeAuth } from "./redux/services/helper/startupLogic";

const AuthInitializer = ({ children }) => {
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      const state = store.getState();
      const userId = state.auth?.user?.id; // Access userId directly from the Redux store

      if (userId) {
        try {
          await initializeAuth(store, userId); // Pass userId explicitly
        } catch (error) {
          console.error("Error initializing auth:", error.message || error);
        }
      } else {
        console.log("User ID is not available. Redirecting to login...");
      }

      setIsAuthInitialized(true); // Ensure app renders regardless of auth status
    };

    initAuth();
  }, []);

  if (!isAuthInitialized) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return children; // Render app once auth is initialized
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthInitializer>
          <AppNavigator />
        </AuthInitializer>
      </PersistGate>
    </Provider>
  );
};

export default App;
