import * as oracledb from 'oracledb';
/**
 * Initialize Oracle Database connection pool
 */
export declare function initOracleDB(): Promise<boolean>;
/**
 * Check if Oracle DB is connected
 */
export declare function isOracleConnected(): boolean;
/**
 * Execute a query
 */
export declare function query<T>(sql: string, binds?: any[], options?: oracledb.ExecuteOptions): Promise<T[]>;
/**
 * Execute a query and return single result
 */
export declare function queryOne<T>(sql: string, binds?: any[]): Promise<T | null>;
/**
 * Execute an insert/update/delete
 */
export declare function execute(sql: string, binds?: any[], autoCommit?: boolean): Promise<oracledb.Result<unknown>>;
/**
 * Execute multiple statements in a transaction
 */
export declare function transaction(callback: (connection: oracledb.Connection) => Promise<void>): Promise<void>;
/**
 * Close the connection pool
 */
export declare function closePool(): Promise<void>;
export declare function createUser(user: {
    id: string;
    email: string;
    displayName?: string;
    photoUrl?: string;
}): Promise<any>;
export declare function getUserById(id: string): Promise<unknown>;
export declare function getUserByEmail(email: string): Promise<unknown>;
export declare function updateUser(id: string, data: Record<string, any>): Promise<any>;
export declare function createMeal(meal: {
    userId: string;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    mealType: string;
    imageUrl?: string;
}): Promise<any>;
export declare function getMealsByUserId(userId: string, limit?: number): Promise<unknown[]>;
export declare function getMealsByDate(userId: string, date: string): Promise<unknown[]>;
export declare function createWorkout(workout: {
    userId: string;
    name: string;
    duration: number;
    caloriesBurned: number;
    exercises: string;
}): Promise<any>;
export declare function getWorkoutsByUserId(userId: string, limit?: number): Promise<unknown[]>;
export declare function createContact(contact: {
    name: string;
    email: string;
    message: string;
}): Promise<any>;
export declare function getLeaderboard(limit?: number): Promise<unknown[]>;
declare const _default: {
    initOracleDB: typeof initOracleDB;
    isOracleConnected: typeof isOracleConnected;
    query: typeof query;
    queryOne: typeof queryOne;
    execute: typeof execute;
    transaction: typeof transaction;
    closePool: typeof closePool;
    createUser: typeof createUser;
    getUserById: typeof getUserById;
    getUserByEmail: typeof getUserByEmail;
    updateUser: typeof updateUser;
    createMeal: typeof createMeal;
    getMealsByUserId: typeof getMealsByUserId;
    getMealsByDate: typeof getMealsByDate;
    createWorkout: typeof createWorkout;
    getWorkoutsByUserId: typeof getWorkoutsByUserId;
    createContact: typeof createContact;
    getLeaderboard: typeof getLeaderboard;
};
export default _default;
//# sourceMappingURL=oracle.service.d.ts.map