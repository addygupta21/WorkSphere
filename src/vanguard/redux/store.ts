import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./todo.store"; // Assuming your reducer is properly typed

// Define the type for the store
export type RootState = ReturnType<typeof reducer>;

const store = configureStore({
  reducer: reducer,
});

export default store;
