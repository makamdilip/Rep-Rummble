"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAccount = exports.updateProfile = exports.logout = exports.getOAuthUrl = exports.getMe = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const supabaseService = __importStar(require("../services/supabase.service"));
const User_model_1 = require("../models/User.model");
const nodemailer_1 = __importDefault(require("nodemailer"));
// Generate JWT Token
const generateToken = (id) => {
    const options = { expiresIn: process.env.JWT_EXPIRE || "7d" };
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET || "secret", options);
};
// @route POST /api/auth/register
const register = async (req, res) => {
    try {
        const { email, password, displayName } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please provide email and password" });
        }
        const result = await supabaseService.signUpWithEmail(email, password, { displayName });
        if (!result.success || !result.user) {
            return res.status(400).json({ success: false, message: result.error || "Registration failed" });
        }
        // Also create in MongoDB
        await User_model_1.User.findOneAndUpdate({ email: result.user.email }, { email: result.user.email, displayName: displayName || "" }, { upsert: true, new: true });
        const token = generateToken(result.user.id);
        return res.status(201).json({
            success: true,
            data: {
                user: {
                    id: result.user.id,
                    email: result.user.email,
                    displayName: displayName || result.user.user_metadata?.displayName,
                },
                token,
            },
        });
    }
    catch (error) {
        const err = error;
        return res.status(500).json({ success: false, message: err.message || "Server error" });
    }
};
exports.register = register;
// @route POST /api/auth/login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please provide email and password" });
        }
        const result = await supabaseService.signInWithEmail(email, password);
        if (!result.success || !result.user) {
            return res.status(401).json({ success: false, message: result.error || "Invalid credentials" });
        }
        // Get MongoDB user data
        const mongoUser = await User_model_1.User.findOne({ email: result.user.email });
        const userData = {
            id: result.user.id,
            email: result.user.email,
            displayName: result.user.user_metadata?.displayName || mongoUser?.displayName,
            streak: mongoUser?.streak || 0,
            xp: mongoUser?.xp || 0,
            level: mongoUser?.level || 1,
        };
        return res.json({
            success: true,
            data: {
                user: userData,
                token: result.session?.access_token || generateToken(result.user.id),
                refreshToken: result.session?.refresh_token,
            },
        });
    }
    catch (error) {
        const err = error;
        return res.status(500).json({ success: false, message: err.message || "Server error" });
    }
};
exports.login = login;
// @route GET /api/auth/me
const getMe = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Not authenticated" });
        }
        const supabaseResult = await supabaseService.getUserById(userId);
        const mongoUser = await User_model_1.User.findOne({ email: supabaseResult.user?.email });
        const userData = {
            id: userId,
            email: supabaseResult.user?.email,
            displayName: supabaseResult.user?.user_metadata?.displayName || mongoUser?.displayName,
            streak: mongoUser?.streak || 0,
            xp: mongoUser?.xp || 0,
            level: mongoUser?.level || 1,
        };
        return res.json({ success: true, data: userData });
    }
    catch (error) {
        const err = error;
        return res.status(500).json({ success: false, message: err.message || "Server error" });
    }
};
exports.getMe = getMe;
// @route GET /api/auth/oauth/:provider
const getOAuthUrl = async (req, res) => {
    try {
        const provider = req.params.provider;
        const redirectTo = req.query.redirect || process.env.CLIENT_URL + '/auth/callback';
        const validProviders = ['google', 'facebook', 'apple', 'twitter'];
        if (!validProviders.includes(provider)) {
            return res.status(400).json({ success: false, message: "Invalid OAuth provider" });
        }
        const result = await supabaseService.getOAuthUrl(provider, redirectTo);
        if (!result.url) {
            return res.status(500).json({ success: false, message: result.error || "Failed to generate OAuth URL" });
        }
        return res.redirect(result.url);
    }
    catch (error) {
        const err = error;
        return res.status(500).json({ success: false, message: err.message || "Server error" });
    }
};
exports.getOAuthUrl = getOAuthUrl;
// @route POST /api/auth/logout
const logout = async (req, res) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (token)
            await supabaseService.signOut(token);
        return res.json({ success: true, message: "Logged out successfully" });
    }
    catch (error) {
        const err = error;
        return res.status(500).json({ success: false, message: err.message || "Server error" });
    }
};
exports.logout = logout;
// @route PUT /api/auth/profile
const updateProfile = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { displayName, photoUrl } = req.body;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Not authenticated" });
        }
        if (displayName || photoUrl) {
            await supabaseService.updateUserMetadata(userId, { displayName, photoUrl });
        }
        return res.json({ success: true, message: "Profile updated successfully" });
    }
    catch (error) {
        const err = error;
        return res.status(500).json({ success: false, message: err.message || "Server error" });
    }
};
exports.updateProfile = updateProfile;
// @route DELETE /api/auth/account
const deleteAccount = async (req, res) => {
    try {
        const userId = req.user?.id;
        const userEmail = req.user?.email;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Not authenticated" });
        }
        // Delete from Supabase auth
        const result = await supabaseService.deleteUser(userId);
        if (!result.success) {
            return res.status(500).json({ success: false, message: result.error || "Failed to delete account" });
        }
        // Delete from MongoDB
        if (userEmail) {
            await User_model_1.User.deleteOne({ email: userEmail });
        }
        // Send confirmation email if configured
        if (userEmail && process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
            try {
                const transporter = nodemailer_1.default.createTransport({
                    service: 'gmail',
                    auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
                });
                await transporter.sendMail({
                    from: `"Reprummble" <${process.env.GMAIL_USER}>`,
                    to: userEmail,
                    subject: 'Your Reprummble account has been deleted',
                    text: `Hi,\n\nYour Reprummble account (${userEmail}) has been permanently deleted as requested.\n\nAll your personal data, health logs, and workout records have been removed from our systems within the timeframes described in our Privacy Policy.\n\nIf you did not request this, please contact us immediately at support@reprummble.com.\n\nTake care,\nThe Reprummble Team`,
                });
                // Also notify admin
                await transporter.sendMail({
                    from: `"Reprummble" <${process.env.GMAIL_USER}>`,
                    to: process.env.GMAIL_USER,
                    subject: `Account deletion: ${userEmail}`,
                    text: `User ${userEmail} (ID: ${userId}) has deleted their account.\n\nTimestamp: ${new Date().toISOString()}`,
                });
            }
            catch (_) {
                // Email failure should not block account deletion
            }
        }
        return res.json({ success: true, message: "Account deleted successfully" });
    }
    catch (error) {
        const err = error;
        return res.status(500).json({ success: false, message: err.message || "Server error" });
    }
};
exports.deleteAccount = deleteAccount;
//# sourceMappingURL=auth.controller.js.map