const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Check if MONGODB_URI is defined
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    console.log('Attempting to connect to MongoDB...');
    console.log('MongoDB URI:', process.env.MONGODB_URI.replace(/\/\/.*@/, '//***:***@')); // Hide credentials
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:');
    console.error('Error message:', error.message);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.error('💡 Solution: Make sure MongoDB is running on your system');
      console.error('   - Install MongoDB: https://www.mongodb.com/try/download/community');
      console.error('   - Start MongoDB service');
      console.error('   - Or use MongoDB Atlas cloud database');
    }
    
    if (error.message.includes('authentication failed')) {
      console.error('💡 Solution: Check your MongoDB username and password');
    }
    
    if (error.message.includes('MONGODB_URI')) {
      console.error('💡 Solution: Check your .env file contains MONGODB_URI');
    }
    
    process.exit(1);
  }
};

module.exports = connectDB;
