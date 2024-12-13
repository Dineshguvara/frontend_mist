// import { TokenService } from "./token";
// import { logout } from "../redux/reducers/authReducer";

// export const logoutUser = async (storeOrApi) => {
//   const state =
//     typeof storeOrApi.getState === "function"
//       ? storeOrApi.getState()
//       : storeOrApi;
//   const userId = state.auth?.user?.id;

//   if (!userId) {
//     console.error("Cannot log out: User ID is not available in the state.");
//     return;
//   }

//   await TokenService.clearTokens(userId);

//   if (typeof storeOrApi.dispatch === "function") {
//     storeOrApi.dispatch(logout());
//   } else {
//     console.error("No valid dispatch function found for logoutUser.");
//   }

//   console.log("User logged out successfully.");
// };

// export default logoutUser;
