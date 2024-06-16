
import mongoose from "mongoose";
import config from "./server";

export async function connectToMongoDB(): Promise<void> {
  const MONGODB_URI = config.MONGODB;
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}
