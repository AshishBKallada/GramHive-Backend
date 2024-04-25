
import mongoose from "mongoose";

export async function connectToMongoDB(): Promise<void> {
  const MONGODB_URI = 'mongodb://127.0.0.1:27017/gramhive';

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}
