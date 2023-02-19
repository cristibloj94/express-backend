const express = require('express')
const users = require('./Users')

const app = express()

const PORT = process.env.PORT || 5000

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Homepage Route
app.get('/', (req, res) => res.json(users))

// Members API Routes
app.use('/api/users', require('./routes/api/users'));

app.listen(PORT, () => `Server started on port ${PORT}`)