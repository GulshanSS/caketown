import express, { Request, Response } from "express";
const CategoryRouter = express.Router();

import {
  createCategoryHandler,
  getAllCategoryHandler,
  getCategoryByIdHandler,
} from "../controller/category.controller";

CategoryRouter.get("/", getAllCategoryHandler);

CategoryRouter.get("/:categoryId", getCategoryByIdHandler);

CategoryRouter.post("/create", createCategoryHandler);

export default CategoryRouter;
