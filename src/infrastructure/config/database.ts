import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB_String = process.env.MONGODB_URI;

if (!DB_String) {
  throw new Error(
    "MONGODB_URI is not defined. Please set it in your environment variables."
  );
}

const connectDB = async () => {
  try {
    await mongoose.connect(DB_String);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
