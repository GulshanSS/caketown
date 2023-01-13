import express from "express";
import {
  createAddOnCategoryHandler,
  deleteAddOnCategoryHandler,
  getAddOnCategoryByIdHandler,
  getAllAddOnCategoriesHandler,
  updateAddOnCategoryHandler,
} from "../controllers/addOnCategory.controller";
import validateResource from "../middlewares/validateResource";
import {
  createAddOnCategorySchema,
  deleteAddOnCategorySchema,
  getAddOnCategorySchema,
  updateAddOnCategorySchema,
} from "../schemas/addOnCategory.schema";

const AddOnCategoryRouter = express.Router();

AddOnCategoryRouter.get("/", getAllAddOnCategoriesHandler);

AddOnCategoryRouter.get(
  "/:addOnCategoryId",
  validateResource(getAddOnCategorySchema),
  getAddOnCategoryByIdHandler
);

AddOnCategoryRouter.post(
  "/create",
  validateResource(createAddOnCategorySchema),
  createAddOnCategoryHandler
);

AddOnCategoryRouter.put(
  "/:addOnCategoryId/update",
  validateResource(updateAddOnCategorySchema),
  updateAddOnCategoryHandler
);

AddOnCategoryRouter.delete(
  "/:addOnCategoryId/delete",
  validateResource(deleteAddOnCategorySchema),
  deleteAddOnCategoryHandler
);

export default AddOnCategoryRouter;
