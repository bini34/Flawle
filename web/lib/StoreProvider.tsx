"use client";

import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "./store";
import { login } from "../features/auth/authslice";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    const savedUser = localStorage.getItem("auth_user");
    if (savedUser) {
      storeRef.current!.dispatch(login(JSON.parse(savedUser)));
    }
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
