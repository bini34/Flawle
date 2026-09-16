"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Plus,
  Filter,
  Edit3,
  Trash2,
  Sparkles,
  UploadCloud,
  X,
  ChevronLeft,
  ChevronRight,
  CheckSquare,
  Trash,
} from "lucide-react";
import { MOCK_PRODUCTS } from "@/constants";
import { Product, ProductStatus } from "@/types";
import { useToast } from "@/components/Providers";

const Products = () => {
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  // Selection & Bulk Actions State
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkStockValue, setBulkStockValue] = useState("");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // --- Modal/Form Logic ---
  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    category: "Electronics",
    price: 0,
    stock: 0,
    status: ProductStatus.ACTIVE,
    sku: "",
  });

  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      id: `#${Math.floor(Math.random() * 1000000)}`,
      name: formData.name || "New Product",
      sku: formData.sku || "SKU-NEW",
      category: formData.category || "Uncategorized",
      price: Number(formData.price) || 0,
      stock: Number(formData.stock) || 0,
      status: formData.status as ProductStatus,
      imageUrl: "https://picsum.photos/200/200?random=" + Math.random(),
      sales: 0,
    };
    setProducts([newProduct, ...products]);
    setIsModalOpen(false);
    showToast("Product created successfully", "success");
    // Reset form
    setFormData({
      name: "",
      category: "Electronics",
      price: 0,
      stock: 0,
      status: ProductStatus.ACTIVE,
      sku: "",
    });
    setDescription("");
  };

  const generateDescription = () => {
    if (!formData.name) {
      showToast("Please enter a product name first", "error");
      return;
    }
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setDescription(
        `Introducing the ${formData.name}, a premium addition to our ${formData.category} collection. Designed for those who appreciate quality and style, this product features state-of-the-art materials and a sleek ergonomic design. Perfect for everyday use.`
      );
      showToast("Description generated with AI", "success");
    }, 1500);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
      setSelectedIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
      showToast("Product deleted", "success");
    }
  };

  // --- Bulk Action Handlers ---

  const handleSelectAll = (isChecked: boolean) => {
    if (isChecked) {
      // Select all visible products
      const newSet = new Set(selectedIds);
      currentProducts.forEach((p) => newSet.add(p.id));
      setSelectedIds(newSet);
    } else {
      // Deselect all visible products
      const newSet = new Set(selectedIds);
      currentProducts.forEach((p) => newSet.delete(p.id));
      setSelectedIds(newSet);
    }
  };

  const handleSelectOne = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedIds(newSet);
  };

  const handleBulkStatusUpdate = (status: ProductStatus) => {
    setProducts((prev) =>
      prev.map((p) => (selectedIds.has(p.id) ? { ...p, status } : p))
    );
    showToast(`Updated status for ${selectedIds.size} products`, "success");
    setSelectedIds(new Set());
  };

  const handleBulkStockUpdate = () => {
    const stock = parseInt(bulkStockValue);
    if (isNaN(stock) || stock < 0) {
      showToast("Please enter a valid stock quantity", "error");
      return;
    }
    setProducts((prev) =>
      prev.map((p) => (selectedIds.has(p.id) ? { ...p, stock } : p))
    );
    showToast(`Updated stock for ${selectedIds.size} products`, "success");
    setBulkStockValue("");
    setSelectedIds(new Set());
  };

  const handleBulkDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${selectedIds.size} products?`
      )
    ) {
      setProducts((prev) => prev.filter((p) => !selectedIds.has(p.id)));
      showToast(`Deleted ${selectedIds.size} products`, "success");
      setSelectedIds(new Set());
    }
  };

  // Filter Logic
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Categories" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const isAllSelected =
    currentProducts.length > 0 &&
    currentProducts.every((p) => selectedIds.has(p.id));

  return (
    <div className="relative space-y-8 pb-20">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Products
          </h1>
          <p className="mt-2 font-medium text-neutral-500 dark:text-neutral-400">
            Manage your product catalog and inventory.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-neutral-900/10 transition-all hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:shadow-none dark:hover:bg-neutral-200"
          >
            <Plus size={18} />
            Add Product
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition-all md:flex-row dark:border-neutral-700 dark:bg-neutral-800">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search by name, SKU..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full rounded-xl border border-transparent bg-neutral-50 py-2.5 pr-5 pl-5 text-sm font-medium placeholder-neutral-400 focus:border-lime-500 focus:ring-4 focus:ring-lime-500/10 focus:outline-none dark:bg-neutral-700 dark:text-neutral-200"
          />
        </div>
        <div className="flex w-full gap-3 md:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="cursor-pointer rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
          >
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Fashion</option>
            <option>Home</option>
            <option>Beauty</option>
          </select>
          <button className="flex items-center gap-2 rounded-xl border border-neutral-200 px-4 py-2.5 text-sm font-bold text-neutral-600 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700">
            <Filter size={16} />
            Filters
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="overflow-hidden rounded-3xl border border-neutral-100 bg-white shadow-sm transition-all dark:border-neutral-700 dark:bg-neutral-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-neutral-500 dark:text-neutral-400">
            <thead className="bg-neutral-50 text-xs font-bold tracking-wider text-neutral-400 uppercase dark:bg-neutral-800/50">
              <tr>
                <th className="w-10 px-6 py-5">
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 cursor-pointer rounded border-neutral-300 text-lime-600 accent-lime-600 focus:ring-lime-500 dark:border-neutral-600 dark:bg-neutral-700"
                      checked={isAllSelected}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                  </div>
                </th>
                <th className="px-4 py-5">Product Name</th>
                <th className="px-8 py-5">Category</th>
                <th className="px-8 py-5">SKU</th>
                <th className="px-8 py-5">Price</th>
                <th className="px-8 py-5">Stock</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-700">
              {currentProducts.length > 0 ? (
                currentProducts.map((product) => (
                  <tr
                    key={product.id}
                    className={`group transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-700/50 ${selectedIds.has(product.id) ? "bg-lime-50/50 dark:bg-lime-900/10" : ""}`}
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 cursor-pointer rounded border-neutral-300 text-lime-600 accent-lime-600 focus:ring-lime-500 dark:border-neutral-600 dark:bg-neutral-700"
                          checked={selectedIds.has(product.id)}
                          onChange={() => handleSelectOne(product.id)}
                        />
                      </div>
                    </td>
                    <td className="px-4 py-5">
                      <div className="flex items-center gap-4">
                        <Image
                          src={product.imageUrl}
                          alt=""
                          width={48}
                          height={48}
                          className="h-12 w-12 rounded-xl border border-neutral-100 object-cover shadow-sm dark:border-neutral-700"
                        />
                        <div>
                          <p className="font-bold text-neutral-900 dark:text-white">
                            {product.name}
                          </p>
                          <p className="text-xs font-medium text-neutral-400">
                            {product.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 font-medium text-neutral-600 dark:text-neutral-300">
                      {product.category}
                    </td>
                    <td className="px-8 py-5 font-mono text-xs text-neutral-400">
                      {product.sku}
                    </td>
                    <td className="px-8 py-5 font-bold text-neutral-900 dark:text-white">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-2 w-2 rounded-full ${product.stock > 10 ? "bg-lime-500" : product.stock > 0 ? "bg-orange-500" : "bg-red-500"}`}
                        ></div>
                        <span className="font-medium dark:text-neutral-300">
                          {product.stock}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span
                        className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-bold ${
                          product.status === "Active"
                            ? "bg-lime-100 text-lime-700 dark:bg-lime-900/40 dark:text-lime-400"
                            : product.status === "Draft"
                              ? "bg-neutral-100 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300"
                              : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                        <button className="rounded-lg p-2 text-neutral-500 transition-colors hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-700">
                          <Edit3 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="rounded-lg p-2 text-neutral-500 transition-colors hover:bg-red-50 hover:text-red-600 dark:text-neutral-400 dark:hover:bg-red-900/30 dark:hover:text-red-400"
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
                    colSpan={8}
                    className="px-8 py-12 text-center font-medium text-neutral-500 dark:text-neutral-400"
                  >
                    No products found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-neutral-100 px-8 py-5 dark:border-neutral-700">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="flex items-center gap-1 rounded-xl border border-neutral-200 px-4 py-2 text-sm font-bold text-neutral-500 transition-all hover:bg-neutral-50 hover:text-neutral-900 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-white"
          >
            <ChevronLeft size={16} /> Previous
          </button>
          <div className="flex gap-1 text-sm font-medium text-neutral-600 dark:text-neutral-400">
            Page {currentPage} of {totalPages || 1}
          </div>
          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="flex items-center gap-1 rounded-xl border border-neutral-200 px-4 py-2 text-sm font-bold text-neutral-500 transition-all hover:bg-neutral-50 hover:text-neutral-900 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-white"
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Floating Bulk Action Bar */}
      {selectedIds.size > 0 && (
        <div className="animate-slideUp fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-4 rounded-2xl border border-neutral-800 bg-neutral-900 px-2 py-2 text-white shadow-2xl dark:border-neutral-200 dark:bg-white dark:text-neutral-900">
          <div className="pr-2 pl-4 text-sm font-bold whitespace-nowrap">
            {selectedIds.size} Selected
          </div>

          <div className="h-6 w-px bg-neutral-700 dark:bg-neutral-300"></div>

          <div className="flex items-center gap-2">
            <select
              className="cursor-pointer rounded-xl border border-neutral-700 bg-neutral-800 py-2 pr-8 pl-3 text-xs font-bold text-white focus:ring-2 focus:ring-lime-500 focus:outline-none dark:border-neutral-300 dark:bg-neutral-100 dark:text-neutral-900"
              onChange={(e) =>
                handleBulkStatusUpdate(e.target.value as ProductStatus)
              }
              value=""
            >
              <option value="" disabled>
                Set Status
              </option>
              <option value={ProductStatus.ACTIVE}>Active</option>
              <option value={ProductStatus.DRAFT}>Draft</option>
              <option value={ProductStatus.ARCHIVED}>Archived</option>
            </select>

            <div className="flex items-center gap-1 rounded-xl border border-neutral-700 bg-neutral-800 p-1 dark:border-neutral-300 dark:bg-neutral-100">
              <input
                type="number"
                placeholder="Stock"
                value={bulkStockValue}
                onChange={(e) => setBulkStockValue(e.target.value)}
                className="w-16 bg-transparent px-2 text-xs font-bold text-white placeholder-neutral-500 focus:outline-none dark:text-neutral-900"
              />
              <button
                onClick={handleBulkStockUpdate}
                disabled={!bulkStockValue}
                className="rounded-lg bg-lime-500 p-1.5 text-white transition-colors hover:bg-lime-600 disabled:cursor-not-allowed disabled:opacity-50"
                title="Update Stock"
              >
                <CheckSquare size={14} />
              </button>
            </div>

            <button
              onClick={handleBulkDelete}
              className="rounded-xl bg-red-500/10 p-2 text-red-500 transition-colors hover:bg-red-500/20 dark:text-red-600"
              title="Delete Selected"
            >
              <Trash size={18} />
            </button>

            <button
              onClick={() => setSelectedIds(new Set())}
              className="p-2 text-neutral-400 transition-colors hover:text-white dark:hover:text-neutral-900"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/60 p-4 backdrop-blur-sm transition-opacity">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-neutral-200 bg-white shadow-2xl dark:border-neutral-700 dark:bg-neutral-800">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-neutral-100 bg-white p-8 dark:border-neutral-700 dark:bg-neutral-800">
              <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                Add New Product
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-full p-2 text-neutral-400 transition-all hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-700 dark:hover:text-neutral-200"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="mb-2 block text-sm font-bold text-neutral-700 dark:text-neutral-300">
                    Product Title
                  </label>
                  <input
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-neutral-200 px-4 py-3 font-medium transition-all outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                    placeholder="e.g. Wireless Headphones"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-neutral-700 dark:text-neutral-300">
                    SKU
                  </label>
                  <input
                    name="sku"
                    value={formData.sku}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-neutral-200 px-4 py-3 font-medium transition-all outline-none focus:ring-2 focus:ring-lime-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                    placeholder="SKU-1234"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-neutral-700 dark:text-neutral-300">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 font-medium transition-all outline-none focus:ring-2 focus:ring-lime-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Home">Home</option>
                    <option value="Beauty">Beauty</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-neutral-700 dark:text-neutral-300">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-neutral-200 px-4 py-3 font-medium transition-all outline-none focus:ring-2 focus:ring-lime-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-neutral-700 dark:text-neutral-300">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-neutral-200 px-4 py-3 font-medium transition-all outline-none focus:ring-2 focus:ring-lime-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                  />
                </div>

                <div className="col-span-2">
                  <label className="mb-2 block text-sm font-bold text-neutral-700 dark:text-neutral-300">
                    Description
                  </label>
                  <div className="rounded-xl border border-neutral-200 p-3 transition-all focus-within:ring-2 focus-within:ring-lime-500 dark:border-neutral-600 dark:bg-neutral-700">
                    <div className="mb-2 flex items-center gap-2 border-b border-neutral-200 pb-2 dark:border-neutral-600">
                      <button
                        type="button"
                        className="rounded-lg p-1.5 text-xs font-bold hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-600"
                      >
                        B
                      </button>
                      <button
                        type="button"
                        className="rounded-lg p-1.5 text-xs italic hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-600"
                      >
                        I
                      </button>
                      <div className="mx-1 h-4 w-px bg-neutral-200 dark:bg-neutral-500"></div>
                      <button
                        type="button"
                        onClick={generateDescription}
                        disabled={isGenerating}
                        className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold text-lime-600 transition-colors hover:bg-lime-50 disabled:opacity-50 dark:text-lime-400 dark:hover:bg-lime-900/30"
                      >
                        <Sparkles size={14} />
                        {isGenerating ? "Generating..." : "AI Generate"}
                      </button>
                    </div>
                    <textarea
                      className="h-24 w-full resize-none bg-transparent p-1 text-sm font-medium focus:outline-none dark:text-white"
                      placeholder="Type product description..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="mb-2 block text-sm font-bold text-neutral-700 dark:text-neutral-300">
                    Product Images
                  </label>
                  <div className="cursor-pointer rounded-2xl border-2 border-dashed border-neutral-200 bg-neutral-50 p-8 text-center transition-all hover:border-lime-500 hover:bg-lime-50/30 dark:border-neutral-600 dark:bg-neutral-700/30 dark:hover:bg-lime-900/10">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm dark:bg-neutral-600">
                      <UploadCloud className="text-lime-500" size={24} />
                    </div>
                    <p className="text-sm font-bold text-neutral-600 dark:text-neutral-300">
                      Click to upload or drag and drop
                    </p>
                    <p className="mt-1 text-xs font-medium text-neutral-400 dark:text-neutral-500">
                      SVG, PNG, JPG or GIF (max. 3MB)
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 border-t border-neutral-100 pt-6 dark:border-neutral-700">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl px-6 py-3 font-bold text-neutral-600 transition-colors hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-neutral-900 px-6 py-3 font-bold text-white shadow-lg shadow-neutral-900/10 transition-all hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:shadow-none dark:hover:bg-neutral-200"
                >
                  Create Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
