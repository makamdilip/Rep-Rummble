import oracledb from 'oracledb'

// Oracle connection configuration
let pool: oracledb.Pool | null = null
let isConnected = false

/**
 * Initialize Oracle Database connection pool
 */
export async function initOracleDB(): Promise<boolean> {
  if (!process.env.ORACLE_USER || !process.env.ORACLE_PASSWORD || !process.env.ORACLE_CONNECTION_STRING) {
    console.warn('⚠️  WARNING: Oracle DB credentials not set. Using mock data mode.')
    return false
  }

  try {
    // For Oracle Autonomous Database, use Thin mode (no Oracle Client needed)
    oracledb.initOracleClient()

    pool = await oracledb.createPool({
      user: process.env.ORACLE_USER,
      password: process.env.ORACLE_PASSWORD,
      connectString: process.env.ORACLE_CONNECTION_STRING,
      poolMin: 1,
      poolMax: 10,
      poolIncrement: 1
    })

    isConnected = true
    console.log('✅ Oracle Database connected')
    return true
  } catch (error: any) {
    console.error('❌ Oracle connection error:', error.message)

    // Try thin mode if client not installed
    try {
      pool = await oracledb.createPool({
        user: process.env.ORACLE_USER,
        password: process.env.ORACLE_PASSWORD,
        connectString: process.env.ORACLE_CONNECTION_STRING,
        poolMin: 1,
        poolMax: 10
      })
      isConnected = true
      console.log('✅ Oracle Database connected (thin mode)')
      return true
    } catch (thinError: any) {
      console.error('❌ Oracle thin mode error:', thinError.message)
      return false
    }
  }
}

/**
 * Check if Oracle DB is connected
 */
export function isOracleConnected(): boolean {
  return isConnected
}

/**
 * Execute a query
 */
export async function query<T>(
  sql: string,
  binds: any[] = [],
  options: oracledb.ExecuteOptions = {}
): Promise<T[]> {
  if (!pool) {
    throw new Error('Oracle Database not connected')
  }

  let connection: oracledb.Connection | null = null

  try {
    connection = await pool.getConnection()
    const result = await connection.execute(sql, binds, {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
      ...options
    })
    return (result.rows || []) as T[]
  } finally {
    if (connection) {
      await connection.close()
    }
  }
}

/**
 * Execute a query and return single result
 */
export async function queryOne<T>(
  sql: string,
  binds: any[] = []
): Promise<T | null> {
  const results = await query<T>(sql, binds)
  return results[0] || null
}

/**
 * Execute an insert/update/delete
 */
export async function execute(
  sql: string,
  binds: any[] = [],
  autoCommit: boolean = true
): Promise<oracledb.Result<unknown>> {
  if (!pool) {
    throw new Error('Oracle Database not connected')
  }

  let connection: oracledb.Connection | null = null

  try {
    connection = await pool.getConnection()
    const result = await connection.execute(sql, binds, { autoCommit })
    return result
  } finally {
    if (connection) {
      await connection.close()
    }
  }
}

/**
 * Execute multiple statements in a transaction
 */
export async function transaction(
  callback: (connection: oracledb.Connection) => Promise<void>
): Promise<void> {
  if (!pool) {
    throw new Error('Oracle Database not connected')
  }

  let connection: oracledb.Connection | null = null

  try {
    connection = await pool.getConnection()
    await callback(connection)
    await connection.commit()
  } catch (error) {
    if (connection) {
      await connection.rollback()
    }
    throw error
  } finally {
    if (connection) {
      await connection.close()
    }
  }
}

/**
 * Close the connection pool
 */
export async function closePool(): Promise<void> {
  if (pool) {
    await pool.close(0)
    pool = null
    isConnected = false
    console.log('Oracle connection pool closed')
  }
}

// ============================================
// DATA ACCESS FUNCTIONS
// ============================================

