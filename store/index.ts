import { configureStore } from "@reduxjs/toolkit";
import burgerReducer from "./slices/burgerSlice";
export const store = configureStore({
  reducer: {
    burger: burgerReducer,
  },
});
