import { combineReducers } from "redux";
import authenticationSlice from "../reducers/authenticationReducer";
import { authApi } from "../services/auth_service/authApi";
import { rolesApi } from "../services/rolesApi";
import { dummyApi } from "../services/dummyApi";
import { schoolsApi } from "../services/schoolsApi";
import { forgetPasswordApi } from "../services/auth_service/forgetPasswordApi";

const rootReducer = combineReducers({
  authentication: authenticationSlice,
  [authApi.reducerPath]: authApi.reducer, // Add RTK Query reducer
  [forgetPasswordApi.reducerPath]: forgetPasswordApi.reducer,
  [dummyApi.reducerPath]: dummyApi.reducer,
  [rolesApi.reducerPath]: rolesApi.reducer,
  [schoolsApi.reducerPath]: schoolsApi.reducer,
});

export default rootReducer;
