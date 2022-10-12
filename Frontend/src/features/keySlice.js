import { createSlice } from "@reduxjs/toolkit";

const keySlice = createSlice({
  name: "password",
  initialState: {
    pswd: ""
  },
  reducers: {
    changePassword: (state, action) => {
      state.pswd = action.payload;
    }
  },
});

export const { changePassword } = keySlice.actions;
export default keySlice.reducer;
