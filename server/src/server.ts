import express from "express";

import dotenv from "dotenv";
dotenv.config();

import dbConnect from "./config/db.config";
import logger from "./config/logger.config";
import CategoryRouter from "./routes/category.routes";

const app = express();

app.use(express.json());

dbConnect();

app.use("/category", CategoryRouter);

const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
  logger.info(`Server Started at http://localhost:${PORT}`);
});
