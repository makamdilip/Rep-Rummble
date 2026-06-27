"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDBConnected = exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
let isMongoConnected = false;
const connectDB = async () => {
    try {
        let mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/reprummble';
        // Ensure the URI includes the database name — prevents defaulting to 'test'
        if (mongoURI.includes('mongodb+srv://') || mongoURI.includes('mongodb://')) {
            const hasDbName = /\/[^/?]+(\?|$)/.test(mongoURI.replace(/mongodb(\+srv)?:\/\/[^/]+/, ''));
            if (!hasDbName) {
                mongoURI = mongoURI.replace(/\/?(\?|$)/, '/reprummble$1');
            }
        }
        await mongoose_1.default.connect(mongoURI);
        isMongoConnected = true;
        console.log('✅ MongoDB connected successfully');
        console.log(`📊 Database: ${mongoose_1.default.connection.name}`);
    }
    catch (error) {
        isMongoConnected = false;
        console.warn('⚠️  MongoDB unavailable - running in mock data mode');
        console.warn('   To enable MongoDB, install and run MongoDB, or set MONGODB_URI to a valid connection string');
        // Do not exit the process; allow the server to start even if MongoDB is unavailable.
        // API routes that depend on the database should handle lack of connection appropriately.
        return;
    }
};
exports.connectDB = connectDB;
const isDBConnected = () => isMongoConnected;
exports.isDBConnected = isDBConnected;
// Handle connection events
mongoose_1.default.connection.on('disconnected', () => {
    isMongoConnected = false;
    console.log('⚠️  MongoDB disconnected');
});
mongoose_1.default.connection.on('connected', () => {
    isMongoConnected = true;
    console.log('✅ MongoDB reconnected');
});
mongoose_1.default.connection.on('error', (error) => {
    isMongoConnected = false;
    // Suppress repeated error messages in development
    if (process.env.NODE_ENV !== 'production') {
        // Only log once per connection attempt
        return;
    }
    console.error('❌ MongoDB error:', error);
});
process.on('SIGINT', async () => {
    await mongoose_1.default.connection.close();
    console.log('🔌 MongoDB connection closed due to app termination');
    process.exit(0);
});
//# sourceMappingURL=database.js.map