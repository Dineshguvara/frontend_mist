import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import logger from "redux-logger";
import { authApi } from "../services/auth_service/authApi";
import { rolesApi } from "../services/rolesApi";
import { schoolsApi } from "../services/schoolsApi";
import { forgetPasswordApi } from "../services/auth_service/forgetPasswordApi";
import { dummyApi } from "../services/dummyApi";

// Step 2: Configure persistence
const persistConfig = {
  key: "root", // Key for AsyncStorage
  storage: AsyncStorage, // Use AsyncStorage instead of localStorage
  whitelist: ["authentication"], // Reducers to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Step 3: Configure the store
const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for redux-persist
    })
      .concat(authApi.middleware) // Add RTK Query middleware
      .concat(rolesApi.middleware)
      .concat(schoolsApi.middleware)
      .concat(forgetPasswordApi.middleware)
      .concat(dummyApi.middleware)
      .concat(logger), // Add logger
});

// store.subscribe(() => {
//   console.log("Redux state after action:", store.getState());
// });

// Step 4: Create persistor
export const persistor = persistStore(store);

export default store;
