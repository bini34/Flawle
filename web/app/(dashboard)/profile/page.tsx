"use client";

import React from "react";
import { Lock, User, Mail, Save, LogOut } from "lucide-react";
import ProfileCard from "@/components/auth/profile";
import useCurrentUser from "@/components/shared/CurrentUser";
import { logoutAction } from "@/features/auth/actions";
const Profile = () => {
  const user = useCurrentUser();
  // const { showToast } = useToast();
  // const router = useRouter();

  // const handleSave = () => {
  //   showToast("Profile updated successfully", "success");
  // };

  // const handleLogout = () => {
  //   if (window.confirm("Are you sure you want to sign out?")) {
  //     showToast("Signing out...", "success");
  //     setTimeout(() => {
  //       router.push("/login");
  //     }, 1000);
  //   }
  // };

  return (
    <div className="mx-auto max-w-3xl space-y-8 pb-12">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            My Profile
          </h1>
          <p className="mt-2 font-medium text-neutral-500 dark:text-neutral-400">
            Manage your account settings and preferences.
          </p>
        </div>
        <button
          // onClick={handleSave}
          className="flex items-center gap-2 rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-neutral-900/10 transition-all hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:shadow-none dark:hover:bg-neutral-200"
        >
          <Save size={18} />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="space-y-6 md:col-span-1">
          <ProfileCard />
          <form action={logoutAction}>
            <div className="rounded-3xl border border-neutral-100 bg-white p-6 shadow-sm transition-all dark:border-neutral-700 dark:bg-neutral-800">
              <h3 className="mb-4 text-sm font-bold text-neutral-900 dark:text-white">
                Session Management
              </h3>
              <button
                type="submit"
                // onClick={handleLogout}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition-colors hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </div>
          </form>
        </div>

        <div className="space-y-8 md:col-span-2">
          <div className="overflow-hidden rounded-3xl border border-neutral-100 bg-white shadow-sm transition-all dark:border-neutral-700 dark:bg-neutral-800">
            <div className="border-b border-neutral-100 p-8 dark:border-neutral-700">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                Personal Information
              </h3>
            </div>
            <div key={user?.id ?? "loading"} className="space-y-6 p-8">
              <div>
                <label className="mb-2 block text-sm font-bold text-neutral-700 dark:text-neutral-300">
                  Full Name
                </label>
                <div className="relative">
                  <User
                    className="absolute top-1/2 left-4 -translate-y-1/2 text-neutral-400"
                    size={18}
                  />
                  <input
                    type="text"
                    defaultValue={[user?.first_name, user?.last_name]
                      .filter(Boolean)
                      .join(" ")}
                    className="w-full rounded-xl border border-transparent bg-neutral-50 py-3 pr-4 pl-12 text-sm font-medium transition-all outline-none focus:border-lime-500 focus:ring-4 focus:ring-lime-500/10 dark:bg-neutral-700 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-neutral-700 dark:text-neutral-300">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    className="absolute top-1/2 left-4 -translate-y-1/2 text-neutral-400"
                    size={18}
                  />
                  <input
                    type="email"
                    defaultValue={user?.email ?? ""}
                    className="w-full rounded-xl border border-transparent bg-neutral-50 py-3 pr-4 pl-12 text-sm font-medium transition-all outline-none focus:border-lime-500 focus:ring-4 focus:ring-lime-500/10 dark:bg-neutral-700 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-neutral-100 bg-white shadow-sm transition-all dark:border-neutral-700 dark:bg-neutral-800">
            <div className="border-b border-neutral-100 p-8 dark:border-neutral-700">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                Change Password
              </h3>
            </div>
            <div className="space-y-6 p-8">
              <div>
                <label className="mb-2 block text-sm font-bold text-neutral-700 dark:text-neutral-300">
                  Current Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute top-1/2 left-4 -translate-y-1/2 text-neutral-400"
                    size={18}
                  />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-transparent bg-neutral-50 py-3 pr-4 pl-12 text-sm font-medium transition-all outline-none focus:border-lime-500 focus:ring-4 focus:ring-lime-500/10 dark:bg-neutral-700 dark:text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="mb-2 block text-sm font-bold text-neutral-700 dark:text-neutral-300">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute top-1/2 left-4 -translate-y-1/2 text-neutral-400"
                      size={18}
                    />
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full rounded-xl border border-transparent bg-neutral-50 py-3 pr-4 pl-12 text-sm font-medium transition-all outline-none focus:border-lime-500 focus:ring-4 focus:ring-lime-500/10 dark:bg-neutral-700 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-neutral-700 dark:text-neutral-300">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute top-1/2 left-4 -translate-y-1/2 text-neutral-400"
                      size={18}
                    />
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full rounded-xl border border-transparent bg-neutral-50 py-3 pr-4 pl-12 text-sm font-medium transition-all outline-none focus:border-lime-500 focus:ring-4 focus:ring-lime-500/10 dark:bg-neutral-700 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
