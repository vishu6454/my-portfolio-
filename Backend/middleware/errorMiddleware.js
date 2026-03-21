export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  console.error('❌ Error:', err.message);
  if (err.stack && process.env.NODE_ENV === 'development') {
    console.error('Stack:', err.stack);
  }
  
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};