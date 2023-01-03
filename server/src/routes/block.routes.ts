import express from "express";
import uploader from "../config/multer.config";
import {
  createBlockHandler,
  deleteBlockHandler,
  getAllBlockHandler,
  getBlockByIdHandler,
  updateBlockHandler,
} from "../controllers/block.controller";
import validateResource from "../middlewares/validateResource";
import {
  createBlockSchema,
  deleteBlockSchema,
  getBlockSchema,
  updateBlockSchema,
} from "../schemas/block.schema";

const BlockRouter = express.Router();

BlockRouter.get("/", getAllBlockHandler);

BlockRouter.get(
  "/:blockId",
  validateResource(getBlockSchema),
  getBlockByIdHandler
);

BlockRouter.post(
  "/create",
  [uploader.array("files"), validateResource(createBlockSchema)],
  createBlockHandler
);

BlockRouter.put(
  "/:blockId/update",
  [uploader.array("files"), validateResource(updateBlockSchema)],
  updateBlockHandler
);

BlockRouter.delete(
  "/:blockId/delete",
  validateResource(deleteBlockSchema),
  deleteBlockHandler
);

export default BlockRouter;
