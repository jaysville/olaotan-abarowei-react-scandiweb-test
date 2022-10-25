import appSliceReducer from "./slices/appSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: { app: appSliceReducer },
});

export default store;
