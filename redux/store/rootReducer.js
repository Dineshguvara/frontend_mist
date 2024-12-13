import { combineReducers } from "redux";
 import authSlice from "../reducers/authReducer"
import { authApi } from "../services/authApi";
import { rolesApi } from "../services/rolesApi";
import { schoolsApi } from "../services/schoolsApi";

const rootReducer = combineReducers({
  auth: authSlice,
  [authApi.reducerPath]: authApi.reducer, // Add RTK Query reducer
  [rolesApi.reducerPath]: rolesApi.reducer,
  [schoolsApi.reducerPath]: schoolsApi.reducer,
});

export default rootReducer;
