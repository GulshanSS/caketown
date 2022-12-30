import mongoose from "mongoose";
import logger from "./logger.config";
import { DB_URI } from "./constants.config";

const dbConnect = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(DB_URI as string);
    logger.info("DB connected");
  } catch (e: any) {
    logger.error("DB connection issue");
    process.exit(1);
  }
};

export default dbConnect;
