const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

const connectDB = async () => {
  try {
    const connStr = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/fitforge_ai';
    
    // Attempt connecting to explicit / local MongoDB
    try {
      await mongoose.connect(connStr, {
        serverSelectionTimeoutMS: 2000
      });
      console.log(`MongoDB Connected: ${mongoose.connection.host}`);
    } catch (localErr) {
      console.log('Local MongoDB not accessible. Starting in-memory MongoMemoryServer fallback...');
      mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      await mongoose.connect(mongoUri);
      console.log(`In-Memory MongoDB Connected at ${mongoUri}`);
    }
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
