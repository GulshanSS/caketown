import express from "express";

import dotenv from "dotenv";
dotenv.config();

import { PORT } from "./config/constants.config";

import dbConnect from "./config/db.config";
import logger from "./config/logger.config";
import CategoryRouter from "./routes/category.routes";
import SubCategoryRouter from "./routes/subCategory.routes";
import InnerCategoryRouter from "./routes/innerCategory.routes";

const app = express();

app.use(express.json());

dbConnect();

app.use("/category", CategoryRouter);
app.use("/subcategory", SubCategoryRouter);
app.use("/innerCategory", InnerCategoryRouter);

app.listen(PORT, () => {
  logger.info(`Server Started at http://localhost:${PORT}`);
});
