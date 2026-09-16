"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MOCK_USERS } from "@/constants";
import { User, UserRole } from "@/types";
import { Plus, Search, MoreHorizontal, Shield, X, Trash2 } from "lucide-react";
import { useToast } from "@/components/Providers";

const Users = () => {
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [newUser, setNewUser] = useState<Partial<User>>({
    name: "",
    email: "",
    role: UserRole.STAFF,
  });

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const user: User = {
      id: `u${users.length + 1}`,
      name: newUser.name!,
      email: newUser.email!,
      role: newUser.role || UserRole.STAFF,
      avatarUrl: `https://picsum.photos/50/50?random=${users.length + 10}`,
      status: "Active",
      lastActive: "Never",
    };
    setUsers([...users, user]);
    setIsModalOpen(false);
    showToast(`Invitation sent to ${newUser.email}`, "success");
    setNewUser({ name: "", email: "", role: UserRole.STAFF });
  };

  const handleDeleteUser = (id: string) => {
    if (window.confirm("Are you sure you want to remove this user?")) {
      setUsers(users.filter((u) => u.id !== id));
      showToast("User removed", "success");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            User Management
          </h1>
          <p className="mt-2 font-medium text-neutral-500 dark:text-neutral-400">
            Manage access and roles for your team members.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-neutral-900/10 transition-all hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:shadow-none dark:hover:bg-neutral-200"
        >
          <Plus size={18} />
          Add User
        </button>
      </div>

      <div className="rounded-3xl border border-neutral-100 bg-white p-5 shadow-sm transition-all dark:border-neutral-700 dark:bg-neutral-800">
        <div className="relative w-full md:w-96">
          <Search
            className="absolute top-1/2 left-4 -translate-y-1/2 text-neutral-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-transparent bg-neutral-50 py-3 pr-4 pl-11 text-sm font-medium placeholder-neutral-400 transition-all focus:border-lime-500 focus:ring-4 focus:ring-lime-500/10 focus:outline-none dark:bg-neutral-700 dark:text-neutral-200"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-neutral-100 bg-white shadow-sm transition-all dark:border-neutral-700 dark:bg-neutral-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-neutral-500 dark:text-neutral-400">
            <thead className="bg-neutral-50 text-xs font-bold tracking-wider text-neutral-400 uppercase dark:bg-neutral-800">
              <tr>
                <th className="px-8 py-5">User</th>
                <th className="px-8 py-5">Role</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5">Last Active</th>
                <th className="px-8 py-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-700">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="group transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-700/50"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <Image
                          src={user.avatarUrl ?? ""}
                          alt=""
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-bold text-neutral-900 dark:text-white">
                            {user.name}
                          </p>
                          <p className="text-xs font-medium text-neutral-400">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                          user.role === UserRole.SUPER_ADMIN
                            ? "bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                            : "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                        }`}
                      >
                        <Shield size={12} />
                        {user.role}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${user.status === "Active" ? "bg-lime-100 text-lime-700 dark:bg-lime-900/40 dark:text-lime-400" : "bg-neutral-100 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300"}`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 font-medium text-neutral-500 dark:text-neutral-400">
                      {user.lastActive}
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="rounded-lg p-2 text-neutral-500 transition-colors hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-700">
                          <MoreHorizontal size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="rounded-lg p-2 text-neutral-500 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-50 hover:text-red-600 dark:text-neutral-400 dark:hover:bg-red-900/30 dark:hover:text-red-400"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-8 py-12 text-center font-medium text-neutral-500 dark:text-neutral-400"
                  >
                    No users found matching &quot;{searchTerm}&quot;
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/60 p-4 backdrop-blur-sm transition-opacity">
          <div className="w-full max-w-md rounded-3xl border border-neutral-200 bg-white shadow-2xl dark:border-neutral-700 dark:bg-neutral-800">
            <div className="flex items-center justify-between border-b border-neutral-100 p-8 dark:border-neutral-700">
              <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                Invite New User
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-full p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-700 dark:hover:text-neutral-200"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddUser} className="space-y-6 p-8">
              <div>
                <label className="mb-2 block text-sm font-bold text-neutral-700 dark:text-neutral-300">
                  Full Name
                </label>
                <input
                  required
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                  className="w-full rounded-xl border border-neutral-200 px-4 py-3 font-medium transition-all outline-none focus:ring-2 focus:ring-lime-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                  placeholder="e.g. John Doe"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-neutral-700 dark:text-neutral-300">
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  className="w-full rounded-xl border border-neutral-200 px-4 py-3 font-medium transition-all outline-none focus:ring-2 focus:ring-lime-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-neutral-700 dark:text-neutral-300">
                  Role
                </label>
                <select
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({ ...newUser, role: e.target.value as UserRole })
                  }
                  className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 font-medium transition-all outline-none focus:ring-2 focus:ring-lime-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                >
                  <option value={UserRole.STAFF}>Staff</option>
                  <option value={UserRole.SUPER_ADMIN}>Super Admin</option>
                </select>
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 rounded-xl px-4 py-3 font-bold text-neutral-600 transition-colors hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-neutral-900 px-4 py-3 font-bold text-white shadow-lg shadow-neutral-900/10 transition-all hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:shadow-none dark:hover:bg-neutral-200"
                >
                  Send Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
