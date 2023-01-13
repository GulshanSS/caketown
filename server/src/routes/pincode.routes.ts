import express from "express";
import {
  createPincodeHandler,
  deletePincodeHandler,
  getAllPincodesHandler,
  getPincodeByIdHandler,
  updatePincodeHandler,
} from "../controllers/pincode.controller";
import validateResource from "../middlewares/validateResource";
import {
  createPincodeSchema,
  deletePincodeSchema,
  getPincodeSchema,
  updatePincodeSchema,
} from "../schemas/pincode.schema";

const PincodeRouter = express.Router();

PincodeRouter.get("/", getAllPincodesHandler);

PincodeRouter.get(
  "/:pincodeId",
  validateResource(getPincodeSchema),
  getPincodeByIdHandler
);

PincodeRouter.post(
  "/create",
  validateResource(createPincodeSchema),
  createPincodeHandler
);

PincodeRouter.put(
  "/:pincodeId/update",
  validateResource(updatePincodeSchema),
  updatePincodeHandler
);

PincodeRouter.delete(
  "/:pincodeId/delete",
  validateResource(deletePincodeSchema),
  deletePincodeHandler
);

export default PincodeRouter;
