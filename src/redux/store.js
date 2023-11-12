// store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import marketReducer from "./slices/marketSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    market: marketReducer,
  },
});
