'use server';
import { authSchema } from './schemas';

export async function authenticateAction(previousState: unknown, formData: FormData) {
    const validation = authSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password')
    });
    if (!validation.success) {
        return {
            success: false,
            errors: validation.error.flatten().fieldErrors
        };
    }
    console.log('Form data is valid:', validation.data);
    return {
        success: true,
        errors: {}
    };
}