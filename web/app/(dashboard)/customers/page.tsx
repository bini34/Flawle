"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MOCK_CUSTOMERS } from "@/constants";
import { MoreHorizontal, Search, Mail, Phone, Filter } from "lucide-react";
import { useToast } from "@/components/Providers";

const Customers = () => {
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = MOCK_CUSTOMERS.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Customers
          </h1>
          <p className="mt-2 font-medium text-neutral-500 dark:text-neutral-400">
            Manage your customer base and view their history.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-4 rounded-3xl border border-neutral-100 bg-white p-5 shadow-sm transition-all md:flex-row dark:border-neutral-700 dark:bg-neutral-800">
        <div className="relative w-full md:w-96">
          <Search
            className="absolute top-1/2 left-4 -translate-y-1/2 text-neutral-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-transparent bg-neutral-50 py-3 pr-4 pl-11 text-sm font-medium placeholder-neutral-400 transition-all focus:border-lime-500 focus:ring-4 focus:ring-lime-500/10 focus:outline-none dark:bg-neutral-700 dark:text-neutral-200"
          />
        </div>
        <div className="flex w-full gap-3 md:w-auto">
          <button
            onClick={() =>
              showToast("Advanced filters feature coming soon!", "success")
            }
            className="flex items-center gap-2 rounded-xl border border-neutral-200 px-5 py-3 text-sm font-bold text-neutral-600 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700"
          >
            <Filter size={16} />
            Filters
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-neutral-100 bg-white shadow-sm transition-all dark:border-neutral-700 dark:bg-neutral-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-neutral-500 dark:text-neutral-400">
            <thead className="bg-neutral-50 text-xs font-bold tracking-wider text-neutral-400 uppercase dark:bg-neutral-800">
              <tr>
                <th className="px-8 py-5">Customer Name</th>
                <th className="px-8 py-5">Contact Info</th>
                <th className="px-8 py-5">Orders</th>
                <th className="px-8 py-5">Total Spent</th>
                <th className="px-8 py-5">Join Date</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-700">
              {filteredCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className="transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-700/50"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <Image
                        src={customer.avatarUrl}
                        alt=""
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-bold text-neutral-900 dark:text-white">
                          {customer.name}
                        </p>
                        <p className="text-xs font-medium text-neutral-400">
                          ID: {customer.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-xs font-medium text-neutral-600 dark:text-neutral-300">
                        <Mail size={14} className="text-neutral-400" />
                        {customer.email}
                      </div>
                      <div className="flex items-center gap-2 text-xs font-medium text-neutral-600 dark:text-neutral-300">
                        <Phone size={14} className="text-neutral-400" />
                        {customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 font-bold text-neutral-900 dark:text-white">
                    {customer.totalOrders}
                  </td>
                  <td className="px-8 py-5 font-bold text-neutral-900 dark:text-white">
                    ${customer.totalSpent.toLocaleString()}
                  </td>
                  <td className="px-8 py-5 font-medium">{customer.joinDate}</td>
                  <td className="px-8 py-5">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${customer.status === "Active" ? "bg-lime-100 text-lime-700 dark:bg-lime-900/40 dark:text-lime-400" : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"}`}
                    >
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="rounded-lg p-2 text-neutral-500 transition-colors hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-700">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Customers;