// Users
export async function createUser(user: {
  id: string
  email: string
  displayName?: string
  photoUrl?: string
}) {
  const sql = `
    INSERT INTO users (id, email, display_name, photo_url, created_at, updated_at)
    VALUES (:id, :email, :displayName, :photoUrl, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
  `
  return execute(sql, [user.id, user.email, user.displayName || null, user.photoUrl || null])
}

export async function getUserById(id: string) {
  const sql = `SELECT * FROM users WHERE id = :id`
  return queryOne(sql, [id])
}

export async function getUserByEmail(email: string) {
  const sql = `SELECT * FROM users WHERE email = :email`
  return queryOne(sql, [email])
}

export async function updateUser(id: string, data: Record<string, any>) {
  const fields = Object.keys(data).map((key, i) => `${key} = :${i + 2}`).join(', ')
  const sql = `UPDATE users SET ${fields}, updated_at = CURRENT_TIMESTAMP WHERE id = :1`
  return execute(sql, [id, ...Object.values(data)])
}

// Meals
export async function createMeal(meal: {
  userId: string
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  mealType: string
  imageUrl?: string
}) {
  const sql = `
    INSERT INTO meals (id, user_id, name, calories, protein, carbs, fat, meal_type, image_url, created_at)
    VALUES (SYS_GUID(), :userId, :name, :calories, :protein, :carbs, :fat, :mealType, :imageUrl, CURRENT_TIMESTAMP)
  `
  return execute(sql, [
    meal.userId, meal.name, meal.calories, meal.protein,
    meal.carbs, meal.fat, meal.mealType, meal.imageUrl || null
  ])
}

export async function getMealsByUserId(userId: string, limit: number = 50) {
  const sql = `
    SELECT * FROM meals
    WHERE user_id = :userId
    ORDER BY created_at DESC
    FETCH FIRST :limit ROWS ONLY
  `
  return query(sql, [userId, limit])
}

export async function getMealsByDate(userId: string, date: string) {
  const sql = `
    SELECT * FROM meals
    WHERE user_id = :userId
    AND TRUNC(created_at) = TO_DATE(:date, 'YYYY-MM-DD')
    ORDER BY created_at DESC
  `
  return query(sql, [userId, date])
}

// Workouts
export async function createWorkout(workout: {
  userId: string
  name: string
  duration: number
  caloriesBurned: number
  exercises: string // JSON string
}) {
  const sql = `
    INSERT INTO workouts (id, user_id, name, duration, calories_burned, exercises, created_at)
    VALUES (SYS_GUID(), :userId, :name, :duration, :caloriesBurned, :exercises, CURRENT_TIMESTAMP)
  `
  return execute(sql, [
    workout.userId, workout.name, workout.duration,
    workout.caloriesBurned, workout.exercises
  ])
}

export async function getWorkoutsByUserId(userId: string, limit: number = 50) {
  const sql = `
    SELECT * FROM workouts
    WHERE user_id = :userId
    ORDER BY created_at DESC
    FETCH FIRST :limit ROWS ONLY
  `
  return query(sql, [userId, limit])
}

// Contact messages
export async function createContact(contact: {
  name: string
  email: string
  message: string
}) {
  const sql = `
    INSERT INTO contacts (id, name, email, message, created_at)
    VALUES (SYS_GUID(), :name, :email, :message, CURRENT_TIMESTAMP)
  `
  return execute(sql, [contact.name, contact.email, contact.message])
}

// Leaderboard
export async function getLeaderboard(limit: number = 10) {
  const sql = `
    SELECT u.display_name, u.photo_url,
           COUNT(w.id) as workout_count,
           SUM(w.calories_burned) as total_calories
    FROM users u
    LEFT JOIN workouts w ON u.id = w.user_id
    GROUP BY u.id, u.display_name, u.photo_url
    ORDER BY total_calories DESC NULLS LAST
    FETCH FIRST :limit ROWS ONLY
  `
  return query(sql, [limit])
}

export default {
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
}
