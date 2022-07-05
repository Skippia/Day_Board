import mongoose from 'mongoose'
import dotenv from 'dotenv'
import app from './app.js'

dotenv.config({ path: './config.env' })

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...')
  console.log(err.name, err.message)
  process.exit(1)
})

dotenv.config({ path: './config.env' })

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD)

mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('DB connection successful!'))

const port = process.env.PORT || 5000
const server = app.listen(port, () => {
  console.log(`app running on port ${port}...`)
})

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...')
  console.log(err.name, err.message)
  server.close(() => {
    process.exit(1)
  })
})

process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED. Shutting down gracefully...')
  server.close(() => {
    console.log('Process terminated...')
  })
})
