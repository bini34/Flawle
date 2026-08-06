'use client';

import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Folder, Plus, Edit, Trash, X, UploadCloud } from 'lucide-react';
import { Category } from '@/types';
import { MOCK_CATEGORIES } from '@/constants';
import { useToast } from '@/components/Providers';

const CategoryItem: React.FC<{
  category: Category,
  level: number,
  onEdit: (cat: Category) => void,
  onAddSub: (parentId: string) => void,
  onDelete: (id: string) => void
}> = ({ category, level, onEdit, onAddSub, onDelete }) => {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = category.children && category.children.length > 0;

  return (
    <div className="select-none">
      <div
        className="group flex items-center justify-between py-3 px-4 rounded-xl hover:bg-lime-50 dark:hover:bg-lime-900/10 transition-colors cursor-pointer mb-1"
        style={{ paddingLeft: `${level * 24 + 16}px` }}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest('button')) return;
          setIsOpen(!isOpen);
        }}
      >
        <div className="flex items-center gap-3">
          {hasChildren ? (
            <div className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors">
              {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </div>
          ) : (
            <div className="w-[18px]" />
          )}
          <div className="p-1.5 bg-lime-100/50 dark:bg-lime-900/20 text-lime-600 dark:text-lime-400 rounded-lg">
             <Folder size={18} />
          </div>
          <span className="text-sm font-bold text-neutral-700 dark:text-neutral-200">{category.name}</span>
          <span className="text-xs text-neutral-400 dark:text-neutral-500 px-2.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded-full border border-neutral-200 dark:border-neutral-700 font-medium">{category.productsCount} items</span>
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {level === 0 && (
            <button
              onClick={() => onAddSub(category.id)}
              className="p-2 text-neutral-400 hover:text-lime-600 dark:hover:text-lime-400 hover:bg-lime-100 dark:hover:bg-lime-900/30 rounded-lg transition-colors"
              title="Add Subcategory"
            >
              <Plus size={16} />
            </button>
          )}
          <button onClick={() => onEdit(category)} className="p-2 text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors" title="Edit Category">
            <Edit size={16} />
          </button>
          <button onClick={() => onDelete(category.id)} className="p-2 text-neutral-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors" title="Delete Category">
            <Trash size={16} />
          </button>
        </div>
      </div>

      {isOpen && hasChildren && (
        <div className="relative">
          <div className="absolute left-[24px] top-0 bottom-0 w-px bg-neutral-200 dark:bg-neutral-700" style={{ left: `${level * 24 + 24}px` }}></div>
          {category.children!.map((child) => (
            <CategoryItem key={child.id} category={child} level={level + 1} onEdit={onEdit} onAddSub={onAddSub} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

const Categories = () => {
  const { showToast } = useToast();
  const [categories, setCategories] = useState(MOCK_CATEGORIES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [parentId, setParentId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '' });

  const addNode = (nodes: Category[], pid: string, newNode: Category): Category[] => {
    return nodes.map(node => {
      if (node.id === pid) return { ...node, children: [...(node.children || []), newNode] };
      if (node.children) return { ...node, children: addNode(node.children, pid, newNode) };
      return node;
    });
  };

  const updateNode = (nodes: Category[], id: string, newName: string): Category[] => {
    return nodes.map(node => {
      if (node.id === id) return { ...node, name: newName };
      if (node.children) return { ...node, children: updateNode(node.children, id, newName) };
      return node;
    });
  };

  const deleteNode = (nodes: Category[], id: string): Category[] => {
    return nodes.filter(node => node.id !== id).map(node => {
      if (node.children) return { ...node, children: deleteNode(node.children, id) };
      return node;
    });
  };

  const handleOpenAdd = (pid: string | null = null) => {
    setEditingCategory(null);
    setParentId(pid);
    setFormData({ name: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (category: Category) => {
    setEditingCategory(category);
    setParentId(category.parentId || null);
    setFormData({ name: category.name });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure? This will delete all subcategories as well.')) {
      setCategories(prev => deleteNode(prev, id));
      showToast("Category deleted", "success");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCategory) {
      setCategories(prev => updateNode(prev, editingCategory.id, formData.name));
      showToast("Category updated", "success");
    } else {
      const newCategory: Category = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name,
        productsCount: 0,
        children: [],
        parentId: parentId
      };
      if (parentId) {
        setCategories(prev => addNode(prev, parentId, newCategory));
      } else {
        setCategories(prev => [...prev, newCategory]);
      }
      showToast("Category created", "success");
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">Categories</h1>
          <p className="text-neutral-500 dark:text-neutral-400 mt-2 font-medium">Organize your products into root categories and subcategories.</p>
        </div>
        <button
          onClick={() => handleOpenAdd(null)}
          className="bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-neutral-900/10 dark:shadow-none"
        >
          <Plus size={18} />
          Add Root Category
        </button>
      </div>

      <div className="bg-white dark:bg-neutral-800 rounded-3xl border border-neutral-100 dark:border-neutral-700 shadow-sm p-8 min-h-[500px] transition-all">
        <div className="mb-6 pb-4 border-b border-neutral-100 dark:border-neutral-700 flex items-center text-xs text-neutral-400 uppercase font-extrabold tracking-widest">
           <span className="pl-14 flex-1">Category Hierarchy</span>
           <span className="pr-6">Actions</span>
        </div>
        <div className="space-y-2">
          {categories.map((cat) => (
            <CategoryItem key={cat.id} category={cat} level={0} onEdit={handleOpenEdit} onAddSub={handleOpenAdd} onDelete={handleDelete} />
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl w-full max-w-md border border-neutral-200 dark:border-neutral-700">
            <div className="flex justify-between items-center p-8 border-b border-neutral-100 dark:border-neutral-700">
              <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
                {editingCategory ? 'Edit Category' : 'Add Category'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {parentId && (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-xl text-sm font-medium border border-blue-100 dark:border-blue-800">
                  Adding subcategory
                </div>
              )}

              <div>
                <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">Category Name</label>
                <input
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white rounded-xl focus:ring-2 focus:ring-lime-500 outline-none transition-all font-medium"
                  placeholder="e.g. Summer Collection"
                />
              </div>

              <div>
                 <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">Category Icon / Image</label>
                 <div className="border-2 border-dashed border-neutral-200 dark:border-neutral-600 rounded-2xl p-8 text-center hover:border-lime-500 hover:bg-lime-50/30 dark:hover:bg-lime-900/10 transition-all cursor-pointer bg-neutral-50 dark:bg-neutral-700/30">
                   <UploadCloud className="mx-auto text-neutral-400 mb-3" size={24} />
                   <p className="text-sm font-bold text-neutral-500 dark:text-neutral-400">Click to upload image</p>
                 </div>
              </div>

              <div className="pt-4 flex gap-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-3 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-xl font-bold transition-colors">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-3 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 text-white rounded-xl font-bold transition-all shadow-lg shadow-neutral-900/10 dark:shadow-none">
                  {editingCategory ? 'Save Changes' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
