'use client';

import { useActionState } from 'react';
import { Lock, Mail } from 'lucide-react';
import { Logo } from '@/components/Logo';
import {authenticateAction} from '@/features/auth/actions';

 export default function Auth() {
   const [formState, formAction, pending] = useActionState(authenticateAction, { success: false, errors: {} });
  
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center p-6 transition-colors duration-200">
      <div className="max-w-md w-full bg-white dark:bg-neutral-800 rounded-3xl shadow-xl p-10 border border-neutral-100 dark:border-neutral-700">
        <div className="text-center mb-10">
           <div className="w-16 h-16 bg-neutral-900 dark:bg-white rounded-2xl flex items-center justify-center text-white dark:text-neutral-900 mx-auto mb-6 shadow-xl">
             <Logo className="w-8 h-8" />
           </div>
           <h2 className="text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">Welcome back</h2>
           <p className="text-neutral-500 dark:text-neutral-400 mt-2 text-sm font-medium">Please enter your details to sign in.</p>
        </div>

        <form id="auth-form" className="space-y-6" action={formAction}>
          <div>
            <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
              <input
                type="email"
                name="email"                
                className={`w-full pl-12 pr-4 py-3 bg-neutral-50 dark:bg-neutral-700 border ${formState.errors.email ? 'border-red-500' : 'border-transparent'} focus:border-lime-500 rounded-xl text-sm focus:ring-4 focus:ring-lime-500/10 outline-none transition-all dark:text-white font-medium placeholder-neutral-400`}
                placeholder="Enter your email"
              />
            </div>
            {formState.errors.email && (
              <p className="text-red-500 text-sm mt-2">{formState.errors.email[0]}</p>
            )}
          </div>

           <div>
            <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
              <input
                type="password"
                name="password"                
                className={`w-full pl-12 pr-4 py-3 bg-neutral-50 dark:bg-neutral-700 border ${formState.errors.password ? 'border-red-500' : 'border-transparent'} focus:border-lime-500 rounded-xl text-sm focus:ring-4 focus:ring-lime-500/10 outline-none transition-all dark:text-white font-medium placeholder-neutral-400`}
                placeholder="••••••••"
              />
            </div>
            
             {formState.errors.password && (
              <p className="text-red-500 text-sm mt-2">{formState.errors.password[0]}</p>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-neutral-300 dark:border-neutral-600 text-lime-600 focus:ring-lime-500 dark:bg-neutral-700" />
              <span className="text-neutral-600 dark:text-neutral-400 font-medium">Remember me</span>
            </label>
            <a href="#" className="text-lime-600 font-bold hover:underline dark:text-lime-400">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 text-white py-3.5 rounded-xl font-bold transition-all flex items-center justify-center disabled:opacity-70 shadow-lg shadow-neutral-900/20 dark:shadow-none"
          >
          {pending ? <span className="loading loading-spinner">loading</span> : 'Sign In'}  
          </button>
        </form>

        <div className="mt-8 text-center text-xs font-medium text-neutral-400 dark:text-neutral-500">
          &copy; 2026 Flawle . All rights reserved.
        </div>
      </div>
    </div>
  );
};

