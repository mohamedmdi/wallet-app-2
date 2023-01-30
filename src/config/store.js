import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./Slices/mainSlice";
import thunk from "redux-thunk";

export const store = configureStore({
  reducer: {
    main: mainReducer,
  },
  middleware: [thunk],
});
