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
exports.agentOnly = exports.adminOnly = exports.optionalAuth = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const supabase_service_1 = require("../services/supabase.service");
const protect = async (req, res, next) => {
    try {
        let token;
        // Check for token in Authorization header
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            res.status(401).json({
                success: false,
                message: 'Not authorized to access this route'
            });
            return;
        }
        // Try Supabase token verification first
        const supabaseResult = await (0, supabase_service_1.verifyToken)(token);
        if (supabaseResult.success && supabaseResult.user) {
            req.user = {
                id: supabaseResult.user.id,
                email: supabaseResult.user.email,
                displayName: supabaseResult.user.user_metadata?.displayName
            };
            next();
            return;
        }
        // Fallback to JWT verification
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'secret');
            req.user = {
                id: decoded.id
            };
            next();
            return;
        }
        catch (jwtError) {
            res.status(401).json({
                success: false,
                message: 'Invalid or expired token'
            });
            return;
        }
    }
    catch (error) {
        console.error('Auth middleware error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during authentication'
        });
        return;
    }
};
exports.protect = protect;
// Optional auth - doesn't require token but will attach user if present
const optionalAuth = async (req, res, next) => {
    try {
        void res;
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            next();
            return;
        }
        // Try Supabase token verification
        const supabaseResult = await (0, supabase_service_1.verifyToken)(token);
        if (supabaseResult.success && supabaseResult.user) {
            req.user = {
                id: supabaseResult.user.id,
                email: supabaseResult.user.email,
                displayName: supabaseResult.user.user_metadata?.displayName
            };
        }
        else {
            // Fallback to JWT
            try {
                const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'secret');
                req.user = { id: decoded.id };
            }
            catch {
                // Token invalid but optional, continue without user
            }
        }
        next();
    }
    catch (error) {
        // Don't fail, just continue without user
        next();
    }
};
exports.optionalAuth = optionalAuth;
// Admin check middleware
const adminOnly = async (req, res, next) => {
    if (!req.user) {
        res.status(401).json({
            success: false,
            message: 'Not authorized'
        });
        return;
    }
    // TODO: Check admin status from database
    // For now, allow all authenticated users
    next();
};
exports.adminOnly = adminOnly;
// Agent check middleware - ensures user is a support agent
const agentOnly = async (req, res, next) => {
    if (!req.user) {
        res.status(401).json({
            success: false,
            message: 'Not authorized'
        });
        return;
    }
    try {
        // Dynamic import to avoid circular dependency
        const { SupportAgent } = await Promise.resolve().then(() => __importStar(require('../models/SupportAgent.model')));
        const agent = await SupportAgent.findOne({ userId: req.user.id });
        if (!agent) {
            res.status(403).json({
                success: false,
                message: 'Agent access required'
            });
            return;
        }
        // Attach agent to request for use in controllers
        ;
        req.agent = agent;
        next();
    }
    catch (error) {
        console.error('Agent middleware error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during agent verification'
        });
    }
};
exports.agentOnly = agentOnly;
//# sourceMappingURL=auth.middleware.js.map