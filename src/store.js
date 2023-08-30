import { configureStore } from "@reduxjs/toolkit";
import likesReducer from "./features/likesSlice";

const store = configureStore({
  reducer: {
    likes: likesReducer,
  },
});

export default store;
