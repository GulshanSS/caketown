import express, { Request, Response } from "express";

import dotenv from "dotenv";
dotenv.config();

import dbConnect from "./utils/dbConnect";
import logger from "./utils/logger";

const app = express();

app.use(express.json());

dbConnect();

const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
  logger.info(`Server Started at http://localhost:${PORT}`);
});
