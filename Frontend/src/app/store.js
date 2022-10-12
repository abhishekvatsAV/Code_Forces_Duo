import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import keyReducer from "../features/keySlice";

export default configureStore({
  reducer: {
    user: userReducer,
    password: keyReducer,
  },
});
