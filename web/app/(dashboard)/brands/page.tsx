'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MOCK_BRANDS, CURRENT_USER } from '@/constants';
import { Brand, UserRole } from '@/types';
import { Search, Plus, Edit3, Trash2, X, UploadCloud, ShieldAlert } from 'lucide-react';
import { useToast } from '@/components/Providers';

const Brands = () => {
  const { showToast } = useToast();
  const [brands, setBrands] = useState<Brand[]>(MOCK_BRANDS);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);

  const [formData, setFormData] = useState<Partial<Brand>>({
    name: '',
    logoUrl: '',
    description: '',
    status: 'Active'
  });

  const isAdmin = CURRENT_USER.role === UserRole.SUPER_ADMIN;

  const handleOpenAdd = () => {
    setEditingBrand(null);
    setFormData({ name: '', logoUrl: '', description: '', status: 'Active' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (brand: Brand) => {
    setEditingBrand(brand);
    setFormData({
      name: brand.name,
      logoUrl: brand.logoUrl,
      description: brand.description,
      status: brand.status
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this brand? This action cannot be undone.")) {
      setBrands(brands.filter(b => b.id !== id));
      showToast("Brand deleted successfully", "success");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalLogo = formData.logoUrl || `https://ui-avatars.com/api/?name=${formData.name}&background=random`;

    if (editingBrand) {
      setBrands(prev => prev.map(b => b.id === editingBrand.id ? { ...b, ...formData, logoUrl: finalLogo } as Brand : b));
      showToast("Brand updated successfully", "success");
    } else {
      const newBrand: Brand = {
        id: `b${Date.now()}`,
        name: formData.name || 'New Brand',
        logoUrl: finalLogo,
        productsCount: 0,
        status: formData.status as 'Active' | 'Inactive',
        description: formData.description
      };
      setBrands(prev => [...prev, newBrand]);
      showToast("Brand created successfully", "success");
    }
    setIsModalOpen(false);
  };

  const filteredBrands = brands.filter(b =>
    b.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">Brand Management</h1>
          <p className="text-neutral-500 dark:text-neutral-400 mt-2 font-medium">Manage your product brands and partners.</p>
        </div>
        {isAdmin && (
          <button
            onClick={handleOpenAdd}
            className="bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-neutral-900/10 dark:shadow-none"
          >
            <Plus size={18} />
            Add Brand
          </button>
        )}
      </div>

      {!isAdmin && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-2xl p-4 flex items-center gap-3">
           <ShieldAlert className="text-blue-600 dark:text-blue-400" size={20} />
           <span className="text-sm font-bold text-blue-700 dark:text-blue-300">Read-Only Access: You can view brands but cannot make changes.</span>
        </div>
      )}

      <div className="bg-white dark:bg-neutral-800 p-5 rounded-3xl border border-neutral-100 dark:border-neutral-700 shadow-sm transition-all">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
          <input
            type="text"
            placeholder="Search brands..."
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
                <th className="px-8 py-5">Brand Name</th>
                <th className="px-8 py-5">Products</th>
                <th className="px-8 py-5">Status</th>
                {isAdmin && <th className="px-8 py-5 text-right">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-700">
              {filteredBrands.length > 0 ? (
                filteredBrands.map((brand) => (
                  <tr key={brand.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white dark:bg-neutral-700 rounded-xl border border-neutral-100 dark:border-neutral-600 p-2 flex items-center justify-center">
                           <Image src={brand.logoUrl} alt={brand.name} width={40} height={40} className="w-full h-full object-contain" />
                        </div>
                        <div>
                          <p className="text-neutral-900 dark:text-white font-bold">{brand.name}</p>
                          <p className="text-xs text-neutral-400 font-medium truncate max-w-[200px]">{brand.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 font-bold text-neutral-700 dark:text-neutral-300">
                      {brand.productsCount} items
                    </td>
                    <td className="px-8 py-5">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold
                        ${brand.status === 'Active' ? 'bg-lime-100 text-lime-700 dark:bg-lime-900/40 dark:text-lime-400' : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300'}`}>
                        {brand.status}
                      </span>
                    </td>
                    {isAdmin && (
                      <td className="px-8 py-5 text-right">
                        <div className="flex justify-end gap-2">
                           <button onClick={() => handleOpenEdit(brand)} className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg text-neutral-500 dark:text-neutral-400 transition-colors" title="Edit Brand">
                             <Edit3 size={18} />
                           </button>
                           <button onClick={() => handleDelete(brand.id)} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 rounded-lg text-neutral-500 dark:text-neutral-400 transition-colors" title="Delete Brand">
                             <Trash2 size={18} />
                           </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={isAdmin ? 4 : 3} className="px-8 py-12 text-center text-neutral-500 dark:text-neutral-400 font-medium">
                    No brands found matching &quot;{searchTerm}&quot;
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl w-full max-w-lg border border-neutral-200 dark:border-neutral-700">
            <div className="flex justify-between items-center p-8 border-b border-neutral-100 dark:border-neutral-700">
              <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
                {editingBrand ? 'Edit Brand' : 'Add Brand'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div>
                <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">Brand Name</label>
                <input
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white rounded-xl focus:ring-2 focus:ring-lime-500 outline-none transition-all font-medium"
                  placeholder="e.g. Nike"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white rounded-xl focus:ring-2 focus:ring-lime-500 outline-none transition-all font-medium resize-none h-24"
                  placeholder="Short description of the brand..."
                />
              </div>

              <div>
                 <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">Brand Logo</label>
                 <div className="border-2 border-dashed border-neutral-200 dark:border-neutral-600 rounded-2xl p-6 text-center hover:border-lime-500 hover:bg-lime-50/30 dark:hover:bg-lime-900/10 transition-all cursor-pointer bg-neutral-50 dark:bg-neutral-700/30">
                   <UploadCloud className="mx-auto text-neutral-400 mb-3" size={24} />
                   <p className="text-sm font-bold text-neutral-500 dark:text-neutral-400">Click to upload or drag logo</p>
                 </div>
                 <input
                    type="text"
                    value={formData.logoUrl}
                    onChange={e => setFormData({...formData, logoUrl: e.target.value})}
                    placeholder="Or enter image URL"
                    className="w-full mt-3 px-3 py-2 text-xs border border-neutral-200 dark:border-neutral-600 rounded-lg dark:bg-neutral-700 dark:text-neutral-300 outline-none focus:ring-1 focus:ring-lime-500"
                 />
              </div>

              <div>
                <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={e => setFormData({...formData, status: e.target.value as 'Active' | 'Inactive'})}
                  className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white rounded-xl focus:ring-2 focus:ring-lime-500 bg-white dark:bg-neutral-700 outline-none transition-all font-medium cursor-pointer"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="pt-4 flex gap-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-3 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-xl font-bold transition-colors">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-3 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 text-white rounded-xl font-bold transition-all shadow-lg shadow-neutral-900/10 dark:shadow-none">
                  {editingBrand ? 'Save Changes' : 'Create Brand'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Brands;
