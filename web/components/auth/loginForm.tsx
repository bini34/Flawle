"use client";

import Input from "@/components/shared/Input";
import { useActionState } from "react";
import { authenticateAction } from "@/features/auth/actions";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";

function LoginForm() {
  const [formState, formAction, pending] = useActionState(authenticateAction, {
    success: false,
    errors: {},
    user: null,
  });

  return (
    <form id="auth-form" className="space-y-6" action={formAction}>
      <div>
        <label htmlFor="login-email" className="mb-2 block text-sm font-bold text-neutral-700 dark:text-neutral-300">
          Email
        </label>
        <div className="relative">
          <Mail
            className="absolute top-1/2 left-4 -translate-y-1/2 text-neutral-400"
            size={20}
          />
          <Input
            type="email"
            id="login-email"
            name="email"
            defaultValue={"biniyamambachew@gmail.com"}
            aria-invalid={Boolean(formState.errors.email)}
            placeholder="Enter your email"
          />
        </div>
        {formState.errors.email && (
          <p className="mt-2 text-sm text-red-500">
            {formState.errors.email[0]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="login-password" className="mb-2 block text-sm font-bold text-neutral-700 dark:text-neutral-300">
          Password
        </label>
        <div className="relative">
          <Lock
            className="absolute top-1/2 left-4 -translate-y-1/2 text-neutral-400"
            size={20}
          />
          <Input
            type="password"
            id="login-password"
            name="password"
            defaultValue={"Badmin@123"}
            aria-invalid={Boolean(formState.errors.password)}
            placeholder="••••••••"
          />
        </div>

        {formState.errors.password && (
          <p className="mt-2 text-sm text-red-500">
            {formState.errors.password[0]}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between text-sm">
        <Link
          href="/forgot-password"
          className="font-bold text-lime-600 hover:underline dark:text-lime-400"
        >
          Forgot password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="flex w-full items-center justify-center rounded-xl bg-neutral-900 py-3.5 font-bold text-white shadow-lg shadow-neutral-900/20 transition-all hover:bg-neutral-800 disabled:opacity-70 dark:bg-white dark:text-neutral-900 dark:shadow-none dark:hover:bg-neutral-200"
      >
        {pending ? (
          <span className="loading loading-spinner">loading</span>
        ) : (
          "Sign In"
        )}
      </button>
    </form>
  );
}

export default LoginForm;
