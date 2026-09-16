"use client";
import { Camera } from "lucide-react";
import useCurrentUser from "@/components/shared/CurrentUser";

function ProfileCard() {
  const user = useCurrentUser();

  return (
    <div className="flex flex-col items-center rounded-3xl border border-neutral-100 bg-white p-8 text-center shadow-sm transition-all dark:border-neutral-700 dark:bg-neutral-800">
      <div className="group relative mb-6 cursor-pointer">
        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-lime-500 text-3xl font-bold text-white shadow-md ring-4 ring-neutral-50 dark:ring-neutral-700">
          {user?.first_name?.[0]?.toUpperCase() ?? "?"}
          {user?.last_name?.[0]?.toUpperCase()}
        </div>
        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-neutral-900/40 opacity-0 backdrop-blur-sm transition-all group-hover:opacity-100">
          <Camera className="text-white" size={28} />
        </div>
      </div>
      <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
        {user?.first_name} {user?.last_name}
      </h2>
      <p className="mb-6 text-sm font-medium text-neutral-500 dark:text-neutral-400">
        {user?.email}
      </p>
      <span className="inline-flex items-center rounded-full bg-lime-100 px-4 py-1.5 text-xs font-bold tracking-wide text-lime-700 uppercase dark:bg-lime-900/40 dark:text-lime-400">
        {user?.role}
      </span>
    </div>
  );
}

export default ProfileCard;
