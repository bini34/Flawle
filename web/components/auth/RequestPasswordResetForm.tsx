"use client";

import Input from "@/components/shared/Input";

import { RequestPasswordResetAction } from "@/features/auth/actions";
import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";

function RequestPasswordResetForm() {
  const [formState, formAction, pending] = useActionState(
    RequestPasswordResetAction,
    {
      success: false,
      errors: {},
    }
  );
  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label htmlFor="reset-email" className="mb-2 block text-sm font-bold text-neutral-700 dark:text-neutral-300">
          Email
        </label>
        <div className="relative">
          <Mail
            className="absolute top-1/2 left-4 -translate-y-1/2 text-neutral-400"
            size={20}
          />
          <Input
            type="email"
            id="reset-email"
            name="email"
            defaultValue="biniyamambachew@gmail.com"
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
      <button
        type="submit"
        className="w-full rounded-xl bg-neutral-900 py-3.5 font-bold text-white shadow-lg shadow-neutral-900/20 transition-all hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:shadow-none dark:hover:bg-neutral-200"
      >
        {" "}
        {pending ? (
          <span className="loading loading-spinner">loading</span>
        ) : (
          "Send Code"
        )}
      </button>
      <Link
        href="/login"
        className="flex items-center justify-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
      >
        <ArrowLeft size={16} /> Back to sign in
      </Link>
    </form>
  );
}

export default RequestPasswordResetForm;
