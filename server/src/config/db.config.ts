import mongoose from "mongoose";
import logger from "./logger.config";

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URI as string);
    logger.info("DB connected");
  } catch (e: any) {
    logger.error("DB connection issue");
    process.exit(1);
  }
};

export default dbConnect;
