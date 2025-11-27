import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import dotenv from 'dotenv'
import { connectDB } from './config/database'
import { errorHandler } from './middleware/errorHandler'

// Import routes
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import mealRoutes from './routes/meal.routes'
import workoutRoutes from './routes/workout.routes'
import leaderboardRoutes from './routes/leaderboard.routes'

// Load environment variables
dotenv.config()

// Create Express app
const app: Express = express()
const PORT = process.env.PORT || 5000

// Connect to MongoDB
connectDB()

// Middleware
app.use(helmet()) // Security headers
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}))
app.use(compression()) // Compress responses
app.use(morgan('dev')) // Logging
app.use(express.json()) // Parse JSON bodies
app.use(express.urlencoded({ extended: true })) // Parse URL-encoded bodies

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'OK',
    message: 'Rep Rumble API is running',
    timestamp: new Date().toISOString()
  })
})

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/meals', mealRoutes)
app.use('/api/workouts', workoutRoutes)
app.use('/api/leaderboard', leaderboardRoutes)

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  })
})

// Error handler (must be last)
app.use(errorHandler)

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📝 Environment: ${process.env.NODE_ENV}`)
  console.log(`🔗 API URL: http://localhost:${PORT}/api`)
})

export default app
