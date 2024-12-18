import React from "react";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store/store";
import { PersistGate } from "redux-persist/integration/react";
import AppNavigator from "./navigation/auth/AppNavigator";
import { AuthInitializer } from "./redux/services/helper_services/authInitializer";

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
