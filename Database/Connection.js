import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const URI = process.env.DATABASE_URI;

const connectingToDatabase = async () => {
  try {
    await mongoose.connect(URI);
    console.log('Successfully connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1); // Optional: exit process with failure code
  }
};

export default connectingToDatabase;
