"use client";

import Input from "@/components/shared/Input";
import { LockKeyhole, ShieldCheck, LoaderCircle } from "lucide-react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/Providers";
import { setNewPasswordAction } from "@/features/auth/actions";

export default function SetNewPasswordForm() {
  const router = useRouter();
  const { showToast } = useToast();
  const [formState, formAction, pending] = useActionState(
    async (
      previousState: Parameters<typeof setNewPasswordAction>[0],
      formData: FormData
    ) => {
      const result = await setNewPasswordAction(previousState, formData);
      if (result.success) {
        showToast("Your password has been changed successfully.");
        router.replace("/login");
      }
      return result;
    },
    { success: false, errors: {} }
  );
  return (
    <form className="space-y-5" action={formAction}>
      <div className="rounded-2xl border border-lime-200/70 bg-lime-50 px-4 py-3 dark:border-lime-500/20 dark:bg-lime-500/10">
        <p className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-200">
          <ShieldCheck size={18} className="shrink-0 text-lime-600" />
          Choose a password with at least 8 characters.
        </p>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="new-password"
          className="block text-sm font-semibold text-neutral-800 dark:text-neutral-200"
        >
          New password
        </label>
        <div className="relative">
          <LockKeyhole
            size={19}
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-neutral-400"
          />
          <Input
            id="new-password"
            name="newPassword"
            aria-invalid={Boolean(formState.errors.newPassword)}
            aria-describedby={
              formState.errors.newPassword ? "new-password-error" : undefined
            }
            type="password"
            autoComplete="new-password"
            minLength={8}
            required
            placeholder="Enter your new password"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="confirm-password"
          className="block text-sm font-semibold text-neutral-800 dark:text-neutral-200"
        >
          Confirm password
        </label>
        <div className="relative">
          <LockKeyhole
            size={19}
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-neutral-400"
          />
          <Input
            id="confirm-password"
            name="confirmPassword"
            aria-invalid={Boolean(formState.errors.confirmPassword)}
            aria-describedby={
              formState.errors.confirmPassword
                ? "confirm-password-error"
                : undefined
            }
            type="password"
            autoComplete="new-password"
            minLength={8}
            required
            placeholder="Enter your password again"
          />
        </div>
      </div>

      {formState.errors.newPassword && (
        <p
          id="new-password-error"
          role="alert"
          className="text-sm text-red-500"
        >
          {formState.errors.newPassword[0]}
        </p>
      )}
      {formState.errors.confirmPassword && (
        <p
          id="confirm-password-error"
          role="alert"
          className="text-sm text-red-500"
        >
          {formState.errors.confirmPassword[0]}
        </p>
      )}
      <button
        disabled={pending || formState.success}
        aria-busy={pending || formState.success}
        type="submit"
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-neutral-900 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-neutral-900/15 transition hover:-translate-y-0.5 hover:bg-neutral-800 focus-visible:ring-4 focus-visible:ring-lime-500/40 focus-visible:outline-none active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-lime-400 dark:text-neutral-950 dark:shadow-none dark:hover:bg-lime-300"
      >
        {pending || formState.success ? (
          <span role="status">
            <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />
            <span className="sr-only">Saving password...</span>
          </span>
        ) : (
          <>
            <ShieldCheck size={18} aria-hidden="true" />
            Save new password
          </>
        )}
      </button>
    </form>
  );
}
