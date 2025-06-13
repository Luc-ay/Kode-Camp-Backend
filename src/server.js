import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import authRoutes from './routes/auth.route.js'

const app = express()

// middlewares
dotenv.config()
app.use(morgan('dev'))
app.use(cors())

// Routes
app.use('/auth', authRoutes)

// server port
const PORT = process.env.PORT || 5001

app.listen(PORT, () => {
  console.clear()
  console.log(`Server is running on PORT: ${PORT}`)
})
