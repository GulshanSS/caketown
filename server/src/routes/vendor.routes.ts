import express from "express";
import {
  createVendorHandler,
  deleteVendorHandler,
  getAllVendorsHandler,
  getVendorByIdHandler,
  updateVendorHandler,
} from "../controllers/vendor.controller";
import validateResource from "../middlewares/validateResource";
import {
  createVendorSchema,
  deleteVendorSchema,
  getVendorSchema,
  updateVendorSchema,
} from "../schemas/vendor.schema";

const VendorRouter = express.Router();

VendorRouter.get("/", getAllVendorsHandler);

VendorRouter.get(
  "/:vendorId",
  validateResource(getVendorSchema),
  getVendorByIdHandler
);

VendorRouter.post(
  "/create",
  validateResource(createVendorSchema),
  createVendorHandler
);

VendorRouter.put(
  "/:vendorId/update",
  validateResource(updateVendorSchema),
  updateVendorHandler
);

VendorRouter.delete(
  "/:vendorId/delete",
  validateResource(deleteVendorSchema),
  deleteVendorHandler
);

export default VendorRouter;
