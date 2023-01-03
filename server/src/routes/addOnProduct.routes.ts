import express from "express";
import uploader from "../config/multer.config";
import {
  createAddOnProductHandler,
  deleteAddOnProductHandler,
  getAddOnProductHandler,
  getAllAddOnProductHandler,
  updateAddOnProductHandler,
} from "../controllers/addOnProduct.controller";
import validateResource from "../middlewares/validateResource";
import {
  createAddOnProductSchema,
  deleteAddOnProductSchema,
  getAddOnProductSchema,
  updateAddOnProductSchema,
} from "../schemas/addOnProduct.schema";

const AddOnProductRouter = express.Router();

AddOnProductRouter.get("/", getAllAddOnProductHandler);

AddOnProductRouter.get(
  "/:addOnProductId",
  validateResource(getAddOnProductSchema),
  getAddOnProductHandler
);

AddOnProductRouter.post(
  "/create",
  [uploader.array("files"), validateResource(createAddOnProductSchema)],
  createAddOnProductHandler
);

AddOnProductRouter.put(
  "/:addOnProductId/update",
  [uploader.array("files"), validateResource(updateAddOnProductSchema)],
  updateAddOnProductHandler
);

AddOnProductRouter.delete(
  "/:addOnProductId/delete",
  validateResource(deleteAddOnProductSchema),
  deleteAddOnProductHandler
);

export default AddOnProductRouter;
