import express, { Request, Response } from "express";
const CategoryRouter = express.Router();

import { getAllCategoryHandler } from "../controller/category.controller";

CategoryRouter.get("/", getAllCategoryHandler);

export default CategoryRouter;
