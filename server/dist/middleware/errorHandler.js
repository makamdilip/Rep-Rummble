"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, _req, res, _next) => {
    console.error("Error:", err);
    // Mongoose duplicate key error
    if (err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        res.status(400).json({
            success: false,
            message: `${field} already exists`,
        });
    }
    // Mongoose validation error
    if (err.name === "ValidationError") {
        const messages = Object.values(err.errors).map((e) => e.message);
        res.status(400).json({
            success: false,
            message: messages.join(", "),
        });
    }
    // JWT errors
    if (err.name === "JsonWebTokenError") {
        res.status(401).json({
            success: false,
            message: "Invalid token",
        });
    }
    if (err.name === "TokenExpiredError") {
        res.status(401).json({
            success: false,
            message: "Token expired",
        });
    }
    // Default error
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Server error",
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map