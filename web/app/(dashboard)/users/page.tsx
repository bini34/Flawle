'use client';

import React, { useState } from 'react';
import { MOCK_USERS } from '@/constants';
import { User, UserRole } from '@/types';
import { Plus, Search, MoreHorizontal, Shield, X, Trash2 } from 'lucide-react';
import { useToast } from '@/components/Providers';

const Users = () => {
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [newUser, setNewUser] = useState<Partial<User>>({
    name: '',
    email: '',
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
      status: 'Active',
      lastActive: 'Never'
    };
    setUsers([...users, user]);
    setIsModalOpen(false);
    showToast(`Invitation sent to ${newUser.email}`, 'success');
    setNewUser({ name: '', email: '', role: UserRole.STAFF });
  };

  const handleDeleteUser = (id: string) => {
    if (window.confirm("Are you sure you want to remove this user?")) {
      setUsers(users.filter(u => u.id !== id));
      showToast("User removed", "success");
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">User Management</h1>
          <p className="text-neutral-500 dark:text-neutral-400 mt-2 font-medium">Manage access and roles for your team members.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-neutral-900/10 dark:shadow-none"
        >
          <Plus size={18} />
          Add User
        </button>
      </div>

      <div className="bg-white dark:bg-neutral-800 p-5 rounded-3xl border border-neutral-100 dark:border-neutral-700 shadow-sm transition-all">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-neutral-50 dark:bg-neutral-700 border border-transparent focus:border-lime-500 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-lime-500/10 dark:text-neutral-200 placeholder-neutral-400 transition-all font-medium"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-800 rounded-3xl border border-neutral-100 dark:border-neutral-700 shadow-sm overflow-hidden transition-all">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-neutral-500 dark:text-neutral-400">
            <thead className="bg-neutral-50 dark:bg-neutral-800 text-xs uppercase text-neutral-400 font-bold tracking-wider">
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
                  <tr key={user.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <img src={user.avatarUrl} alt="" className="w-10 h-10 rounded-full object-cover" />
                        <div>
                          <p className="text-neutral-900 dark:text-white font-bold">{user.name}</p>
                          <p className="text-xs text-neutral-400 font-medium">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                       <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold
                        ${user.role === UserRole.SUPER_ADMIN
                          ? 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
                          : 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'}`}>
                        <Shield size={12} />
                        {user.role}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold
                        ${user.status === 'Active' ? 'bg-lime-100 text-lime-700 dark:bg-lime-900/40 dark:text-lime-400' : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300'}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-neutral-500 dark:text-neutral-400 font-medium">{user.lastActive}</td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-2">
                         <button className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg text-neutral-500 dark:text-neutral-400 transition-colors">
                           <MoreHorizontal size={18} />
                         </button>
                         <button onClick={() => handleDeleteUser(user.id)} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 rounded-lg text-neutral-500 dark:text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity">
                           <Trash2 size={18} />
                         </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-8 py-12 text-center text-neutral-500 dark:text-neutral-400 font-medium">
                    No users found matching &quot;{searchTerm}&quot;
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

       {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl w-full max-w-md border border-neutral-200 dark:border-neutral-700">
            <div className="flex justify-between items-center p-8 border-b border-neutral-100 dark:border-neutral-700">
              <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-white tracking-tight">Invite New User</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddUser} className="p-8 space-y-6">
              <div>
                <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">Full Name</label>
                <input required value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})} className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white rounded-xl focus:ring-2 focus:ring-lime-500 outline-none transition-all font-medium" placeholder="e.g. John Doe" />
              </div>
              <div>
                <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">Email Address</label>
                <input required type="email" value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})} className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white rounded-xl focus:ring-2 focus:ring-lime-500 outline-none transition-all font-medium" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">Role</label>
                <select value={newUser.role} onChange={e => setNewUser({...newUser, role: e.target.value as UserRole})} className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white rounded-xl focus:ring-2 focus:ring-lime-500 bg-white dark:bg-neutral-700 outline-none transition-all font-medium">
                  <option value={UserRole.STAFF}>Staff</option>
                  <option value={UserRole.SUPER_ADMIN}>Super Admin</option>
                </select>
              </div>

              <div className="pt-6 flex gap-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-3 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-xl font-bold transition-colors">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-3 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 text-white rounded-xl font-bold transition-all shadow-lg shadow-neutral-900/10 dark:shadow-none">Send Invite</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
