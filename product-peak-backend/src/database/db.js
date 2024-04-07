const mongoose = require('mongoose');

const MONGODB_URI = `mongodb://localhost:27017/Product-Peak`;

const { DB_NAME } = process.env; 

const dbConnection = async () => {
  try {
    await mongoose.connect(`${MONGODB_URI}/${DB_NAME}`);
    console.log('[INFO] MongoDB is connected');
  } catch (error) {
    console.log(error);
    throw new Error('[ERROR] It is not possible to initialize MongoDB connection');
  }
};

module.exports = {
  connectDB: dbConnection
};


