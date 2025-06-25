// redux/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk to load user from localStorage
export const loadUserFromStorage = createAsyncThunk(
  "auth/loadUser",
  async () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      return {
        token,
        user: JSON.parse(user),
      };
    } else {
      return null;
    }
  }
);

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { user, token } = action.payload;
      state.isAuthenticated = true;
      state.user = user;
      state.token = token;
      console.log(user);
      // Save to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;

      // Clear localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadUserFromStorage.fulfilled, (state, action) => {
      if (action.payload) {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      }
    });
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
