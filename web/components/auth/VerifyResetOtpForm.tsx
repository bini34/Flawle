"use client";

import Input from "@/components/shared/Input";

import { useActionState, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { verifyResetOtpAction } from "@/features/auth/actions";

const initialState = {
  errors: {} as {
    otp?: string[];
  },
};

export default function VerifyResetOtpForm() {
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const [state, formAction, pending] = useActionState(
    verifyResetOtpAction,
    initialState,
  );

  function handlePaste(event: React.ClipboardEvent<HTMLInputElement>) {
    const code = event.clipboardData.getData("text").trim();

    if (!/^\d{6}$/.test(code)) return;

    event.preventDefault();

    code.split("").forEach((digit, index) => {
      const input = inputs.current[index];

      if (input) {
        input.value = digit;
      }
    });

    inputs.current[5]?.focus();
  }

  function handleInput(
    event: React.FormEvent<HTMLInputElement>,
    index: number,
  ) {
    const input = event.currentTarget;

    input.value = input.value.replace(/\D/g, "").slice(0, 1);

    if (input.value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) {
    if (
      event.key === "Backspace" &&
      !event.currentTarget.value &&
      index > 0
    ) {
      inputs.current[index - 1]?.focus();
    }

    if (event.key === "ArrowLeft" && index > 0) {
      inputs.current[index - 1]?.focus();
    }

    if (event.key === "ArrowRight" && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  }

  return (
    <div className="space-y-6">
      <form action={formAction} className="space-y-6">
        <fieldset disabled={pending}>
          <div className="flex justify-center gap-2">
            {Array.from({ length: 6 }, (_, index) => (
              <Input
                key={index}
                ref={(element) => {
                  inputs.current[index] = element;
                }}
                name={`otp${index}`}
                aria-label={`Code digit ${index + 1}`}
                aria-invalid={Boolean(state.errors.otp)}
                type="text"
                inputMode="numeric"
                pattern="[0-9]"
                maxLength={1}
                required
                autoComplete={index === 0 ? "one-time-code" : "off"}
                autoFocus={index === 0}
                onInput={(event) => handleInput(event, index)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                onPaste={handlePaste}
                variant="otp"
              />
            ))}
          </div>

          {state.errors.otp && (
            <p
              className="mt-3 text-center text-sm text-red-500"
              role="alert"
            >
              {state.errors.otp[0]}
            </p>
          )}
        </fieldset>

        <button
          type="submit"
          disabled={pending}
          className="
            w-full rounded-xl
            bg-neutral-900 py-3.5
            font-bold text-white
            transition
            hover:bg-neutral-800
            disabled:cursor-not-allowed
            disabled:opacity-70
            dark:bg-white
            dark:text-neutral-900
          "
        >
          {pending ? "Verifying..." : "Verify Code"}
        </button>
      </form>

      <Link
        href="/forgot-password"
        className="
          flex items-center justify-center gap-2
          text-sm text-neutral-500
          transition
          hover:text-neutral-900
          dark:hover:text-white
        "
      >
        <ArrowLeft size={16} />
        Change email
      </Link>
    </div>
  );
}