import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
// Redux
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store/store";
import { PersistGate } from "redux-persist/integration/react";
// Navigatiors
import { initializeAuth } from "./redux/services/startupLogic";
import AppNavigator from "./navigation/auth/AppNavigator";

export default function App() {
  // Initialize authentication logic
  useEffect(() => {
    initializeAuth(store);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
}
