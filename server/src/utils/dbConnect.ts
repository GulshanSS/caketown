import { Request, Response } from "express";
import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URI as string);
    console.log("DB connected");
  } catch (e: any) {
    console.error("DB connection issue");
    process.exit(1);
  }
};

export default dbConnect;
