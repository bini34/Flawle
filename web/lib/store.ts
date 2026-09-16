import { configureStore } from "@reduxjs/toolkit";
import authReducer, { type AuthState } from "../features/auth/authslice";

export const makeStore = (preloadedState?: { auth: AuthState }) =>
  configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
