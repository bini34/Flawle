"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";
import { toast, Toaster } from "sonner";

// --- Toast Context ---

interface ToastContextType {
  showToast: (message: string, type?: "success" | "error") => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context)
    throw new Error("useToast must be used within a Providers component");
  return context;
};

const showToast = (message: string, type: "success" | "error" = "success") => {
  toast[type](message);
};

// --- Theme Context ---

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("useTheme must be used within a Providers component");
  return context;
};

// --- Main Provider Wrapper ---

export const Providers = ({ children }: { children: React.ReactNode }) => {
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [themeReady, setThemeReady] = useState(false);

  useEffect(() => {
    let prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    try {
      const savedTheme = localStorage.getItem("theme");
      prefersDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    } catch {
      // Use the system preference when browser storage is unavailable.
    }
    setIsDarkMode(prefersDark);
    setThemeReady(true);
  }, []);

  useEffect(() => {
    if (!themeReady) return;
    const root = window.document.documentElement;
    root.classList.toggle("dark", isDarkMode);
    try {
      localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    } catch {
      // Theme switching still works without persistent storage.
    }
  }, [isDarkMode, themeReady]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <ToastContext.Provider value={{ showToast }}>
        {children}
        <Toaster
          theme={isDarkMode ? "dark" : "light"}
          position="bottom-right"
          closeButton
          duration={4500}
          icons={{
            success: (
              <CheckCircle
                size={20}
                className="text-lime-600 dark:text-lime-400"
              />
            ),
            error: (
              <AlertCircle
                size={20}
                className="text-red-500 dark:text-red-400"
              />
            ),
          }}
          toastOptions={{
            className: "app-toast",
            classNames: { title: "font-semibold" },
          }}
        />
      </ToastContext.Provider>
    </ThemeContext.Provider>
  );
};
