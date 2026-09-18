import LoginForm from "@/components/auth/loginForm";
import { Logo } from "@/components/Logo";
import AuthCardBorder from "@/components/auth/AuthCardBorder";

export default function Auth() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 p-6 transition-colors duration-200 dark:bg-neutral-900">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-neutral-100 bg-white p-10 shadow-xl dark:border-neutral-700 dark:bg-neutral-800">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-900 text-white shadow-xl dark:bg-white dark:text-neutral-900">
            <Logo className="h-8 w-8" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Welcome back
          </h2>
          <p className="mt-2 text-sm font-medium text-neutral-500 dark:text-neutral-400">
            Please enter your details to sign in.
          </p>
        </div>

        <AuthCardBorder />
        <LoginForm />

        <div className="mt-8 text-center text-xs font-medium text-neutral-400 dark:text-neutral-500">
          &copy; 2026 Flawle . All rights reserved.
        </div>
        
      </div>
      
    </div>
  );
}
