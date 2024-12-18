import React, { useState, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import store from "../../store/store";
import { initializeAuth } from "./startupLogic";

export const AuthInitializer = ({ children }) => {
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      // // Purge persisted data
      // await persistor.purge(); // Clears persisted data from AsyncStorage
      // console.log("Persisted data cleared successfully");

      const state = store.getState();
      const userId = state.authentication?.userId; // Access userId directly from the Redux store

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
