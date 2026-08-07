
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

// --- Toast Context ---

interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'error') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a Providers component');
  return context;
};

const ToastMessage = ({ message, type, onClose }: { message: string, type: 'success' | 'error', onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`pointer-events-auto flex items-center gap-3 px-5 py-4 rounded-2xl shadow-xl border animate-slideUp transition-colors ${
      type === 'success' 
        ? 'bg-white dark:bg-neutral-800 border-lime-100 dark:border-lime-900/30 text-neutral-800 dark:text-neutral-200' 
        : 'bg-white dark:bg-neutral-800 border-red-100 dark:border-red-900/30 text-neutral-800 dark:text-neutral-200'
    }`}>
      <div className={`p-1.5 rounded-full ${type === 'success' ? 'bg-lime-100 text-lime-700 dark:bg-lime-900/50 dark:text-lime-400' : 'bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400'}`}>
        {type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
      </div>
      <p className="text-sm font-semibold">{message}</p>
      <button onClick={onClose} className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 ml-4">
        <X size={16} />
      </button>
    </div>
  );
};

// --- Theme Context ---

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a Providers component');
  return context;
};

// --- Main Provider Wrapper ---

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<{id: number, message: string, type: 'success' | 'error'}[]>([]);
  
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <ToastContext.Provider value={{ showToast }}>
        {children}
        {/* Toast Container */}
        <div className="fixed bottom-6 right-6 z-[70] flex flex-col gap-3 pointer-events-none">
          {toasts.map(toast => (
            <ToastMessage 
              key={toast.id} 
              message={toast.message} 
              type={toast.type} 
              onClose={() => removeToast(toast.id)} 
            />
          ))}
        </div>
      </ToastContext.Provider>
    </ThemeContext.Provider>
  );
};
