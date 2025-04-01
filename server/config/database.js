const mongoose = require('mongoose');

const databaseConnection = async () => {
  try {
    let uri = process.env.MONGODB_URI;
    
    if (!uri) {
      console.warn('Using fallback local MongoDB connection');
      uri = 'mongodb://127.0.0.1:27017/joblane'; // IPv4 instead of IPv6
    }

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000 // Close sockets after 45s of inactivity
    });

    console.log('Database connected successfully');
    
    // Verify connection is stable
    mongoose.connection.on('error', err => {
      console.error('MongoDB connection error:', err);
    });

  } catch (error) {
    console.error('Database connection failed:', error.message);
    
    // More specific error handling
    if (error.message.includes('ECONNREFUSED')) {
      console.error('MongoDB service is likely not running');
      console.error('Run "mongod" in a separate terminal or start the service');
    }
    
    process.exit(1);
  }
};

module.exports = databaseConnection;