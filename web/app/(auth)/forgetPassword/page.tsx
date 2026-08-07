'use client';

import { useState, useRef } from 'react';
import { Lock, Mail, ArrowLeft, ShieldCheck } from 'lucide-react';
import { Logo } from '@/components/Logo';
import Link from 'next/link';

type Step = 'email' | 'otp' | 'password';

export default function ForgotPassword() {
  const steps: Step[] = ['email', 'otp', 'password'];
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const stepIndex = steps.indexOf(step);

  function handleOtpChange(index: number, value: string) {
    if (!/^\d?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    if (value && index < otp.length - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  }

  function handleOtpKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  }

  function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!email) return setError('Please enter your email.');
    setStep('otp');
  }

  function handleOtpSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (otp.some((d) => !d)) return setError('Please enter all 6 digits.');
    setStep('password');
  }

  function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (password.length < 8) return setError('Password must be at least 8 characters.');
    if (password !== confirm) return setError('Passwords do not match.');
    // TODO: submit new password to API
  }

  const inputClass = (hasError?: boolean) =>
    `w-full pl-12 pr-4 py-3 bg-neutral-50 dark:bg-neutral-700 border ${
      hasError ? 'border-red-500' : 'border-transparent'
    } focus:border-lime-500 rounded-xl text-sm focus:ring-4 focus:ring-lime-500/10 outline-none transition-all dark:text-white font-medium placeholder-neutral-400`;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center p-6 transition-colors duration-200">
      <div className="max-w-md w-full bg-white dark:bg-neutral-800 rounded-3xl shadow-xl p-10 border border-neutral-100 dark:border-neutral-700">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-neutral-900 dark:bg-white rounded-2xl flex items-center justify-center text-white dark:text-neutral-900 mx-auto mb-6 shadow-xl">
            <Logo className="w-8 h-8" />
          </div>

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === stepIndex
                    ? 'w-8 bg-lime-500'
                    : i < stepIndex
                    ? 'w-4 bg-lime-300 dark:bg-lime-700'
                    : 'w-4 bg-neutral-200 dark:bg-neutral-600'
                }`}
              />
            ))}
          </div>

          {step === 'email' && (
            <>
              <h2 className="text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">Forgot password?</h2>
              <p className="text-neutral-500 dark:text-neutral-400 mt-2 text-sm font-medium">Enter your email and we&apos;ll send you a reset code.</p>
            </>
          )}
          {step === 'otp' && (
            <>
              <h2 className="text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">Check your email</h2>
              <p className="text-neutral-500 dark:text-neutral-400 mt-2 text-sm font-medium">
                We sent a 6-digit code to <span className="text-neutral-900 dark:text-white font-bold">{email}</span>
              </p>
            </>
          )}
          {step === 'password' && (
            <>
              <h2 className="text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">Set new password</h2>
              <p className="text-neutral-500 dark:text-neutral-400 mt-2 text-sm font-medium">Must be at least 8 characters long.</p>
            </>
          )}
        </div>

        {/* Step 1 — Email */}
        {step === 'email' && (
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass()}
                  placeholder="Enter your email"
                />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" className="w-full bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 text-white py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-neutral-900/20 dark:shadow-none">
              Send Code
            </button>
            <Link href="/login" className="flex items-center justify-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white font-medium transition-colors">
              <ArrowLeft size={16} /> Back to sign in
            </Link>
          </form>
        )}

        {/* Step 2 — OTP */}
        {step === 'otp' && (
          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-4 text-center">Enter verification code</label>
              <div className="flex gap-2 justify-center">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => { otpRefs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    className="w-12 h-14 text-center text-xl font-bold bg-neutral-50 dark:bg-neutral-700 border border-transparent focus:border-lime-500 rounded-xl focus:ring-4 focus:ring-lime-500/10 outline-none transition-all dark:text-white"
                  />
                ))}
              </div>
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button type="submit" className="w-full bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 text-white py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-neutral-900/20 dark:shadow-none">
              Verify Code
            </button>
            <div className="text-center text-sm text-neutral-500 dark:text-neutral-400 font-medium">
              Didn&apos;t receive it?{' '}
              <button type="button" className="text-lime-600 dark:text-lime-400 font-bold hover:underline">
                Resend code
              </button>
            </div>
            <button type="button" onClick={() => setStep('email')} className="flex items-center justify-center gap-2 w-full text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white font-medium transition-colors">
              <ArrowLeft size={16} /> Change email
            </button>
          </form>
        )}

        {/* Step 3 — New Password */}
        {step === 'password' && (
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">New password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass(!!error && password.length < 8)}
                  placeholder="••••••••"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">Confirm password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
                <input
                  type="password"
                  required
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className={inputClass(!!error && password !== confirm)}
                  placeholder="••••••••"
                />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" className="w-full bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 text-white py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-neutral-900/20 dark:shadow-none flex items-center justify-center gap-2">
              <ShieldCheck size={18} /> Reset Password
            </button>
          </form>
        )}

        <div className="mt-8 text-center text-xs font-medium text-neutral-400 dark:text-neutral-500">
          &copy; 2026 Flawle . All rights reserved.
        </div>
      </div>
    </div>
  );
}
