import { TokenService } from "../../utils/token";
import { setAuthenticated, logout } from "../reducers/authReducer";
import { useDispatch } from "react-redux";

export const initializeAuth = async (store) => {
  const isValid = await TokenService.isAccessTokenValid();
  const dispatch = useDispatch();
  if (isValid) {
    dispatch(setAuthenticated(true));
  } else {
    await TokenService.clearTokens();
    dispatch(logout());
  }
};
