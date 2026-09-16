"use client";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";

function useCurrentUser() {
  return useSelector((state: RootState) => state.auth.user);
}

export default useCurrentUser;
