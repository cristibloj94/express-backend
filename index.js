const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv/config')

const PORT = process.env.PORT

// Body Parser Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Homepage Route
app.get('/', (req, res) => res.send('<h1>Hello from Express!</h1>'))

// Members API Routes
app.use('/api/users', require('./routes/api/users'))

// Connect to DB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => console.log("Connected to DB!"))

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))