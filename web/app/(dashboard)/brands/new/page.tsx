import { X } from 'lucide-react'
import React from 'react'

function page() {
  return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/60 p-4 backdrop-blur-sm transition-opacity">
          <div className="w-full max-w-lg rounded-3xl border border-neutral-200 bg-white shadow-2xl dark:border-neutral-700 dark:bg-neutral-800">
            <div className="flex items-center justify-between border-b border-neutral-100 p-8 dark:border-neutral-700">
              <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                {editingBrand ? "Edit Brand" : "Add Brand"}
              </h2>
              <button
                // onClick={() => setIsModalOpen(false)}
                className="rounded-full p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-700 dark:hover:text-neutral-200"
              >
                <X size={20} />
              </button>
            </div>

           
          </div>
        </div>
 
}

export default page