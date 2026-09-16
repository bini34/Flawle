import Input from "@/components/shared/Input";
import { LockKeyhole, ShieldCheck } from "lucide-react";

export default function SetNewPasswordForm() {
  return (
    <form className="space-y-5">
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
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
          />
          <Input
            id="new-password"
            name="password"
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
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
          />
          <Input
            id="confirm-password"
            name="confirm"
            type="password"
            autoComplete="new-password"
            minLength={8}
            required
            placeholder="Enter your password again"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl
                   bg-neutral-900 px-5 py-3.5 text-sm font-bold text-white
                   shadow-lg shadow-neutral-900/15 transition
                   hover:-translate-y-0.5 hover:bg-neutral-800
                   focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-lime-500/40
                   active:translate-y-0
                   dark:bg-lime-400 dark:text-neutral-950 dark:shadow-none
                   dark:hover:bg-lime-300"
      >
        <ShieldCheck size={18} aria-hidden="true" />
        Save new password
      </button>
    </form>
  );
}