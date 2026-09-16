"use client";

import React, { useState } from "react";
import { Save, Store, CreditCard, Shield, Bell, Moon, Sun } from "lucide-react";
import { useToast, useTheme } from "@/components/Providers";

const SettingsPage = () => {
  const { showToast } = useToast();
  const { isDarkMode, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<
    "general" | "payment" | "security" | "notifications"
  >("general");

  const handleSave = () => {
    setTimeout(() => {
      showToast("Settings saved successfully", "success");
    }, 500);
  };

  const TabButton = ({
    id,
    label,
    icon: Icon,
  }: {
    id: "general" | "payment" | "security" | "notifications";
    label: string;
    icon: React.ElementType;
  }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex w-full items-center gap-3 rounded-xl px-5 py-3 text-left text-sm font-bold transition-all ${
        activeTab === id
          ? "bg-lime-100 text-lime-900 dark:bg-lime-900/20 dark:text-lime-400"
          : "text-neutral-500 hover:bg-neutral-50 dark:text-neutral-400 dark:hover:bg-neutral-800"
      }`}
    >
      <Icon size={20} />
      {label}
    </button>
  );

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
          Store Settings
        </h1>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-neutral-900/10 transition-all hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:shadow-none dark:hover:bg-neutral-200"
        >
          <Save size={18} /> Save Changes
        </button>
      </div>

      <div className="flex flex-col items-start gap-8 md:flex-row">
        <div className="flex w-full flex-col gap-2 rounded-3xl border border-neutral-100 bg-white p-4 shadow-sm transition-all md:w-72 dark:border-neutral-700 dark:bg-neutral-800">
          <TabButton id="general" label="General Info" icon={Store} />
          <TabButton id="payment" label="Payments" icon={CreditCard} />
          <TabButton id="security" label="Security" icon={Shield} />
          <TabButton id="notifications" label="Notifications" icon={Bell} />
        </div>

        <div className="w-full flex-1 space-y-6">
          {activeTab === "general" && (
            <div className="animate-fadeIn space-y-6">
              <div className="overflow-hidden rounded-3xl border border-neutral-100 bg-white shadow-sm transition-all dark:border-neutral-700 dark:bg-neutral-800">
                <div className="border-b border-neutral-100 p-8 dark:border-neutral-700">
                  <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
                    Appearance
                  </h2>
                  <p className="mt-1 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                    Customize the interface theme.
                  </p>
                </div>
                <div className="flex items-center justify-between p-8">
                  <div className="flex items-center gap-4">
                    <div
                      className={`rounded-2xl p-3 ${isDarkMode ? "bg-indigo-900/30 text-indigo-400" : "bg-amber-100 text-amber-600"}`}
                    >
                      {isDarkMode ? <Moon size={24} /> : <Sun size={24} />}
                    </div>
                    <div>
                      <p className="text-base font-bold text-neutral-900 dark:text-white">
                        Dark Mode
                      </p>
                      <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                        {isDarkMode
                          ? "Switch to light mode"
                          : "Switch to dark mode"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={toggleTheme}
                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:ring-4 focus:ring-lime-500/20 focus:outline-none ${isDarkMode ? "bg-lime-500" : "bg-neutral-200 dark:bg-neutral-700"}`}
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${isDarkMode ? "translate-x-7" : "translate-x-1"}`}
                    />
                  </button>
                </div>
              </div>

              <div className="overflow-hidden rounded-3xl border border-neutral-100 bg-white shadow-sm transition-all dark:border-neutral-700 dark:bg-neutral-800">
                <div className="border-b border-neutral-100 p-8 dark:border-neutral-700">
                  <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
                    Business Information
                  </h2>
                  <p className="mt-1 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                    Visible to your customers on invoices and emails.
                  </p>
                </div>
                <div className="space-y-6 p-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="mb-2 block text-sm font-bold text-neutral-700 dark:text-neutral-300">
                        Store Name
                      </label>
                      <input
                        type="text"
                        defaultValue="SadaxCart"
                        className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm font-medium transition-all outline-none focus:ring-2 focus:ring-lime-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-bold text-neutral-700 dark:text-neutral-300">
                        Support Email
                      </label>
                      <input
                        type="email"
                        defaultValue="support@sadax.studio"
                        className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm font-medium transition-all outline-none focus:ring-2 focus:ring-lime-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold text-neutral-700 dark:text-neutral-300">
                      Store Description
                    </label>
                    <textarea
                      className="h-28 w-full resize-none rounded-xl border border-neutral-200 px-4 py-3 text-sm font-medium transition-all outline-none focus:ring-2 focus:ring-lime-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                      defaultValue="Premium electronics and lifestyle products."
                    ></textarea>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold text-neutral-700 dark:text-neutral-300">
                      Currency
                    </label>
                    <select className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-medium transition-all outline-none focus:ring-2 focus:ring-lime-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white">
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                      <option>BDT (৳)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "payment" && (
            <div className="animate-fadeIn space-y-6">
              <div className="overflow-hidden rounded-3xl border border-neutral-100 bg-white shadow-sm transition-all dark:border-neutral-700 dark:bg-neutral-800">
                <div className="border-b border-neutral-100 p-8 dark:border-neutral-700">
                  <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
                    Payment Gateways
                  </h2>
                  <p className="mt-1 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                    Configure how you accept payments.
                  </p>
                </div>
                <div className="space-y-6 p-8">
                  <div className="flex items-start justify-between rounded-2xl border border-neutral-200 bg-neutral-50/50 p-6 dark:border-neutral-700 dark:bg-neutral-700/20">
                    <div className="flex items-center gap-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#635BFF] text-xs font-bold text-white shadow-sm">
                        Stripe
                      </div>
                      <div>
                        <h4 className="font-bold text-neutral-900 dark:text-white">
                          Stripe Payments
                        </h4>
                        <p className="mt-1 text-xs font-medium text-neutral-500 dark:text-neutral-400">
                          Credit card, Apple Pay, Google Pay
                        </p>
                      </div>
                    </div>
                    <label className="relative mt-2 inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        defaultChecked
                      />
                      <div className="peer h-6 w-11 rounded-full bg-neutral-200 peer-checked:bg-lime-500 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-neutral-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white dark:bg-neutral-600"></div>
                    </label>
                  </div>

                  <div className="flex items-start justify-between rounded-2xl border border-neutral-200 bg-neutral-50/50 p-6 dark:border-neutral-700 dark:bg-neutral-700/20">
                    <div className="flex items-center gap-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00457C] text-xs font-bold text-white shadow-sm">
                        PayPal
                      </div>
                      <div>
                        <h4 className="font-bold text-neutral-900 dark:text-white">
                          PayPal Standard
                        </h4>
                        <p className="mt-1 text-xs font-medium text-neutral-500 dark:text-neutral-400">
                          Accept PayPal payments worldwide
                        </p>
                      </div>
                    </div>
                    <label className="relative mt-2 inline-flex cursor-pointer items-center">
                      <input type="checkbox" className="peer sr-only" />
                      <div className="peer h-6 w-11 rounded-full bg-neutral-200 peer-checked:bg-lime-500 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-neutral-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white dark:bg-neutral-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="animate-fadeIn overflow-hidden rounded-3xl border border-neutral-100 bg-white shadow-sm transition-all dark:border-neutral-700 dark:bg-neutral-800">
              <div className="border-b border-neutral-100 p-8 dark:border-neutral-700">
                <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
                  Security Settings
                </h2>
                <p className="mt-1 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                  Protect your admin account and store.
                </p>
              </div>
              <div className="space-y-8 p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-base font-bold text-neutral-900 dark:text-white">
                      Two-Factor Authentication (2FA)
                    </p>
                    <p className="mt-1 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                      Add an extra layer of security to your account.
                    </p>
                  </div>
                  <button className="rounded-xl border border-lime-200 bg-lime-50 px-4 py-2 text-sm font-bold text-lime-700 transition-colors hover:bg-lime-100 dark:border-lime-800 dark:bg-lime-900/20 dark:text-lime-400 dark:hover:bg-lime-900/40">
                    Enable 2FA
                  </button>
                </div>
                <hr className="border-neutral-100 dark:border-neutral-700" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-base font-bold text-neutral-900 dark:text-white">
                      Session Timeout
                    </p>
                    <p className="mt-1 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                      Automatically log out after inactivity.
                    </p>
                  </div>
                  <select className="rounded-xl border-neutral-200 px-3 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-lime-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white">
                    <option>15 minutes</option>
                    <option>30 minutes</option>
                    <option>1 hour</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="animate-fadeIn overflow-hidden rounded-3xl border border-neutral-100 bg-white shadow-sm transition-all dark:border-neutral-700 dark:bg-neutral-800">
              <div className="border-b border-neutral-100 p-8 dark:border-neutral-700">
                <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
                  Notification Preferences
                </h2>
                <p className="mt-1 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                  Choose what you want to be notified about.
                </p>
              </div>
              <div className="space-y-6 p-8">
                {[
                  "New Order Received",
                  "Low Stock Alert",
                  "New User Registration",
                  "System Updates",
                ].map((item) => (
                  <div key={item} className="flex items-center justify-between">
                    <span className="text-base font-bold text-neutral-700 dark:text-neutral-300">
                      {item}
                    </span>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        defaultChecked
                      />
                      <div className="peer h-6 w-11 rounded-full bg-neutral-200 peer-checked:bg-lime-500 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-neutral-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white dark:bg-neutral-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
