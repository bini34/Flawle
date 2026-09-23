"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MOCK_BRANDS, CURRENT_USER } from "@/constants";
import { Brand, UserRole } from "@/types";
import {
  Search,
  Plus,
  Edit3,
  Trash2,
  X,
  UploadCloud,
  ShieldAlert,
} from "lucide-react";
import { useToast } from "@/components/Providers";

const Brands = () => {
  const { showToast } = useToast();
  const [brands, setBrands] = useState<Brand[]>(MOCK_BRANDS);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);

  const [formData, setFormData] = useState<Partial<Brand>>({
    name: "",
    logoUrl: "",
    description: "",
    status: "Active",
  });

  const isAdmin = CURRENT_USER.role === UserRole.SUPER_ADMIN;

  const handleOpenAdd = () => {
    setEditingBrand(null);
    setFormData({ name: "", logoUrl: "", description: "", status: "Active" });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (brand: Brand) => {
    setEditingBrand(brand);
    setFormData({
      name: brand.name,
      logoUrl: brand.logoUrl,
      description: brand.description,
      status: brand.status,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this brand? This action cannot be undone."
      )
    ) {
      setBrands(brands.filter((b) => b.id !== id));
      showToast("Brand deleted successfully", "success");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalLogo =
      formData.logoUrl ||
      `https://ui-avatars.com/api/?name=${formData.name}&background=random`;

    if (editingBrand) {
      setBrands((prev) =>
        prev.map((b) =>
          b.id === editingBrand.id
            ? ({ ...b, ...formData, logoUrl: finalLogo } as Brand)
            : b
        )
      );
      showToast("Brand updated successfully", "success");
    } else {
      const newBrand: Brand = {
        id: `b${Date.now()}`,
        name: formData.name || "New Brand",
        logoUrl: finalLogo,
        productsCount: 0,
        status: formData.status as "Active" | "Inactive",
        description: formData.description,
      };
      setBrands((prev) => [...prev, newBrand]);
      showToast("Brand created successfully", "success");
    }
    setIsModalOpen(false);
  };

  const filteredBrands = brands.filter((b) =>
    b.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Brand Management
          </h1>
          <p className="mt-2 font-medium text-neutral-500 dark:text-neutral-400">
            Manage your product brands and partners.
          </p>
        </div>
        {isAdmin && (
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-neutral-900/10 transition-all hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:shadow-none dark:hover:bg-neutral-200"
          >
            <Plus size={18} />
            Add Brand
          </button>
        )}
      </div>

      {!isAdmin && (
        <div className="flex items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
          <ShieldAlert className="text-blue-600 dark:text-blue-400" size={20} />
          <span className="text-sm font-bold text-blue-700 dark:text-blue-300">
            Read-Only Access: You can view brands but cannot make changes.
          </span>
        </div>
      )}

      <div className="rounded-3xl border border-neutral-100 bg-white p-5 shadow-sm transition-all dark:border-neutral-700 dark:bg-neutral-800">
        <div className="relative w-full md:w-96">
          <Search
            className="absolute top-1/2 left-4 -translate-y-1/2 text-neutral-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search brands..."
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
                <th className="px-8 py-5">Brand Name</th>
                <th className="px-8 py-5">Products</th>
                <th className="px-8 py-5">Status</th>
                {isAdmin && <th className="px-8 py-5 text-right">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-700">
              {filteredBrands.length > 0 ? (
                filteredBrands.map((brand) => (
                  <tr
                    key={brand.id}
                    className="group transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-700/50"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-neutral-100 bg-white p-2 dark:border-neutral-600 dark:bg-neutral-700">
                          <Image
                            src={brand.logoUrl}
                            alt={brand.name}
                            width={40}
                            height={40}
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-neutral-900 dark:text-white">
                            {brand.name}
                          </p>
                          <p className="max-w-[200px] truncate text-xs font-medium text-neutral-400">
                            {brand.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 font-bold text-neutral-700 dark:text-neutral-300">
                      {brand.productsCount} items
                    </td>
                    <td className="px-8 py-5">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${brand.status === "Active" ? "bg-lime-100 text-lime-700 dark:bg-lime-900/40 dark:text-lime-400" : "bg-neutral-100 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300"}`}
                      >
                        {brand.status}
                      </span>
                    </td>
                    {isAdmin && (
                      <td className="px-8 py-5 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(brand)}
                            className="rounded-lg p-2 text-neutral-500 transition-colors hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-700"
                            title="Edit Brand"
                          >
                            <Edit3 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(brand.id)}
                            className="rounded-lg p-2 text-neutral-500 transition-colors hover:bg-red-50 hover:text-red-600 dark:text-neutral-400 dark:hover:bg-red-900/30 dark:hover:text-red-400"
                            title="Delete Brand"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={isAdmin ? 4 : 3}
                    className="px-8 py-12 text-center font-medium text-neutral-500 dark:text-neutral-400"
                  >
                    No brands found matching &quot;{searchTerm}&quot;
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

     
    </div>
  );
};

export default Brands;
