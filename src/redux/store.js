// store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import marketReducer from "./slices/marketSlice";
import connectionReducer from "./slices/connectionSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    market: marketReducer,
    connection: connectionReducer,
  },
});
