import express from "express";
import uploader from "../config/multer.config";
import {
  createSliderHandler,
  deleteSliderHandler,
  getAllSliderHandler,
  getSliderByIdHandler,
  updateSliderHandler,
} from "../controllers/slider.controller";
import validateResource from "../middlewares/validateResource";
import {
  createSliderSchema,
  deleteSliderSchema,
  getSliderSchema,
  updateSliderSchema,
} from "../schemas/slider.schema";

const SliderRouter = express.Router();

SliderRouter.get("/", getAllSliderHandler);

SliderRouter.get(
  "/:sliderId",
  validateResource(getSliderSchema),
  getSliderByIdHandler
);

SliderRouter.post(
  "/create",
  [uploader.array("files"), validateResource(createSliderSchema)],
  createSliderHandler
);

SliderRouter.put(
  "/:sliderId/update",
  [uploader.array("files"), validateResource(updateSliderSchema)],
  updateSliderHandler
);

SliderRouter.delete(
  "/:sliderId/delete",
  validateResource(deleteSliderSchema),
  deleteSliderHandler
);

export default SliderRouter;
