const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const userRouter = require('./routes/user.route')
const courseRouter = require('./routes/course.route')
const categoryRouter = require('./routes/category.route')
const { errorMiddleware } = require('./middleware/error.middleware')
require('dotenv').config()

const PORT = process.env.PORT || 3000
const CLIENT_URL = process.env.CLIENT_URL
const app = express()

// Middleware for parsing request body
app.use(express.json())

// Middleware for parsing cookies
app.use(cookieParser())

// Enable CORS
app.use(
	cors({
		origin: CLIENT_URL,
		credentials: true,
	})
)

// Routes
app.use('/api/user', userRouter)
app.use('/api/course', courseRouter)
app.use('/api/category', categoryRouter)

// Error handling middleware
app.use(errorMiddleware)

const start = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URL)

		app.listen(PORT, () => {
			console.log(`Server is running on port http://localhost:${PORT}`)
		})
	} catch (err) {
		console.log(err)
	}
}

start()
