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
Object.defineProperty(exports, "__esModule", { value: true });
exports.initOracleDB = initOracleDB;
exports.isOracleConnected = isOracleConnected;
exports.query = query;
exports.queryOne = queryOne;
exports.execute = execute;
exports.transaction = transaction;
exports.closePool = closePool;
exports.createUser = createUser;
exports.getUserById = getUserById;
exports.getUserByEmail = getUserByEmail;
exports.updateUser = updateUser;
exports.createMeal = createMeal;
exports.getMealsByUserId = getMealsByUserId;
exports.getMealsByDate = getMealsByDate;
exports.createWorkout = createWorkout;
exports.getWorkoutsByUserId = getWorkoutsByUserId;
exports.createContact = createContact;
exports.getLeaderboard = getLeaderboard;
const oracledb = __importStar(require("oracledb"));
// Oracle connection configuration
let pool = null;
let isConnected = false;
/**
 * Initialize Oracle Database connection pool
 */
async function initOracleDB() {
    if (!process.env.ORACLE_USER || !process.env.ORACLE_PASSWORD || !process.env.ORACLE_CONNECTION_STRING) {
        console.warn('⚠️  WARNING: Oracle DB credentials not set. Using mock data mode.');
        return false;
    }
    try {
        // Prefer thin mode by default; only init thick client if explicitly configured
        if (process.env.ORACLE_CLIENT_LIB_DIR) {
            oracledb.initOracleClient({ libDir: process.env.ORACLE_CLIENT_LIB_DIR });
        }
        pool = await oracledb.createPool({
            user: process.env.ORACLE_USER,
            password: process.env.ORACLE_PASSWORD,
            connectString: process.env.ORACLE_CONNECTION_STRING,
            poolMin: 1,
            poolMax: 10,
            poolIncrement: 1
        });
        isConnected = true;
        console.log('✅ Oracle Database connected');
        return true;
    }
    catch (error) {
        console.error('❌ Oracle connection error:', error.message);
        // Try thin mode if client not installed
        try {
            pool = await oracledb.createPool({
                user: process.env.ORACLE_USER,
                password: process.env.ORACLE_PASSWORD,
                connectString: process.env.ORACLE_CONNECTION_STRING,
                poolMin: 1,
                poolMax: 10
            });
            isConnected = true;
            console.log('✅ Oracle Database connected (thin mode)');
            return true;
        }
        catch (thinError) {
            console.error('❌ Oracle thin mode error:', thinError.message);
            return false;
        }
    }
}
/**
 * Check if Oracle DB is connected
 */
function isOracleConnected() {
    return isConnected;
}
/**
 * Execute a query
 */
async function query(sql, binds = [], options = {}) {
    if (!pool) {
        throw new Error('Oracle Database not connected');
    }
    let connection = null;
    try {
        connection = await pool.getConnection();
        const result = await connection.execute(sql, binds, {
            outFormat: oracledb.OUT_FORMAT_OBJECT,
            ...options
        });
        return (result.rows || []);
    }
    finally {
        if (connection) {
            await connection.close();
        }
    }
}
/**
 * Execute a query and return single result
 */
async function queryOne(sql, binds = []) {
    const results = await query(sql, binds);
    return results[0] || null;
}
/**
 * Execute an insert/update/delete
 */
async function execute(sql, binds = [], autoCommit = true) {
    if (!pool) {
        throw new Error('Oracle Database not connected');
    }
    let connection = null;
    try {
        connection = await pool.getConnection();
        const result = await connection.execute(sql, binds, { autoCommit });
        return result;
    }
    finally {
        if (connection) {
            await connection.close();
        }
    }
}
/**
 * Execute multiple statements in a transaction
 */
async function transaction(callback) {
    if (!pool) {
        throw new Error('Oracle Database not connected');
    }
    let connection = null;
    try {
        connection = await pool.getConnection();
        await callback(connection);
        await connection.commit();
    }
    catch (error) {
        if (connection) {
            await connection.rollback();
        }
        throw error;
    }
    finally {
        if (connection) {
            await connection.close();
        }
    }
}
/**
 * Close the connection pool
 */
