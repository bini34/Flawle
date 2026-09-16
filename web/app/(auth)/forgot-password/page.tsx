// app/forgot-password/page.tsx — no "use client"
import RequestPasswordResetForm from "@/components/auth/RequestPasswordResetForm";
import VerifyResetOtpForm from "@/components/auth/VerifyResetOtpForm";
import SetNewPasswordForm from "@/components/auth/SetNewPasswordForm";

type Step = "email" | "otp" | "password";
const steps: Step[] = ["email", "otp", "password"];

export default async function ForgotPassword({
  searchParams,
}: {
  searchParams: Promise<{ step?: string }>;
}) {
  const { step } = await searchParams;
  const currentStep: Step =
    step === "otp" || step === "password" ? step : "email";
  const stepIndex = steps.indexOf(currentStep);

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-50 p-6 dark:bg-neutral-900">
      <section className="w-full max-w-md rounded-3xl border border-neutral-100 bg-white p-8 shadow-xl dark:border-neutral-700 dark:bg-neutral-800">
        <div className="mb-15">
          <p className="mb-4 text-sm font-medium text-neutral-500">
            Step {stepIndex + 1} of 3
          </p>
            {currentStep === "email" && <>
                 <h1 className="mb-2 text-3xl font-extrabold dark:text-white">
            Forgot password?
          </h1>
          <p className="mb-8 text-sm text-neutral-500 dark:text-neutral-400">
            Enter your email and we’ll send you a reset code.
          </p></>}
        {currentStep === "otp" && <>     <h1 className="mb-2 text-3xl font-extrabold dark:text-white">
            Verify OTP
          </h1>
          <p className="mb-8 text-sm text-neutral-500 dark:text-neutral-400">
            Enter the 6-digit code sent to your email.
          </p></>}
        {currentStep === "password" && <>     <h1 className="mb-2 text-3xl font-extrabold dark:text-white">
            Set New Password
          </h1>
          <p className="mb-8 text-sm text-neutral-500 dark:text-neutral-400">
            Enter your new password and confirm it.
          </p></>}
     
        </div>
        {/* Keep your existing logo, headings, and step-indicator styling */}

        {currentStep === "email" && <RequestPasswordResetForm />}
        {currentStep === "otp" && <VerifyResetOtpForm />}
        {currentStep === "password" && <SetNewPasswordForm />}
      </section>
    </main>
  );
}
