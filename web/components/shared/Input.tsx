import type { ComponentPropsWithRef } from "react";

export const inputClass =
  "w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-12 py-3.5 " +
  "text-sm font-medium text-neutral-900 outline-none transition " +
  "placeholder:text-neutral-400 hover:border-neutral-300 " +
  "focus:border-lime-500 focus:bg-white focus:ring-4 focus:ring-lime-500/10 " +
  "dark:border-neutral-600 dark:bg-neutral-700/50 dark:text-white " +
  "dark:hover:border-neutral-500 dark:focus:bg-neutral-700";

type InputProps = ComponentPropsWithRef<"input"> & {
  variant?: "default" | "otp";
};

export default function Input({
  className = "",
  variant = "default",
  ...props
}: InputProps) {
  const baseClass =
    variant === "otp"
      ? inputClass
          .replace("w-full", "h-14 w-12")
          .replace("px-12 py-3.5", "p-0 text-center")
          .replace("text-sm font-medium", "text-xl font-bold")
      : inputClass;

  return (
    <input
      {...props}
      className={`${baseClass} disabled:cursor-not-allowed disabled:opacity-60 aria-invalid:border-red-500 aria-invalid:hover:border-red-500 aria-invalid:focus:border-red-500 dark:aria-invalid:border-red-500 dark:aria-invalid:hover:border-red-500 ${className}`}
    />
  );
}
