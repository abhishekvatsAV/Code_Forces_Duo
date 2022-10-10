import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "User",
  initialState: [],
  reducers: {
    login: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { login } = UserSlice.actions;
export default UserSlice.reducer;
