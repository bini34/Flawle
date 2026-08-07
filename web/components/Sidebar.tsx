'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Settings,
  BarChart3,
  Menu,
  ChevronDown,
  Package,
  Layers,
  ShieldCheck,
  X,
  Sun,
  Moon,
  Tag,
  Search
} from 'lucide-react';
import { CURRENT_USER } from '@/constants';
import { UserRole } from '@/types';
import { useTheme } from '@/components/Providers';
import { Logo } from '@/components/Logo';

const SidebarItem = ({ icon: Icon, label, path, active, onClick }: { icon: React.ElementType, label: string, path: string, active: boolean, onClick?: () => void }) => {
  return (
    <Link
      href={path}
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 md:justify-center lg:justify-start md:px-2 lg:px-4 ${
      active
        ? 'bg-lime-500 text-white shadow-lg shadow-lime-500/20'
        : 'text-neutral-500 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-200'
    }`}>
      <Icon size={20} className="flex-shrink-0" />
      <span className="md:hidden lg:block whitespace-nowrap">{label}</span>
    </Link>
  );
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname();
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-neutral-900/60 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <aside className={`fixed inset-y-0 left-0 z-50 bg-white dark:bg-neutral-900 border-r border-neutral-100 dark:border-neutral-800 flex flex-col transition-all duration-300 ease-in-out transform ${
        isOpen ? 'translate-x-0 w-72' : '-translate-x-full md:translate-x-0 w-72 md:w-20 lg:w-72'
      }`}>
        <div className="p-8 md:p-4 lg:p-8 flex items-center justify-between md:justify-center lg:justify-between h-24">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-neutral-900 dark:bg-white rounded-xl flex items-center justify-center text-white dark:text-neutral-900 shadow-xl flex-shrink-0">
               <Logo className="w-5 h-5" />
            </div>
            <span className="text-xl font-extrabold text-neutral-900 dark:text-white tracking-tight md:hidden lg:block">SadaxCart</span>
          </div>
          {/* Mobile Close Button */}
          <button
            onClick={onClose}
            className="md:hidden p-2 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-6 mb-6 md:hidden lg:block">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-lime-500 transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-transparent focus:border-lime-500 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-lime-500/10 dark:text-neutral-200 placeholder-neutral-400 transition-all font-medium"
            />
          </div>
        </div>

        <nav className="flex-1 px-4 md:px-2 lg:px-4 space-y-8 overflow-y-auto pb-6 scrollbar-hide mt-4">
          <div>
            <p className="px-4 text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4 md:hidden lg:block">Main Menu</p>
            <div className="space-y-1.5">
              <SidebarItem onClick={onClose} icon={LayoutDashboard} label="Dashboard" path="/" active={pathname === '/'} />

              <div className="space-y-1.5 pt-1">
                <SidebarItem onClick={onClose} icon={Package} label="Products" path="/products" active={pathname === '/products'} />
                <SidebarItem onClick={onClose} icon={Layers} label="Categories" path="/categories" active={pathname === '/categories'} />
                <SidebarItem onClick={onClose} icon={Tag} label="Brands" path="/brands" active={pathname === '/brands'} />
                <SidebarItem onClick={onClose} icon={ShoppingCart} label="Orders" path="/orders" active={pathname.startsWith('/orders')} />
                <SidebarItem onClick={onClose} icon={Users} label="Customers" path="/customers" active={pathname === '/customers'} />
              </div>
            </div>
          </div>

          <div>
             <p className="px-4 text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4 md:hidden lg:block">Analytics</p>
             <div className="space-y-1.5">
                <SidebarItem onClick={onClose} icon={BarChart3} label="Reports" path="/reports" active={pathname === '/reports'} />
             </div>
          </div>

          <div>
             <p className="px-4 text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4 md:hidden lg:block">Management</p>
             <div className="space-y-1.5">
                {CURRENT_USER.role === UserRole.SUPER_ADMIN && (
                  <SidebarItem onClick={onClose} icon={ShieldCheck} label="Users" path="/users" active={pathname === '/users'} />
                )}
                <SidebarItem onClick={onClose} icon={Settings} label="Settings" path="/settings" active={pathname === '/settings'} />
             </div>
          </div>
        </nav>

        <div className="p-6 md:p-3 lg:p-6 border-t border-neutral-100 dark:border-neutral-800 space-y-4">
          <div className="flex items-center justify-between px-2 md:justify-center lg:justify-between">
              <span className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 md:hidden lg:block">Dark Mode</span>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                title="Toggle Dark Mode"
              >
                {isDarkMode ? <Sun size={20} className="text-lime-400" /> : <Moon size={20} />}
              </button>
          </div>

          <Link onClick={onClose} href="/profile" className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all md:justify-center lg:justify-start ${
            pathname === '/profile'
              ? 'bg-lime-50 dark:bg-lime-900/20 ring-1 ring-lime-200 dark:ring-lime-800'
              : 'hover:bg-neutral-50 dark:hover:bg-neutral-800 border border-transparent'
          }`}>
            <Image src={CURRENT_USER.avatarUrl ?? ''} alt="Profile" width={40} height={40} className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-neutral-700 shadow-sm flex-shrink-0" />
            <div className="flex-1 min-w-0 md:hidden lg:block">
              <p className="text-sm font-bold text-neutral-900 dark:text-white truncate">{CURRENT_USER.name}</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate font-medium">{CURRENT_USER.role}</p>
            </div>
            <ChevronDown size={16} className="text-neutral-400 md:hidden lg:block" />
          </Link>
        </div>
      </aside>
    </>
  );
};

export const MobileHeader = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="md:hidden h-20 bg-white dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between px-6 sticky top-0 z-30 transition-colors duration-200">
       <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 -ml-2 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl transition-colors"
        >
          <Menu size={24} />
        </button>
        <span className="text-xl font-extrabold text-neutral-900 dark:text-white tracking-tight">SadaxCart</span>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={toggleTheme} className="text-neutral-500 dark:text-neutral-400">
          {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
        </button>
        <Link href="/profile">
          <Image src={CURRENT_USER.avatarUrl ?? ''} alt="Profile" width={36} height={36} className="w-9 h-9 rounded-full ring-2 ring-lime-100 dark:ring-lime-900" />
        </Link>
      </div>
    </div>
  );
};
