import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Handle successful login
    loginSuccess: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
    },

    // Handle logout
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },

    // Update authentication status (optional for flexibility)
    // setAuthenticated: (state, action) => {
    //   state.isAuthenticated = action.payload;
    // },
    setAuthenticated(state, action) {
      // console.log("Setting authentication:", action.payload);
      state.isAuthenticated = action.payload;
    },

    // Update user details (optional)
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { loginSuccess, logout, setAuthenticated, updateUser } =
  authSlice.actions;
export default authSlice.reducer;
