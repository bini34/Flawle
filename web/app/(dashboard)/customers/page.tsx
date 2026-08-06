'use client';

import React, { useState } from 'react';
import { MOCK_CUSTOMERS } from '@/constants';
import { MoreHorizontal, Search, Mail, Phone, Filter } from 'lucide-react';
import { useToast } from '@/components/Providers';

const Customers = () => {
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = MOCK_CUSTOMERS.filter(
    c => c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">Customers</h1>
          <p className="text-neutral-500 dark:text-neutral-400 mt-2 font-medium">Manage your customer base and view their history.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-800 p-5 rounded-3xl border border-neutral-100 dark:border-neutral-700 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center transition-all">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-neutral-50 dark:bg-neutral-700 border border-transparent focus:border-lime-500 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-lime-500/10 dark:text-neutral-200 placeholder-neutral-400 font-medium transition-all"
          />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button
             onClick={() => showToast('Advanced filters feature coming soon!', 'success')}
             className="px-5 py-3 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm font-bold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 flex items-center gap-2 transition-colors"
          >
            <Filter size={16} />
            Filters
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-800 rounded-3xl border border-neutral-100 dark:border-neutral-700 shadow-sm overflow-hidden transition-all">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-neutral-500 dark:text-neutral-400">
            <thead className="bg-neutral-50 dark:bg-neutral-800 text-xs uppercase text-neutral-400 font-bold tracking-wider">
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
                <tr key={customer.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <img src={customer.avatarUrl} alt="" className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <p className="text-neutral-900 dark:text-white font-bold">{customer.name}</p>
                        <p className="text-xs text-neutral-400 font-medium">ID: {customer.id}</p>
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
                  <td className="px-8 py-5 font-bold text-neutral-900 dark:text-white">{customer.totalOrders}</td>
                  <td className="px-8 py-5 font-bold text-neutral-900 dark:text-white">${customer.totalSpent.toLocaleString()}</td>
                  <td className="px-8 py-5 font-medium">{customer.joinDate}</td>
                  <td className="px-8 py-5">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold
                      ${customer.status === 'Active' ? 'bg-lime-100 text-lime-700 dark:bg-lime-900/40 dark:text-lime-400' : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400'}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg text-neutral-500 dark:text-neutral-400 transition-colors">
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
