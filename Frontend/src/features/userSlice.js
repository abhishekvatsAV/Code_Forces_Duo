import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "User",
  initialState: JSON.parse(localStorage.getItem("user") || '[]'),
  reducers: {
    login: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("user", JSON.stringify(state));
    },
  },
});

export const { login } = UserSlice.actions;
export default UserSlice.reducer;
