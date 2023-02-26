const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv/config')

// Body Parser Middleware
app.use(cors())
app.use(express.json())

// Homepage Route
app.get('/', (req, res) => res.send('<h1>Hello from Express!</h1>'))

// API Routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/players', require('./routes/api/players'))

// Connect to DB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => console.log("Connected to DB!"))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))