import express, { Request, Response } from "express";
import uploader from "../config/multer.config";
const CategoryRouter = express.Router();

import {
  createCategoryHandler,
  getAllCategoryHandler,
  getCategoryByIdHandler,
} from "../controller/category.controller";

CategoryRouter.get("/", getAllCategoryHandler);

CategoryRouter.get("/:categoryId", getCategoryByIdHandler);

CategoryRouter.post("/create", uploader.array("files"), createCategoryHandler);

export default CategoryRouter;
