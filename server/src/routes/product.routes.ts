import express from "express";
import uploader from "../config/multer.config";
import {
  createProductHandler,
  deleteProductHandler,
  getAllProductsHandler,
  getProductByIdHandler,
  updateProductHandler,
} from "../controllers/product.controller";
import validateResource from "../middlewares/validateResource";
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from "../schemas/product.schema";

const ProductRouter = express.Router();

ProductRouter.get("/", getAllProductsHandler);

ProductRouter.get(
  "/:productId",
  validateResource(getProductSchema),
  getProductByIdHandler
);

ProductRouter.post(
  "/create",
  validateResource(createProductSchema),
  createProductHandler
);

ProductRouter.put(
  "/productId",
  [uploader.array("files"), validateResource(updateProductSchema)],
  updateProductHandler
);

ProductRouter.delete(
  "/:productId/delete",
  [uploader.array("files"), validateResource(deleteProductSchema)],
  deleteProductHandler
);

export default ProductRouter;
