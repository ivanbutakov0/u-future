const express = require('express')
const cors = require('cors')
require('dotenv').config()

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(
	cors({
		origin: 'http://localhost:5173',
	})
)

app.get('/', (req, res) => {
	res.send('Hello World!')
})

const start = async () => {
	try {
		app.listen(PORT, () => {
			console.log(`Server is running on port http://localhost:${PORT}`)
		})
	} catch (err) {
		console.log(err)
	}
}

start()
