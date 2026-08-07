'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CURRENT_USER } from '@/constants';
import { Camera, Lock, User, Mail, Save, LogOut } from 'lucide-react';
import { useToast } from '@/components/Providers';

const Profile = () => {
  const { showToast } = useToast();
  const router = useRouter();

  const handleSave = () => {
    showToast("Profile updated successfully", "success");
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      showToast("Signing out...", "success");
      setTimeout(() => {
        router.push('/login');
      }, 1000);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">My Profile</h1>
          <p className="text-neutral-500 dark:text-neutral-400 mt-2 font-medium">Manage your account settings and preferences.</p>
        </div>
        <button
          onClick={handleSave}
          className="bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-neutral-900/10 dark:shadow-none"
        >
          <Save size={18} />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="md:col-span-1 space-y-6">
            <div className="bg-white dark:bg-neutral-800 rounded-3xl border border-neutral-100 dark:border-neutral-700 shadow-sm p-8 flex flex-col items-center text-center transition-all">
               <div className="relative mb-6 group cursor-pointer">
                  <Image src={CURRENT_USER.avatarUrl ?? ''} alt="" width={112} height={112} className="w-28 h-28 rounded-full object-cover ring-4 ring-neutral-50 dark:ring-neutral-700 shadow-md" />
                  <div className="absolute inset-0 bg-neutral-900/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm">
                     <Camera className="text-white" size={28} />
                  </div>
               </div>
               <h2 className="text-xl font-bold text-neutral-900 dark:text-white">{CURRENT_USER.name}</h2>
               <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6 font-medium">{CURRENT_USER.email}</p>
               <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-lime-100 text-lime-700 dark:bg-lime-900/40 dark:text-lime-400 uppercase tracking-wide">
                  {CURRENT_USER.role}
               </span>
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-3xl border border-neutral-100 dark:border-neutral-700 shadow-sm p-6 transition-all">
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-4">Session Management</h3>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl text-sm font-bold transition-colors"
                >
                  <LogOut size={18} />
                  Sign Out
                </button>
            </div>
         </div>

         <div className="md:col-span-2 space-y-8">
            <div className="bg-white dark:bg-neutral-800 rounded-3xl border border-neutral-100 dark:border-neutral-700 shadow-sm overflow-hidden transition-all">
               <div className="p-8 border-b border-neutral-100 dark:border-neutral-700">
                 <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Personal Information</h3>
               </div>
               <div className="p-8 space-y-6">
                  <div>
                     <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">Full Name</label>
                     <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                        <input type="text" defaultValue={CURRENT_USER.name} className="w-full pl-12 pr-4 py-3 bg-neutral-50 dark:bg-neutral-700 border border-transparent focus:border-lime-500 rounded-xl text-sm focus:ring-4 focus:ring-lime-500/10 dark:text-white outline-none transition-all font-medium" />
                     </div>
                  </div>
                  <div>
                     <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">Email Address</label>
                     <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                        <input type="email" defaultValue={CURRENT_USER.email} className="w-full pl-12 pr-4 py-3 bg-neutral-50 dark:bg-neutral-700 border border-transparent focus:border-lime-500 rounded-xl text-sm focus:ring-4 focus:ring-lime-500/10 dark:text-white outline-none transition-all font-medium" />
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-3xl border border-neutral-100 dark:border-neutral-700 shadow-sm overflow-hidden transition-all">
               <div className="p-8 border-b border-neutral-100 dark:border-neutral-700">
                 <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Change Password</h3>
               </div>
               <div className="p-8 space-y-6">
                  <div>
                     <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">Current Password</label>
                     <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                        <input type="password" placeholder="••••••••" className="w-full pl-12 pr-4 py-3 bg-neutral-50 dark:bg-neutral-700 border border-transparent focus:border-lime-500 rounded-xl text-sm focus:ring-4 focus:ring-lime-500/10 dark:text-white outline-none transition-all font-medium" />
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                     <div>
                        <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">New Password</label>
                        <div className="relative">
                           <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                           <input type="password" placeholder="••••••••" className="w-full pl-12 pr-4 py-3 bg-neutral-50 dark:bg-neutral-700 border border-transparent focus:border-lime-500 rounded-xl text-sm focus:ring-4 focus:ring-lime-500/10 dark:text-white outline-none transition-all font-medium" />
                        </div>
                     </div>
                     <div>
                        <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">Confirm Password</label>
                        <div className="relative">
                           <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                           <input type="password" placeholder="••••••••" className="w-full pl-12 pr-4 py-3 bg-neutral-50 dark:bg-neutral-700 border border-transparent focus:border-lime-500 rounded-xl text-sm focus:ring-4 focus:ring-lime-500/10 dark:text-white outline-none transition-all font-medium" />
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
