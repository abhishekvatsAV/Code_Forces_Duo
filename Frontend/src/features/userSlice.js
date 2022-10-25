import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "User",
  initialState: {
    user : JSON.parse(localStorage.getItem("user") || '[]')
  },
  
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
  },
});

export const { login } = UserSlice.actions;
export default UserSlice.reducer;
