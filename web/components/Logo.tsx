"use client";

import React from "react";

export const Logo = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M2.5 10C2.5 10 7.5 3.5 15.5 3.5C21.5 3.5 22.5 7.5 22.5 7.5C22.5 7.5 16.5 6 11.5 8C6.5 10 2.5 10 2.5 10Z" />
    <path d="M3 15.5C3 15.5 7 11.5 14 11.5C18.5 11.5 19.5 14 19.5 14C19.5 14 15 13 11 14.5C7 16 3 15.5 3 15.5Z" />
  </svg>
);
