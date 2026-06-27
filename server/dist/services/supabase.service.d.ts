import { SupabaseClient, User } from '@supabase/supabase-js';
declare let supabase: SupabaseClient | null;
export interface AuthResult {
    success: boolean;
    user?: User;
    session?: any;
    error?: string;
}
/**
 * Sign up with email and password
 */
export declare function signUpWithEmail(email: string, password: string, metadata?: {
    displayName?: string;
}): Promise<AuthResult>;
/**
 * Sign in with email and password
 */
export declare function signInWithEmail(email: string, password: string): Promise<AuthResult>;
/**
 * Verify JWT token from Supabase
 */
export declare function verifyToken(token: string): Promise<AuthResult>;
/**
 * Get OAuth URL for social login
 */
export declare function getOAuthUrl(provider: 'google' | 'facebook' | 'apple' | 'twitter', redirectTo: string): Promise<{
    url: string | null;
    error?: string;
}>;
/**
 * Sign out user
 */
export declare function signOut(token: string): Promise<{
    success: boolean;
    error?: string;
}>;
/**
 * Get user by ID
 */
export declare function getUserById(userId: string): Promise<AuthResult>;
/**
 * Update user metadata
 */
export declare function updateUserMetadata(userId: string, metadata: Record<string, any>): Promise<AuthResult>;
/**
 * Delete user
 */
export declare function deleteUser(userId: string): Promise<{
    success: boolean;
    error?: string;
}>;
export { supabase };
declare const _default: {
    signUpWithEmail: typeof signUpWithEmail;
    signInWithEmail: typeof signInWithEmail;
    verifyToken: typeof verifyToken;
    getOAuthUrl: typeof getOAuthUrl;
    signOut: typeof signOut;
    getUserById: typeof getUserById;
    updateUserMetadata: typeof updateUserMetadata;
    deleteUser: typeof deleteUser;
};
export default _default;
//# sourceMappingURL=supabase.service.d.ts.map