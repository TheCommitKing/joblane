require('dotenv').config(); // Load .env at the very top

const app = require('./app');
const databaseConnection = require('./config/database');
const cloudinary = require('cloudinary');

// Debug: Log environment variables
console.log('Environment Variables:', {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI ? 'exists' : 'MISSING',
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME ? 'exists' : 'MISSING'
});

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Start server
const startServer = async () => {
  try {
    await databaseConnection();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();