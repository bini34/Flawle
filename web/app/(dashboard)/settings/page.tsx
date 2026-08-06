'use client';

import React, { useState } from 'react';
import { Save, Store, CreditCard, Shield, Bell, Moon, Sun } from 'lucide-react';
import { useToast, useTheme } from '@/components/Providers';

const SettingsPage = () => {
  const { showToast } = useToast();
  const { isDarkMode, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<'general' | 'payment' | 'security' | 'notifications'>('general');

  const handleSave = () => {
    setTimeout(() => {
      showToast("Settings saved successfully", "success");
    }, 500);
  };

  const TabButton = ({ id, label, icon: Icon }: { id: 'general' | 'payment' | 'security' | 'notifications'; label: string; icon: React.ElementType }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-3 px-5 py-3 text-sm font-bold rounded-xl transition-all w-full text-left ${
        activeTab === id
          ? 'bg-lime-100 text-lime-900 dark:bg-lime-900/20 dark:text-lime-400'
          : 'text-neutral-500 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800'
      }`}
    >
      <Icon size={20} />
      {label}
    </button>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">Store Settings</h1>
        <button
          onClick={handleSave}
          className="bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-neutral-900/10 dark:shadow-none"
        >
          <Save size={18} /> Save Changes
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-72 bg-white dark:bg-neutral-800 rounded-3xl border border-neutral-100 dark:border-neutral-700 shadow-sm p-4 flex flex-col gap-2 transition-all">
           <TabButton id="general" label="General Info" icon={Store} />
           <TabButton id="payment" label="Payments" icon={CreditCard} />
           <TabButton id="security" label="Security" icon={Shield} />
           <TabButton id="notifications" label="Notifications" icon={Bell} />
        </div>

        <div className="flex-1 w-full space-y-6">

          {activeTab === 'general' && (
            <div className="space-y-6 animate-fadeIn">
               <div className="bg-white dark:bg-neutral-800 rounded-3xl border border-neutral-100 dark:border-neutral-700 shadow-sm overflow-hidden transition-all">
                  <div className="p-8 border-b border-neutral-100 dark:border-neutral-700">
                    <h2 className="text-lg font-bold text-neutral-900 dark:text-white">Appearance</h2>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium mt-1">Customize the interface theme.</p>
                  </div>
                  <div className="p-8 flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-2xl ${isDarkMode ? 'bg-indigo-900/30 text-indigo-400' : 'bg-amber-100 text-amber-600'}`}>
                           {isDarkMode ? <Moon size={24} /> : <Sun size={24} />}
                        </div>
                        <div>
                           <p className="text-base font-bold text-neutral-900 dark:text-white">Dark Mode</p>
                           <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">
                             {isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                           </p>
                        </div>
                     </div>
                     <button
                        onClick={toggleTheme}
                        className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-4 focus:ring-lime-500/20 ${isDarkMode ? 'bg-lime-500' : 'bg-neutral-200 dark:bg-neutral-700'}`}
                     >
                        <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${isDarkMode ? 'translate-x-7' : 'translate-x-1'}`} />
                     </button>
                  </div>
               </div>

              <div className="bg-white dark:bg-neutral-800 rounded-3xl border border-neutral-100 dark:border-neutral-700 shadow-sm overflow-hidden transition-all">
                <div className="p-8 border-b border-neutral-100 dark:border-neutral-700">
                  <h2 className="text-lg font-bold text-neutral-900 dark:text-white">Business Information</h2>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium mt-1">Visible to your customers on invoices and emails.</p>
                </div>
                <div className="p-8 space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">Store Name</label>
                      <input type="text" defaultValue="SadaxCart" className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white rounded-xl text-sm focus:ring-2 focus:ring-lime-500 outline-none transition-all font-medium" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">Support Email</label>
                      <input type="email" defaultValue="support@sadax.studio" className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white rounded-xl text-sm focus:ring-2 focus:ring-lime-500 outline-none transition-all font-medium" />
                    </div>
                  </div>
                  <div>
                      <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">Store Description</label>
                      <textarea className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white rounded-xl text-sm h-28 resize-none focus:ring-2 focus:ring-lime-500 outline-none transition-all font-medium" defaultValue="Premium electronics and lifestyle products."></textarea>
                  </div>
                  <div>
                      <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">Currency</label>
                      <select className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white rounded-xl text-sm bg-white dark:bg-neutral-700 focus:ring-2 focus:ring-lime-500 outline-none transition-all font-medium">
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                        <option>BDT (৳)</option>
                      </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="space-y-6 animate-fadeIn">
               <div className="bg-white dark:bg-neutral-800 rounded-3xl border border-neutral-100 dark:border-neutral-700 shadow-sm overflow-hidden transition-all">
                 <div className="p-8 border-b border-neutral-100 dark:border-neutral-700">
                   <h2 className="text-lg font-bold text-neutral-900 dark:text-white">Payment Gateways</h2>
                   <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium mt-1">Configure how you accept payments.</p>
                 </div>
                 <div className="p-8 space-y-6">
                    <div className="flex items-start justify-between p-6 border border-neutral-200 dark:border-neutral-700 rounded-2xl bg-neutral-50/50 dark:bg-neutral-700/20">
                       <div className="flex items-center gap-5">
                          <div className="w-12 h-12 bg-[#635BFF] rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-sm">Stripe</div>
                          <div>
                             <h4 className="font-bold text-neutral-900 dark:text-white">Stripe Payments</h4>
                             <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium mt-1">Credit card, Apple Pay, Google Pay</p>
                          </div>
                       </div>
                       <label className="relative inline-flex items-center cursor-pointer mt-2">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-neutral-200 dark:bg-neutral-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-lime-500"></div>
                       </label>
                    </div>

                    <div className="flex items-start justify-between p-6 border border-neutral-200 dark:border-neutral-700 rounded-2xl bg-neutral-50/50 dark:bg-neutral-700/20">
                       <div className="flex items-center gap-5">
                          <div className="w-12 h-12 bg-[#00457C] rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-sm">PayPal</div>
                          <div>
                             <h4 className="font-bold text-neutral-900 dark:text-white">PayPal Standard</h4>
                             <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium mt-1">Accept PayPal payments worldwide</p>
                          </div>
                       </div>
                       <label className="relative inline-flex items-center cursor-pointer mt-2">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-neutral-200 dark:bg-neutral-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-lime-500"></div>
                       </label>
                    </div>
                 </div>
               </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="bg-white dark:bg-neutral-800 rounded-3xl border border-neutral-100 dark:border-neutral-700 shadow-sm overflow-hidden animate-fadeIn transition-all">
              <div className="p-8 border-b border-neutral-100 dark:border-neutral-700">
                <h2 className="text-lg font-bold text-neutral-900 dark:text-white">Security Settings</h2>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium mt-1">Protect your admin account and store.</p>
              </div>
              <div className="p-8 space-y-8">
                <div className="flex items-center justify-between">
                   <div>
                     <p className="text-base font-bold text-neutral-900 dark:text-white">Two-Factor Authentication (2FA)</p>
                     <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium mt-1">Add an extra layer of security to your account.</p>
                   </div>
                   <button className="text-sm text-lime-700 dark:text-lime-400 font-bold border border-lime-200 dark:border-lime-800 bg-lime-50 dark:bg-lime-900/20 px-4 py-2 rounded-xl hover:bg-lime-100 dark:hover:bg-lime-900/40 transition-colors">Enable 2FA</button>
                </div>
                <hr className="border-neutral-100 dark:border-neutral-700" />
                <div className="flex items-center justify-between">
                   <div>
                     <p className="text-base font-bold text-neutral-900 dark:text-white">Session Timeout</p>
                     <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium mt-1">Automatically log out after inactivity.</p>
                   </div>
                   <select className="text-sm font-medium border-neutral-200 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-lime-500">
                      <option>15 minutes</option>
                      <option>30 minutes</option>
                      <option>1 hour</option>
                   </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
             <div className="bg-white dark:bg-neutral-800 rounded-3xl border border-neutral-100 dark:border-neutral-700 shadow-sm overflow-hidden animate-fadeIn transition-all">
              <div className="p-8 border-b border-neutral-100 dark:border-neutral-700">
                <h2 className="text-lg font-bold text-neutral-900 dark:text-white">Notification Preferences</h2>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium mt-1">Choose what you want to be notified about.</p>
              </div>
              <div className="p-8 space-y-6">
                  {['New Order Received', 'Low Stock Alert', 'New User Registration', 'System Updates'].map((item) => (
                    <div key={item} className="flex items-center justify-between">
                      <span className="text-base font-bold text-neutral-700 dark:text-neutral-300">{item}</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-neutral-200 dark:bg-neutral-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-lime-500"></div>
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
