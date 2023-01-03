import express from "express";

import dotenv from "dotenv";
dotenv.config();

import { PORT } from "./config/constants.config";

import dbConnect from "./config/db.config";
import logger from "./config/logger.config";
import CategoryRouter from "./routes/category.routes";
import SubCategoryRouter from "./routes/subCategory.routes";
import InnerCategoryRouter from "./routes/innerCategory.routes";
import AddOnCategoryRouter from "./routes/addOnCategory.routes";
import AddOnProductRouter from "./routes/addOnProduct.routes";
import BlockRouter from "./routes/block.routes";
import SliderRouter from "./routes/slider.routes";
import PincodeRouter from "./routes/pincode.routes";

const app = express();

app.use(express.json());

dbConnect();

app.use("/category", CategoryRouter);
app.use("/subcategory", SubCategoryRouter);
app.use("/innercategory", InnerCategoryRouter);
app.use("/addoncategory", AddOnCategoryRouter);
app.use("/addonproduct", AddOnProductRouter);
app.use("/block", BlockRouter);
app.use("/slider", SliderRouter);
app.use("/pincode", PincodeRouter);

app.listen(PORT, () => {
  logger.info(`Server Started at http://localhost:${PORT}`);
});
