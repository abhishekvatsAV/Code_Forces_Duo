import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "User",
  initialState: {
    user : JSON.parse(localStorage.getItem("user") || '[]'),
    userId: (localStorage.getItem("userId") || ''),
  },
  
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
      localStorage.setItem("userId", JSON.stringify(state.userId));
    }
  },
});

export const { login, setUserId } = UserSlice.actions;
export default UserSlice.reducer;
