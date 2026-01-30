import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error(
    "Please define the MONGO_URI environment variable inside .env"
  );
}

let isConnected = false;

const connectDb = async () => {
  if (isConnected) {
    console.log(" Already connect to mongoDB");
    return;
  }
  try {
    await mongoose.connect('mongodb+srv://mycompanyapplied:in0EN5VJRDJXDkVO@mymodules.qssso.mongodb.net/userdata?appName=mymodules');
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error(" Database connection failed");
  }
};

export default connectDb;
