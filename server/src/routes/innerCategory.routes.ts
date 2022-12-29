import express from "express";
import uploader from "../config/multer.config";
import {
  createInnerCategoryHandler,
  deleteInnerCategoryHandler,
  getAllInnerCategoryHandler,
  getInnerCategoryByIdHandler,
  updateInnerCategoryHandler,
} from "../controllers/innerCategory.controller";
import validateResource from "../middlewares/validateResource";
import {
  createInnerCategorySchema,
  deleteInnerCategorySchema,
  getInnerCategorySchema,
  updateInnerCategorySchema,
} from "../schemas/innerCategory.schema";
const InnerCategoryRouter = express.Router();

InnerCategoryRouter.get("/", getAllInnerCategoryHandler);

InnerCategoryRouter.get(
  "/:innerCategoryId",
  validateResource(getInnerCategorySchema),
  getInnerCategoryByIdHandler
);

InnerCategoryRouter.post(
  "/create",
  [uploader.array("files"), validateResource(createInnerCategorySchema)],
  createInnerCategoryHandler
);

InnerCategoryRouter.put(
  "/:innerCategoryId/update",
  [uploader.array("files"), validateResource(updateInnerCategorySchema)],
  updateInnerCategoryHandler
);

InnerCategoryRouter.delete(
  "/:innerCategoryId/delete",
  validateResource(deleteInnerCategorySchema),
  deleteInnerCategoryHandler
);

export default InnerCategoryRouter;
