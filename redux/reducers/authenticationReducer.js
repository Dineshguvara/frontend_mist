import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

const initialState = {
  userId: null,
  accessToken: null,
  isAuthenticated: false,
  roleId: null,
  roleName: null,
  schoolId: null,
  approveStatus: null,
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    // Handle successful login
    loginSuccess: (state, action) => {
      const { token } = action.payload;

      // Decode the token to extract details
      const decodedToken = jwtDecode(token);

      // Extract necessary data
      const { sub, roleId, roleName, schoolId, approveStatus } = decodedToken;

      // Update Redux state
      state.accessToken = token;
      state.userId = sub;
      state.roleId = roleId;
      state.roleName = roleName;
      state.schoolId = schoolId;
      state.isAuthenticated = true;
      state.approveStatus = approveStatus;
    },

    // Handle logout
    logoutSuccess: (state) => {
      state.userId = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.roleId = null;
      state.roleName = null;
      state.schoolId = null;
      state.approveStatus = null;
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload; // Payload is `true` or `false`
    },
  },
});

export const { loginSuccess, logoutSuccess, setAuthenticated } =
  authenticationSlice.actions;
export default authenticationSlice.reducer;
