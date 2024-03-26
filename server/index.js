const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const PORT = process.env.PORT || 3000
const ORIGIN = process.env.ORIGIN
const app = express()

app.use(express.json())
app.use(
	cors({
		origin: ORIGIN,
	})
)

app.get('/', (req, res) => {
	res.send('Hello World!')
})

// Error handling middleware
app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500
	const message = err.message || 'Internal Server Error'

	res.status(statusCode).json({
		success: false,
		statusCode,
		message,
	})
})

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
