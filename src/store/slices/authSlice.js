import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, 
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    updatePassword: (state, action) => {
      if (state.user) {
        state.user.password = action.payload;
      }
    },
  },
});

export const { login, logout, updatePassword } = authSlice.actions;
export default authSlice.reducer;
