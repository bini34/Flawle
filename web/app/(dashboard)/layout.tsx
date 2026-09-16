"use client";

import React, { useState } from "react";
import { Sidebar, MobileHeader } from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-50 transition-colors duration-200 dark:bg-neutral-950">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="transition-all duration-300 md:pl-20 lg:pl-72">
        <MobileHeader onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="p-6 md:p-8 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
