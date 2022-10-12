import { createSlice } from "@reduxjs/toolkit";

const keySlice = createSlice({
  name: "Key",
  initialState: {
    key: ""
  },
  reducers: {
    changePassword: (state, action) => {
      state.key = action.payload;
    }
  },
});

export const { changePassword } = keySlice.actions;
export default keySlice.reducer;
