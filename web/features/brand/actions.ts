"use server";

import { brandSchema } from "./schemas";


interface BrandActionState {
    success: boolean;
    errors: { name?: string[]; description?: string[]; logoUrl?: string[]; status?: string[] };
    brand: any | null;
}
export async function addBrandAction(prevState: any, formData: FormData): Promise<BrandActionState> {
    const validation = brandSchema.safeParse({
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        logoUrl: formData.get("logoUrl") as string,
        status: formData.get("status") as string,
    });

    if (!validation.success) {
        return {
            ...prevState,
            errors: validation.error.flatten(),
        };
    }

    // Proceed with brand creation logic
}