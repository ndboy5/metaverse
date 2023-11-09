// store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import marketReducer from "./marketSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    market: marketReducer,
  },
});
