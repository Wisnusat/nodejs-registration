const express = require('express');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorMiddleware');

const app = express();

// Middleware untuk parsing JSON
app.use(express.json());

// Rute API
app.use('/api/user', userRoutes);

// Middleware untuk menangani error
app.use(errorHandler);

module.exports = app;
