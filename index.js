const express = require('express')

const app = express()

const PORT = process.env.PORT || 5000

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Homepage Route
app.get('/', (req, res) => res.send('<h1>Hello from Express!</h1>'))

// Members API Routes
app.use('/api/users', require('./routes/api/users'));

app.listen(PORT, () => `Server started on port ${PORT}`)