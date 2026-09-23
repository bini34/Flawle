"use client";

import { addBrandAction } from "@/features/brands/actions";
import { Save  } from "lucide-react";
import { useActionState } from "react";


export default function AddBrandsForm() {   
    const [formState, FormAction, pending] = useActionState(addBrandAction, {
        success: false,
        errors: {},
        brand: null,
      });
    return (
         <form action={FormAction} className="space-y-6 p-8">
              <div>
                <label className="mb-2 block text-sm font-bold text-neutral-700 dark:text-neutral-300">
                  Brand Name
                </label>
                <input
                  type="text"
                  name="name"  
                  placeholder="Enter brand name"               
                  className="w-full rounded-xl border border-neutral-200 px-4 py-3 font-medium transition-all outline-none focus:ring-2 focus:ring-lime-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                />

                 {formState.errors.name && (
                    <p className="mt-2 text-sm text-red-500">
                        {formState.errors.name[0]}
                    </p>
                    )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-neutral-700 dark:text-neutral-300">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Short description of the brand..."
                  className="h-24 w-full resize-none rounded-xl border border-neutral-200 px-4 py-3 font-medium transition-all outline-none focus:ring-2 focus:ring-lime-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                />
                 {formState.errors.description && (
                    <p className="mt-2 text-sm text-red-500">
                        {formState.errors.description[0]}
                    </p>
                    )}
              </div>
                


              <div>
                <label className="mb-2 block text-sm font-bold text-neutral-700 dark:text-neutral-300">
                  Brand Logo
                </label>
             
                <input
                  type="text"
                  name="logoUrl"
                  placeholder=" enter image URL"
                  className="mt-3 w-full rounded-lg border border-neutral-200 px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-lime-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-300"
                />
                    {formState.errors.logoUrl && (
                    <p className="mt-2 text-sm text-red-500">
                        {formState.errors.logoUrl[0]}
                    </p>
                    )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-neutral-700 dark:text-neutral-300">
                  Status
                </label>
                <select
                  name="status"
                  defaultValue="Active"                  
                  className="w-full cursor-pointer rounded-xl border border-neutral-200 bg-white px-4 py-3 font-medium transition-all outline-none focus:ring-2 focus:ring-lime-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  className="flex-1 rounded-xl px-4 py-3 font-bold text-neutral-600 transition-colors hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={pending}
                  className="flex-1 rounded-xl bg-neutral-900 px-4 py-3 font-bold text-white shadow-lg shadow-neutral-900/10 transition-all hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:shadow-none dark:hover:bg-neutral-200"
                >
                      {pending ? (
          <span className="loading loading-spinner">loading</span>
        ) : (
         "Save Changes"
        )}
                </button>
              </div>
            </form>
    )};