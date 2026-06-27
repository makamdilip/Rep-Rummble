"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
exports.signUpWithEmail = signUpWithEmail;
exports.signInWithEmail = signInWithEmail;
exports.verifyToken = verifyToken;
exports.getOAuthUrl = getOAuthUrl;
exports.signOut = signOut;
exports.getUserById = getUserById;
exports.updateUserMetadata = updateUserMetadata;
exports.deleteUser = deleteUser;
const supabase_js_1 = require("@supabase/supabase-js");
// Initialize Supabase client
let supabase = null;
exports.supabase = supabase;
if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY) {
    exports.supabase = supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    });
    console.log('✅ Supabase initialized');
}
else {
    console.warn('⚠️  WARNING: Supabase credentials not set. Auth features will be limited.');
}
/**
 * Sign up with email and password
 */
async function signUpWithEmail(email, password, metadata) {
    if (!supabase) {
        return { success: false, error: 'Supabase not configured' };
    }
    try {
        const { data, error } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: metadata
        });
        if (error) {
            return { success: false, error: error.message };
        }
        return { success: true, user: data.user };
    }
    catch (error) {
        return { success: false, error: error.message };
    }
}
/**
 * Sign in with email and password
 */
async function signInWithEmail(email, password) {
    if (!supabase) {
        return { success: false, error: 'Supabase not configured' };
    }
    try {
        // Use the anon client for sign in
        const anonClient = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
        const { data, error } = await anonClient.auth.signInWithPassword({
            email,
            password
        });
        if (error) {
            return { success: false, error: error.message };
        }
        return {
            success: true,
            user: data.user,
            session: data.session
        };
    }
    catch (error) {
        return { success: false, error: error.message };
    }
}
/**
 * Verify JWT token from Supabase
 */
async function verifyToken(token) {
    if (!supabase) {
        return { success: false, error: 'Supabase not configured' };
    }
    try {
        const { data, error } = await supabase.auth.getUser(token);
        if (error || !data.user) {
            return { success: false, error: error?.message || 'Invalid token' };
        }
        return { success: true, user: data.user };
    }
    catch (error) {
        return { success: false, error: error.message };
    }
}
/**
 * Get OAuth URL for social login
 */
async function getOAuthUrl(provider, redirectTo) {
    if (!supabase) {
        return { url: null, error: 'Supabase not configured' };
    }
    try {
        const anonClient = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
        const { data, error } = await anonClient.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo
            }
        });
        if (error) {
            return { url: null, error: error.message };
        }
        return { url: data.url };
    }
    catch (error) {
        return { url: null, error: error.message };
    }
}
/**
 * Sign out user
 */
async function signOut(token) {
    if (!supabase) {
        return { success: false, error: 'Supabase not configured' };
    }
    try {
        const { error } = await supabase.auth.admin.signOut(token);
        if (error) {
            return { success: false, error: error.message };
        }
        return { success: true };
    }
    catch (error) {
        return { success: false, error: error.message };
    }
}
/**
 * Get user by ID
 */
async function getUserById(userId) {
    if (!supabase) {
        return { success: false, error: 'Supabase not configured' };
    }
    try {
        const { data, error } = await supabase.auth.admin.getUserById(userId);
        if (error || !data.user) {
            return { success: false, error: error?.message || 'User not found' };
        }
        return { success: true, user: data.user };
    }
    catch (error) {
        return { success: false, error: error.message };
    }
}
/**
 * Update user metadata
 */
async function updateUserMetadata(userId, metadata) {
    if (!supabase) {
        return { success: false, error: 'Supabase not configured' };
    }
    try {
        const { data, error } = await supabase.auth.admin.updateUserById(userId, {
            user_metadata: metadata
        });
        if (error) {
            return { success: false, error: error.message };
        }
        return { success: true, user: data.user };
    }
    catch (error) {
        return { success: false, error: error.message };
    }
}
/**
 * Delete user
 */
async function deleteUser(userId) {
    if (!supabase) {
        return { success: false, error: 'Supabase not configured' };
    }
    try {
        const { error } = await supabase.auth.admin.deleteUser(userId);
        if (error) {
            return { success: false, error: error.message };
        }
        return { success: true };
    }
    catch (error) {
        return { success: false, error: error.message };
    }
}
exports.default = {
    signUpWithEmail,
    signInWithEmail,
    verifyToken,
    getOAuthUrl,
    signOut,
    getUserById,
    updateUserMetadata,
    deleteUser
};
//# sourceMappingURL=supabase.service.js.map