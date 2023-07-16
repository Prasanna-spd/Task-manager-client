import { configureStore } from "@reduxjs/toolkit";
import progressReducer from "./project/projectSlice";

export const store = configureStore({
  reducer: {
    progress: progressReducer,
  },
});
