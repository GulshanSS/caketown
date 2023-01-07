import { Request, Response } from "express";
import { FOLDER_NAME } from "../config/constants.config";
import IFile from "../interfaces/file.interface";
import {
  CreateBlockInput,
  DeleteBlockInput,
  GetBlockInput,
  UpdateBlockInput,
} from "../schemas/block.schema";
import {
  createBlock,
  deleteBlock,
  getAllBlocks,
  getBlockById,
  updateBlock,
} from "../services/block.service";
import { deleteAssets, uploadAssets } from "../utils/handleAssetPromises";

export const getAllBlocksHandler = async (req: Request, res: Response) => {
  try {
    const blocks = await getAllBlocks();
    if (blocks.length === 0) {
      return res
        .status(200)
        .json({ message: "There are no Blocks to display" });
    }
    return res.status(200).json({ items: blocks.length, blocks });
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};

export const getBlockByIdHandler = async (
  req: Request<GetBlockInput["params"]>,
  res: Response
) => {
  try {
    const blockId = req.params.blockId;
    const block = await getBlockById(blockId);
    if (!block) {
      return res.status(404).json({ message: "Block not found" });
    }
    return res.status(200).json(block);
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};

export const createBlockHandler = async (
  req: Request<{}, {}, CreateBlockInput["body"]>,
  res: Response
) => {
  try {
    const body = req.body;
    body.assets = await uploadAssets(
      req.files as IFile[],
      [],
      FOLDER_NAME.BLOCK,
      body.name
    );
    const block = createBlock({ ...body });
    return res.status(201).json(block);
  } catch (e: any) {
    throw new Error(e);
  }
};

export const updateBlockHandler = async (
  req: Request<UpdateBlockInput["params"], {}, UpdateBlockInput["body"]>,
  res: Response
) => {
  try {
    const blockId = req.params.blockId;
    const oldBlock = await getBlockById(blockId);
    if (!oldBlock) {
      return res.status(404).json({ message: "Block not found" });
    }
    const update = req.body;
    update.assets = await uploadAssets(
      req.files as IFile[],
      oldBlock.assets as string[],
      FOLDER_NAME.BLOCK,
      update.name
    );
    const updatedBlock = await updateBlock({ ...update }, blockId);
    return res.status(201).json(updatedBlock);
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};

export const deleteBlockHandler = async (
  req: Request<DeleteBlockInput["params"]>,
  res: Response
) => {
  try {
    const blockId = req.params.blockId;
    const block = await getBlockById(blockId);
    if (!block) {
      return res.status(404).json({ message: "Block not found" });
    }
    await deleteAssets(block.assets as string[]);
    await deleteBlock(blockId);
    return res.status(200).json({ message: `${block.name} is deleted` });
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};
