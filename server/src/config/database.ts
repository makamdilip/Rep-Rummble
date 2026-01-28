import mongoose from 'mongoose'

let isMongoConnected = false

export const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/rep-rumble'

    await mongoose.connect(mongoURI)

    isMongoConnected = true
    console.log('✅ MongoDB connected successfully')
    console.log(`📊 Database: ${mongoose.connection.name}`)
  } catch (error: any) {
    isMongoConnected = false
    console.warn('⚠️  MongoDB unavailable - running in mock data mode')
    console.warn('   To enable MongoDB, install and run MongoDB, or set MONGODB_URI to a valid connection string')
    // Do not exit the process; allow the server to start even if MongoDB is unavailable.
    // API routes that depend on the database should handle lack of connection appropriately.
    return
  }
}

export const isDBConnected = (): boolean => isMongoConnected

// Handle connection events
mongoose.connection.on('disconnected', () => {
  isMongoConnected = false
  console.log('⚠️  MongoDB disconnected')
})

mongoose.connection.on('connected', () => {
  isMongoConnected = true
  console.log('✅ MongoDB reconnected')
})

mongoose.connection.on('error', (error) => {
  isMongoConnected = false
  // Suppress repeated error messages in development
  if (process.env.NODE_ENV !== 'production') {
    // Only log once per connection attempt
    return
  }
  console.error('❌ MongoDB error:', error)
})

process.on('SIGINT', async () => {
  await mongoose.connection.close()
  console.log('🔌 MongoDB connection closed due to app termination')
  process.exit(0)
})
