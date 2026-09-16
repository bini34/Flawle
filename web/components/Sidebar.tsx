"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useCurrentUser from "@/components/shared/CurrentUser";
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
  // Search,
} from "lucide-react";
import { useTheme } from "@/components/Providers";
import { Logo } from "@/components/Logo";

const SidebarItem = ({
  icon: Icon,
  label,
  path,
  active,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  path: string;
  active: boolean;
  onClick?: () => void;
}) => {
  return (
    <Link
      href={path}
      onClick={onClick}
      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 md:justify-center md:px-2 lg:justify-start lg:px-4 ${
        active
          ? "bg-lime-500 text-white shadow-lg shadow-lime-500/20"
          : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
      }`}
    >
      <Icon size={20} className="flex-shrink-0" />
      <span className="whitespace-nowrap md:hidden lg:block">{label}</span>
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
  const user = useCurrentUser();
  return (
    <>
      {/* Mobile Backdrop Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-neutral-900/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex transform flex-col border-r border-neutral-100 bg-white transition-all duration-300 ease-in-out dark:border-neutral-800 dark:bg-neutral-900 ${
          isOpen
            ? "w-72 translate-x-0"
            : "w-72 -translate-x-full md:w-20 md:translate-x-0 lg:w-72"
        }`}
      >
        <div className="flex h-24 items-center justify-between p-8 md:justify-center md:p-4 lg:justify-between lg:p-8">
          <div className="flex items-center gap-3">
            <span className="text-xl font-extrabold tracking-tight text-neutral-900 md:hidden lg:block dark:text-white">
              Flawle Admin
            </span>
          </div>
          {/* Mobile Close Button */}
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-neutral-500 transition-colors hover:bg-neutral-100 md:hidden dark:hover:bg-neutral-800"
          >
            <X size={20} />
          </button>
        </div>

        {/* <div className="mb-6 px-6 md:hidden lg:block">
          <div className="group relative">
            <Search
              className="absolute top-1/2 left-3 -translate-y-1/2 text-neutral-400 transition-colors group-focus-within:text-lime-500"
              size={18}
            />
            <input
              type="text"
              placeholder="Search"
              className="w-full rounded-2xl border border-transparent bg-neutral-50 py-3 pr-4 pl-10 text-sm font-medium placeholder-neutral-400 transition-all focus:border-lime-500 focus:ring-4 focus:ring-lime-500/10 focus:outline-none dark:bg-neutral-800 dark:text-neutral-200"
            />
          </div>
        </div> */}

        <nav className="scrollbar-hide mt-4 flex-1 space-y-8 overflow-y-auto px-4 pb-6 md:px-2 lg:px-4">
          <div>
            <p className="mb-4 px-4 text-xs font-bold tracking-widest text-neutral-400 uppercase md:hidden lg:block">
              Main Menu
            </p>
            <div className="space-y-1.5">
              <SidebarItem
                onClick={onClose}
                icon={LayoutDashboard}
                label="Dashboard"
                path="/"
                active={pathname === "/"}
              />

              <div className="space-y-1.5 pt-1">
                <SidebarItem
                  onClick={onClose}
                  icon={Package}
                  label="Products"
                  path="/products"
                  active={pathname === "/products"}
                />
                <SidebarItem
                  onClick={onClose}
                  icon={Layers}
                  label="Categories"
                  path="/categories"
                  active={pathname === "/categories"}
                />
                <SidebarItem
                  onClick={onClose}
                  icon={Tag}
                  label="Brands"
                  path="/brands"
                  active={pathname === "/brands"}
                />
                <SidebarItem
                  onClick={onClose}
                  icon={ShoppingCart}
                  label="Orders"
                  path="/orders"
                  active={pathname.startsWith("/orders")}
                />
                <SidebarItem
                  onClick={onClose}
                  icon={Users}
                  label="Customers"
                  path="/customers"
                  active={pathname === "/customers"}
                />
              </div>
            </div>
          </div>

          <div>
            <p className="mb-4 px-4 text-xs font-bold tracking-widest text-neutral-400 uppercase md:hidden lg:block">
              Analytics
            </p>
            <div className="space-y-1.5">
              <SidebarItem
                onClick={onClose}
                icon={BarChart3}
                label="Reports"
                path="/reports"
                active={pathname === "/reports"}
              />
            </div>
          </div>

          <div>
            <p className="mb-4 px-4 text-xs font-bold tracking-widest text-neutral-400 uppercase md:hidden lg:block">
              Management
            </p>
            <div className="space-y-1.5">
              <SidebarItem
                onClick={onClose}
                icon={ShieldCheck}
                label="Users"
                path="/users"
                active={pathname === "/users"}
              />
              <SidebarItem
                onClick={onClose}
                icon={Settings}
                label="Settings"
                path="/settings"
                active={pathname === "/settings"}
              />
            </div>
          </div>
        </nav>

        <div className="space-y-4 border-t border-neutral-100 p-6 md:p-3 lg:p-6 dark:border-neutral-800">
          <div className="flex items-center justify-between px-2 md:justify-center lg:justify-between">
            <span className="text-sm font-semibold text-neutral-500 md:hidden lg:block dark:text-neutral-400">
              Dark Mode
            </span>
            <button
              onClick={toggleTheme}
              className="rounded-xl p-2 text-neutral-500 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
              title="Toggle Dark Mode"
            >
              {isDarkMode ? (
                <Sun size={20} className="text-lime-400" />
              ) : (
                <Moon size={20} />
              )}
            </button>
          </div>

          <Link
            onClick={onClose}
            href="/profile"
            className={`flex cursor-pointer items-center gap-3 rounded-2xl p-3 transition-all md:justify-center lg:justify-start ${
              pathname === "/profile"
                ? "bg-lime-50 ring-1 ring-lime-200 dark:bg-lime-900/20 dark:ring-lime-800"
                : "border border-transparent hover:bg-neutral-50 dark:hover:bg-neutral-800"
            }`}
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-white bg-lime-500 text-sm font-bold text-white shadow-sm dark:border-neutral-700">
              {user?.first_name?.[0]?.toUpperCase() ?? "?"}
            </div>
            <div className="min-w-0 flex-1 md:hidden lg:block">
              <p className="truncate text-sm font-bold text-neutral-900 dark:text-white">
                {user?.first_name} {user?.last_name}
              </p>
              <p className="truncate text-xs font-medium text-neutral-500 dark:text-neutral-400">
                {user?.role}
              </p>
            </div>
            <ChevronDown
              size={16}
              className="text-neutral-400 md:hidden lg:block"
            />
          </Link>
        </div>
      </aside>
    </>
  );
};

export const MobileHeader = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const user = useCurrentUser();

  return (
    <div className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-neutral-100 bg-white px-6 transition-colors duration-200 md:hidden dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="-ml-2 rounded-xl p-2 text-neutral-600 transition-colors hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-800"
        >
          <Menu size={24} />
        </button>
        <span className="text-xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
          SadaxCart
        </span>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="text-neutral-500 dark:text-neutral-400"
        >
          {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
        </button>
        <Link href="/profile">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-lime-500 text-sm font-bold text-white ring-2 ring-lime-100 dark:ring-lime-900">
            {user?.first_name?.[0]?.toUpperCase() ?? "?"}
          </div>
        </Link>
      </div>
    </div>
  );
};
