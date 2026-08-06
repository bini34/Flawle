'use client';

import React, { useState } from 'react';
import { Plus, Filter, Edit3, Trash2, Sparkles, UploadCloud, X, ChevronLeft, ChevronRight, CheckSquare, Trash } from 'lucide-react';
import { MOCK_PRODUCTS } from '@/constants';
import { Product, ProductStatus } from '@/types';
import { useToast } from '@/components/Providers';

const Products = () => {
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  
  // Selection & Bulk Actions State
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkStockValue, setBulkStockValue] = useState('');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // --- Modal/Form Logic ---
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    category: 'Electronics',
    price: 0,
    stock: 0,
    status: ProductStatus.ACTIVE,
    sku: '',
  });

  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      id: `#${Math.floor(Math.random() * 1000000)}`,
      name: formData.name || 'New Product',
      sku: formData.sku || 'SKU-NEW',
      category: formData.category || 'Uncategorized',
      price: Number(formData.price) || 0,
      stock: Number(formData.stock) || 0,
      status: formData.status as ProductStatus,
      imageUrl: 'https://picsum.photos/200/200?random=' + Math.random(),
      sales: 0
    };
    setProducts([newProduct, ...products]);
    setIsModalOpen(false);
    showToast("Product created successfully", "success");
    // Reset form
    setFormData({ name: '', category: 'Electronics', price: 0, stock: 0, status: ProductStatus.ACTIVE, sku: '' });
    setDescription('');
  };

  const generateDescription = () => {
    if(!formData.name) {
      showToast("Please enter a product name first", "error");
      return;
    }
    setIsGenerating(true);
    setTimeout(() => {
       setIsGenerating(false);
       setDescription(`Introducing the ${formData.name}, a premium addition to our ${formData.category} collection. Designed for those who appreciate quality and style, this product features state-of-the-art materials and a sleek ergonomic design. Perfect for everyday use.`);
       showToast("Description generated with AI", "success");
    }, 1500);
  };

  const handleDelete = (id: string) => {
    if(window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
      setSelectedIds(prev => {
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
      currentProducts.forEach(p => newSet.add(p.id));
      setSelectedIds(newSet);
    } else {
      // Deselect all visible products
      const newSet = new Set(selectedIds);
      currentProducts.forEach(p => newSet.delete(p.id));
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
    setProducts(prev => prev.map(p => 
      selectedIds.has(p.id) ? { ...p, status } : p
    ));
    showToast(`Updated status for ${selectedIds.size} products`, "success");
    setSelectedIds(new Set());
  };

  const handleBulkStockUpdate = () => {
    const stock = parseInt(bulkStockValue);
    if (isNaN(stock) || stock < 0) {
      showToast("Please enter a valid stock quantity", "error");
      return;
    }
    setProducts(prev => prev.map(p => 
      selectedIds.has(p.id) ? { ...p, stock } : p
    ));
    showToast(`Updated stock for ${selectedIds.size} products`, "success");
    setBulkStockValue('');
    setSelectedIds(new Set());
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedIds.size} products?`)) {
      setProducts(prev => prev.filter(p => !selectedIds.has(p.id)));
      showToast(`Deleted ${selectedIds.size} products`, "success");
      setSelectedIds(new Set());
    }
  };

  // Filter Logic
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const isAllSelected = currentProducts.length > 0 && currentProducts.every(p => selectedIds.has(p.id));

  return (
    <div className="space-y-8 relative pb-20">
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">Products</h1>
          <p className="text-neutral-500 dark:text-neutral-400 mt-2 font-medium">Manage your product catalog and inventory.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-neutral-900/10 dark:shadow-none"
          >
            <Plus size={18} />
            Add Product
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white dark:bg-neutral-800 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center transition-all">
        <div className="relative w-full md:w-96">
          <input 
            type="text" 
            placeholder="Search by name, SKU..." 
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="w-full pl-5 pr-5 py-2.5 bg-neutral-50 dark:bg-neutral-700 border border-transparent focus:border-lime-500 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-lime-500/10 dark:text-neutral-200 placeholder-neutral-400 font-medium"
          />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <select 
            value={selectedCategory}
            onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
            className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 text-sm font-medium rounded-xl px-4 py-2.5 focus:outline-none cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-700"
          >
             <option>All Categories</option>
             <option>Electronics</option>
             <option>Fashion</option>
             <option>Home</option>
             <option>Beauty</option>
          </select>
          <button className="px-4 py-2.5 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm font-bold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 flex items-center gap-2 transition-colors">
            <Filter size={16} />
            Filters
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-neutral-800 rounded-3xl border border-neutral-100 dark:border-neutral-700 shadow-sm overflow-hidden transition-all">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-neutral-500 dark:text-neutral-400">
            <thead className="bg-neutral-50 dark:bg-neutral-800/50 text-xs uppercase text-neutral-400 font-bold tracking-wider">
              <tr>
                <th className="px-6 py-5 w-10">
                  <div className="flex items-center justify-center">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-neutral-300 dark:border-neutral-600 text-lime-600 focus:ring-lime-500 dark:bg-neutral-700 cursor-pointer accent-lime-600"
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
                  <tr key={product.id} className={`hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors group ${selectedIds.has(product.id) ? 'bg-lime-50/50 dark:bg-lime-900/10' : ''}`}>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-center">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 rounded border-neutral-300 dark:border-neutral-600 text-lime-600 focus:ring-lime-500 dark:bg-neutral-700 cursor-pointer accent-lime-600"
                          checked={selectedIds.has(product.id)}
                          onChange={() => handleSelectOne(product.id)}
                        />
                      </div>
                    </td>
                    <td className="px-4 py-5">
                      <div className="flex items-center gap-4">
                        <img src={product.imageUrl} alt="" className="w-12 h-12 rounded-xl object-cover border border-neutral-100 dark:border-neutral-700 shadow-sm" />
                        <div>
                          <p className="text-neutral-900 dark:text-white font-bold">{product.name}</p>
                          <p className="text-xs text-neutral-400 font-medium">{product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-neutral-600 dark:text-neutral-300 font-medium">{product.category}</td>
                    <td className="px-8 py-5 text-neutral-400 font-mono text-xs">{product.sku}</td>
                    <td className="px-8 py-5 font-bold text-neutral-900 dark:text-white">${product.price.toFixed(2)}</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-lime-500' : product.stock > 0 ? 'bg-orange-500' : 'bg-red-500'}`}></div>
                        <span className="font-medium dark:text-neutral-300">{product.stock}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                       <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold
                        ${product.status === 'Active' ? 'bg-lime-100 text-lime-700 dark:bg-lime-900/40 dark:text-lime-400' : 
                          product.status === 'Draft' ? 'bg-neutral-100 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300' :
                          'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400'}`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg text-neutral-500 dark:text-neutral-400 transition-colors"><Edit3 size={18} /></button>
                        <button onClick={() => handleDelete(product.id)} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 rounded-lg text-neutral-500 dark:text-neutral-400 transition-colors"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-8 py-12 text-center text-neutral-500 dark:text-neutral-400 font-medium">
                    No products found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-8 py-5 border-t border-neutral-100 dark:border-neutral-700 flex items-center justify-between">
           <button 
             disabled={currentPage === 1}
             onClick={() => setCurrentPage(prev => prev - 1)}
             className="flex items-center gap-1 text-sm font-bold text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-all"
           >
             <ChevronLeft size={16} /> Previous
           </button>
           <div className="flex gap-1 text-sm font-medium text-neutral-600 dark:text-neutral-400">
              Page {currentPage} of {totalPages || 1}
           </div>
           <button 
             disabled={currentPage === totalPages || totalPages === 0}
             onClick={() => setCurrentPage(prev => prev + 1)}
             className="flex items-center gap-1 text-sm font-bold text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-all"
           >
             Next <ChevronRight size={16} />
           </button>
        </div>
      </div>

      {/* Floating Bulk Action Bar */}
      {selectedIds.size > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-2 py-2 rounded-2xl shadow-2xl flex items-center gap-4 animate-slideUp border border-neutral-800 dark:border-neutral-200">
          <div className="pl-4 pr-2 font-bold text-sm whitespace-nowrap">
            {selectedIds.size} Selected
          </div>
          
          <div className="h-6 w-px bg-neutral-700 dark:bg-neutral-300"></div>
          
          <div className="flex items-center gap-2">
            <select 
              className="bg-neutral-800 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-bold py-2 pl-3 pr-8 rounded-xl border border-neutral-700 dark:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-lime-500 cursor-pointer"
              onChange={(e) => handleBulkStatusUpdate(e.target.value as ProductStatus)}
              value=""
            >
              <option value="" disabled>Set Status</option>
              <option value={ProductStatus.ACTIVE}>Active</option>
              <option value={ProductStatus.DRAFT}>Draft</option>
              <option value={ProductStatus.ARCHIVED}>Archived</option>
            </select>
            
            <div className="flex items-center gap-1 bg-neutral-800 dark:bg-neutral-100 rounded-xl border border-neutral-700 dark:border-neutral-300 p-1">
              <input 
                type="number" 
                placeholder="Stock" 
                value={bulkStockValue}
                onChange={(e) => setBulkStockValue(e.target.value)}
                className="w-16 bg-transparent text-white dark:text-neutral-900 text-xs font-bold px-2 focus:outline-none placeholder-neutral-500"
              />
              <button 
                onClick={handleBulkStockUpdate}
                disabled={!bulkStockValue}
                className="bg-lime-500 text-white p-1.5 rounded-lg hover:bg-lime-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Update Stock"
              >
                <CheckSquare size={14} />
              </button>
            </div>

            <button 
              onClick={handleBulkDelete}
              className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 dark:text-red-600 rounded-xl transition-colors"
              title="Delete Selected"
            >
              <Trash size={18} />
            </button>

            <button 
              onClick={() => setSelectedIds(new Set())}
              className="p-2 text-neutral-400 hover:text-white dark:hover:text-neutral-900 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-neutral-200 dark:border-neutral-700">
            <div className="flex justify-between items-center p-8 border-b border-neutral-100 dark:border-neutral-700 sticky top-0 bg-white dark:bg-neutral-800 z-10">
              <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-white tracking-tight">Add New Product</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-all">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">Product Title</label>
                  <input required name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white rounded-xl focus:ring-2 focus:ring-lime-500 focus:border-lime-500 outline-none transition-all font-medium" placeholder="e.g. Wireless Headphones" />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">SKU</label>
                  <input name="sku" value={formData.sku} onChange={handleInputChange} className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white rounded-xl outline-none focus:ring-2 focus:ring-lime-500 transition-all font-medium" placeholder="SKU-1234" />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">Category</label>
                  <select name="category" value={formData.category} onChange={handleInputChange} className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white rounded-xl bg-white dark:bg-neutral-700 outline-none focus:ring-2 focus:ring-lime-500 transition-all font-medium">
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Home">Home</option>
                    <option value="Beauty">Beauty</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">Price ($)</label>
                  <input type="number" name="price" value={formData.price} onChange={handleInputChange} className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white rounded-xl outline-none focus:ring-2 focus:ring-lime-500 transition-all font-medium" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">Stock Quantity</label>
                  <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white rounded-xl outline-none focus:ring-2 focus:ring-lime-500 transition-all font-medium" />
                </div>
                
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">Description</label>
                  <div className="border border-neutral-200 dark:border-neutral-600 rounded-xl p-3 dark:bg-neutral-700 focus-within:ring-2 focus-within:ring-lime-500 transition-all">
                    <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-600 pb-2 mb-2">
                       <button type="button" className="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-600 rounded-lg text-xs font-bold dark:text-neutral-300">B</button>
                       <button type="button" className="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-600 rounded-lg text-xs italic dark:text-neutral-300">I</button>
                       <div className="h-4 w-px bg-neutral-200 dark:bg-neutral-500 mx-1"></div>
                       <button 
                         type="button" 
                         onClick={generateDescription} 
                         disabled={isGenerating}
                         className="flex items-center gap-1.5 text-xs text-lime-600 dark:text-lime-400 font-bold hover:bg-lime-50 dark:hover:bg-lime-900/30 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                       >
                         <Sparkles size={14} />
                         {isGenerating ? "Generating..." : "AI Generate"}
                       </button>
                    </div>
                    <textarea 
                      className="w-full h-24 focus:outline-none resize-none text-sm p-1 bg-transparent dark:text-white font-medium" 
                      placeholder="Type product description..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                
                <div className="col-span-2">
                   <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">Product Images</label>
                   <div className="border-2 border-dashed border-neutral-200 dark:border-neutral-600 rounded-2xl p-8 text-center hover:border-lime-500 hover:bg-lime-50/30 dark:hover:bg-lime-900/10 transition-all cursor-pointer bg-neutral-50 dark:bg-neutral-700/30">
                     <div className="w-12 h-12 bg-white dark:bg-neutral-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                        <UploadCloud className="text-lime-500" size={24} />
                     </div>
                     <p className="text-sm font-bold text-neutral-600 dark:text-neutral-300">Click to upload or drag and drop</p>
                     <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1 font-medium">SVG, PNG, JPG or GIF (max. 3MB)</p>
                   </div>
                </div>
              </div>

              <div className="pt-6 flex justify-end gap-4 border-t border-neutral-100 dark:border-neutral-700">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-xl font-bold transition-colors">Cancel</button>
                <button type="submit" className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 text-white rounded-xl font-bold transition-all shadow-lg shadow-neutral-900/10 dark:shadow-none">Create Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;