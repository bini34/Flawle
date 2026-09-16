"use client";

import React, { useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  Folder,
  Plus,
  Edit,
  Trash,
  X,
  UploadCloud,
} from "lucide-react";
import { Category } from "@/types";
import { MOCK_CATEGORIES } from "@/constants";
import { useToast } from "@/components/Providers";

const CategoryItem: React.FC<{
  category: Category;
  level: number;
  onEdit: (cat: Category) => void;
  onAddSub: (parentId: string) => void;
  onDelete: (id: string) => void;
}> = ({ category, level, onEdit, onAddSub, onDelete }) => {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = category.children && category.children.length > 0;

  return (
    <div className="select-none">
      <div
        className="group mb-1 flex cursor-pointer items-center justify-between rounded-xl px-4 py-3 transition-colors hover:bg-lime-50 dark:hover:bg-lime-900/10"
        style={{ paddingLeft: `${level * 24 + 16}px` }}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("button")) return;
          setIsOpen(!isOpen);
        }}
      >
        <div className="flex items-center gap-3">
          {hasChildren ? (
            <div className="text-neutral-400 transition-colors hover:text-neutral-600 dark:hover:text-neutral-200">
              {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </div>
          ) : (
            <div className="w-[18px]" />
          )}
          <div className="rounded-lg bg-lime-100/50 p-1.5 text-lime-600 dark:bg-lime-900/20 dark:text-lime-400">
            <Folder size={18} />
          </div>
          <span className="text-sm font-bold text-neutral-700 dark:text-neutral-200">
            {category.name}
          </span>
          <span className="rounded-full border border-neutral-200 bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-400 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-500">
            {category.productsCount} items
          </span>
        </div>

        <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          {level === 0 && (
            <button
              onClick={() => onAddSub(category.id)}
              className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-lime-100 hover:text-lime-600 dark:hover:bg-lime-900/30 dark:hover:text-lime-400"
              title="Add Subcategory"
            >
              <Plus size={16} />
            </button>
          )}
          <button
            onClick={() => onEdit(category)}
            className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400"
            title="Edit Category"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(category.id)}
            className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400"
            title="Delete Category"
          >
            <Trash size={16} />
          </button>
        </div>
      </div>

      {isOpen && hasChildren && (
        <div className="relative">
          <div
            className="absolute top-0 bottom-0 left-[24px] w-px bg-neutral-200 dark:bg-neutral-700"
            style={{ left: `${level * 24 + 24}px` }}
          ></div>
          {category.children!.map((child) => (
            <CategoryItem
              key={child.id}
              category={child}
              level={level + 1}
              onEdit={onEdit}
              onAddSub={onAddSub}
              onDelete={onDelete}
            />
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
  const [formData, setFormData] = useState({ name: "" });

  const addNode = (
    nodes: Category[],
    pid: string,
    newNode: Category
  ): Category[] => {
    return nodes.map((node) => {
      if (node.id === pid)
        return { ...node, children: [...(node.children || []), newNode] };
      if (node.children)
        return { ...node, children: addNode(node.children, pid, newNode) };
      return node;
    });
  };

  const updateNode = (
    nodes: Category[],
    id: string,
    newName: string
  ): Category[] => {
    return nodes.map((node) => {
      if (node.id === id) return { ...node, name: newName };
      if (node.children)
        return { ...node, children: updateNode(node.children, id, newName) };
      return node;
    });
  };

  const deleteNode = (nodes: Category[], id: string): Category[] => {
    return nodes
      .filter((node) => node.id !== id)
      .map((node) => {
        if (node.children)
          return { ...node, children: deleteNode(node.children, id) };
        return node;
      });
  };

  const handleOpenAdd = (pid: string | null = null) => {
    setEditingCategory(null);
    setParentId(pid);
    setFormData({ name: "" });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (category: Category) => {
    setEditingCategory(category);
    setParentId(category.parentId || null);
    setFormData({ name: category.name });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (
      window.confirm(
        "Are you sure? This will delete all subcategories as well."
      )
    ) {
      setCategories((prev) => deleteNode(prev, id));
      showToast("Category deleted", "success");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCategory) {
      setCategories((prev) =>
        updateNode(prev, editingCategory.id, formData.name)
      );
      showToast("Category updated", "success");
    } else {
      const newCategory: Category = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name,
        productsCount: 0,
        children: [],
        parentId: parentId,
      };
      if (parentId) {
        setCategories((prev) => addNode(prev, parentId, newCategory));
      } else {
        setCategories((prev) => [...prev, newCategory]);
      }
      showToast("Category created", "success");
    }
    setIsModalOpen(false);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Categories
          </h1>
          <p className="mt-2 font-medium text-neutral-500 dark:text-neutral-400">
            Organize your products into root categories and subcategories.
          </p>
        </div>
        <button
          onClick={() => handleOpenAdd(null)}
          className="flex items-center gap-2 rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-neutral-900/10 transition-all hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:shadow-none dark:hover:bg-neutral-200"
        >
          <Plus size={18} />
          Add Root Category
        </button>
      </div>

      <div className="min-h-[500px] rounded-3xl border border-neutral-100 bg-white p-8 shadow-sm transition-all dark:border-neutral-700 dark:bg-neutral-800">
        <div className="mb-6 flex items-center border-b border-neutral-100 pb-4 text-xs font-extrabold tracking-widest text-neutral-400 uppercase dark:border-neutral-700">
          <span className="flex-1 pl-14">Category Hierarchy</span>
          <span className="pr-6">Actions</span>
        </div>
        <div className="space-y-2">
          {categories.map((cat) => (
            <CategoryItem
              key={cat.id}
              category={cat}
              level={0}
              onEdit={handleOpenEdit}
              onAddSub={handleOpenAdd}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/60 p-4 backdrop-blur-sm transition-opacity">
          <div className="w-full max-w-md rounded-3xl border border-neutral-200 bg-white shadow-2xl dark:border-neutral-700 dark:bg-neutral-800">
            <div className="flex items-center justify-between border-b border-neutral-100 p-8 dark:border-neutral-700">
              <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                {editingCategory ? "Edit Category" : "Add Category"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-full p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-700 dark:hover:text-neutral-200"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 p-8">
              {parentId && (
                <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm font-medium text-blue-700 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                  Adding subcategory
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-bold text-neutral-700 dark:text-neutral-300">
                  Category Name
                </label>
                <input
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full rounded-xl border border-neutral-200 px-4 py-3 font-medium transition-all outline-none focus:ring-2 focus:ring-lime-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                  placeholder="e.g. Summer Collection"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-neutral-700 dark:text-neutral-300">
                  Category Icon / Image
                </label>
                <div className="cursor-pointer rounded-2xl border-2 border-dashed border-neutral-200 bg-neutral-50 p-8 text-center transition-all hover:border-lime-500 hover:bg-lime-50/30 dark:border-neutral-600 dark:bg-neutral-700/30 dark:hover:bg-lime-900/10">
                  <UploadCloud
                    className="mx-auto mb-3 text-neutral-400"
                    size={24}
                  />
                  <p className="text-sm font-bold text-neutral-500 dark:text-neutral-400">
                    Click to upload image
                  </p>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
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
                  {editingCategory ? "Save Changes" : "Create Category"}
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
