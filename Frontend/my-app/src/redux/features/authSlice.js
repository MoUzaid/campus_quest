import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,           // logged-in user data
  role: null,           // "student" | "faculty" | "superadmin"
  isAuthenticated: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action) {
      const { user, role } = action.payload;
      state.user = user;
      state.role = role;
      state.isAuthenticated = true;
    },

    logout(state) {
      state.user = null;
      state.role = null;
      state.isAuthenticated = false;
    }
  }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
