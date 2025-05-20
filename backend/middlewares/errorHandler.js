// middleware/errorHandler.js

/**
 * Error handling middleware for Express
 * Catches errors thrown from controllers and sends JSON response
 */
module.exports = (err, req, res, next) => {
    // Log error stack in development
    if (process.env.NODE_ENV === 'development') {
      console.error('🔥 Error:', err.stack);
    }
  
    // Default to 500 server error
    const statusCode = err.status || err.statusCode || 500;
    const message = err.message || 'Đã xảy ra lỗi trên server';
  
    // For validation errors from express-validator
    if (err.errors && Array.isArray(err.errors)) {
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: err.errors.map(e => ({ msg: e.msg, param: e.param }))
      });
    }
  
    // For unauthorized errors (e.g., from JWT auth middleware)
    if (err.name === 'UnauthorizedError') {
      return res.status(401).json({
        success: false,
        message: 'Không được phép truy cập'
      });
    }
  
    // Send JSON error response
    res.status(statusCode).json({
      success: false,
      message: process.env.NODE_ENV === 'development' ? message : 'Đã xảy ra lỗi',
      // In production, don't expose stack or internal details
      ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {})
    });
  };
  