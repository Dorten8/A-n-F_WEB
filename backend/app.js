//Environment configuration (always on the top!)
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
});

// Importing required modules
const express = require('express');
const app = express();

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');//for logging in, more complicated, will not need
const createError = require('http-errors');

const productController = require('./controllers/productController'); //changed to productController //only in Exercises class
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth'); //added for login


// const port = 3000; NO LONGER NEEDED thx to dotenv->env

// Middleware setup
app.use(express.json());
app.use(logger('dev'));
// Middleware for parsing JSON and URL-encoded data

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//serving static files from the frontend directory
// app.use(express.static(path.join(__dirname, '../frontend'))) 

app.use('/products', productController); // Mounting the product controller to handle product-related routes
app.use('/users', usersRouter);
app.use('/auth', authRouter); // Mounting the auth router to handle authentication routes


// Serve frontend's index.html for all non-API routes
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/index.html'));
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// error handler
// Error handler - updated version
app.use(function(err, req, res, next) {
  console.error('Server error:', err.stack); // Log the error
  
  // For API routes, return JSON errors
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.status || 500).json({
      error: {
        message: err.message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
      }
    });
  }
  
  // For regular routes, send simple text
  res.status(err.status || 500);
  res.send(`Error ${err.status || 500}: ${err.message}`);
});
  

module.exports = app;