async function closePool() {
    if (pool) {
        await pool.close(0);
        pool = null;
        isConnected = false;
        console.log('Oracle connection pool closed');
    }
}
// ============================================
// DATA ACCESS FUNCTIONS
// ============================================
// Users
async function createUser(user) {
    const sql = `
    INSERT INTO users (id, email, display_name, photo_url, created_at, updated_at)
    VALUES (:id, :email, :displayName, :photoUrl, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
  `;
    return execute(sql, [user.id, user.email, user.displayName || null, user.photoUrl || null]);
}
async function getUserById(id) {
    const sql = `SELECT * FROM users WHERE id = :id`;
    return queryOne(sql, [id]);
}
async function getUserByEmail(email) {
    const sql = `SELECT * FROM users WHERE email = :email`;
    return queryOne(sql, [email]);
}
async function updateUser(id, data) {
    const fields = Object.keys(data).map((key, i) => `${key} = :${i + 2}`).join(', ');
    const sql = `UPDATE users SET ${fields}, updated_at = CURRENT_TIMESTAMP WHERE id = :1`;
    return execute(sql, [id, ...Object.values(data)]);
}
// Meals
async function createMeal(meal) {
    const sql = `
    INSERT INTO meals (id, user_id, name, calories, protein, carbs, fat, meal_type, image_url, created_at)
    VALUES (SYS_GUID(), :userId, :name, :calories, :protein, :carbs, :fat, :mealType, :imageUrl, CURRENT_TIMESTAMP)
  `;
    return execute(sql, [
        meal.userId, meal.name, meal.calories, meal.protein,
        meal.carbs, meal.fat, meal.mealType, meal.imageUrl || null
    ]);
}
async function getMealsByUserId(userId, limit = 50) {
    const sql = `
    SELECT * FROM meals
    WHERE user_id = :userId
    ORDER BY created_at DESC
    FETCH FIRST :limit ROWS ONLY
  `;
    return query(sql, [userId, limit]);
}
async function getMealsByDate(userId, date) {
    const sql = `
    SELECT * FROM meals
    WHERE user_id = :userId
    AND TRUNC(created_at) = TO_DATE(:date, 'YYYY-MM-DD')
    ORDER BY created_at DESC
  `;
    return query(sql, [userId, date]);
}
// Workouts
async function createWorkout(workout) {
    const sql = `
    INSERT INTO workouts (id, user_id, name, duration, calories_burned, exercises, created_at)
    VALUES (SYS_GUID(), :userId, :name, :duration, :caloriesBurned, :exercises, CURRENT_TIMESTAMP)
  `;
    return execute(sql, [
        workout.userId, workout.name, workout.duration,
        workout.caloriesBurned, workout.exercises
    ]);
}
async function getWorkoutsByUserId(userId, limit = 50) {
    const sql = `
    SELECT * FROM workouts
    WHERE user_id = :userId
    ORDER BY created_at DESC
    FETCH FIRST :limit ROWS ONLY
  `;
    return query(sql, [userId, limit]);
}
// Contact messages
async function createContact(contact) {
    const sql = `
    INSERT INTO contacts (id, name, email, message, created_at)
    VALUES (SYS_GUID(), :name, :email, :message, CURRENT_TIMESTAMP)
  `;
    return execute(sql, [contact.name, contact.email, contact.message]);
}
// Leaderboard
async function getLeaderboard(limit = 10) {
    const sql = `
    SELECT u.display_name, u.photo_url,
           COUNT(w.id) as workout_count,
           SUM(w.calories_burned) as total_calories
    FROM users u
    LEFT JOIN workouts w ON u.id = w.user_id
    GROUP BY u.id, u.display_name, u.photo_url
    ORDER BY total_calories DESC NULLS LAST
    FETCH FIRST :limit ROWS ONLY
  `;
    return query(sql, [limit]);
}
exports.default = {
    initOracleDB,
    isOracleConnected,
    query,
    queryOne,
    execute,
    transaction,
    closePool,
    createUser,
    getUserById,
    getUserByEmail,
    updateUser,
    createMeal,
    getMealsByUserId,
    getMealsByDate,
    createWorkout,
    getWorkoutsByUserId,
    createContact,
    getLeaderboard
};
//# sourceMappingURL=oracle.service.js.map