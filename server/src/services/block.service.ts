import { UpdateQuery } from "mongoose";
import { BlockDoc, IBlock } from "../interfaces/block.interface";
import BlockModel from "../models/block.model";
import {
  createResource,
  deleteResource,
  getAllResources,
  getResourceById,
  updateResource,
} from "../utils/service.factory";

export const getAllBlocks = () => getAllResources(BlockModel);

export const getBlockById = (blockId: string) =>
  getResourceById(BlockModel, blockId);

export const createBlock = (createBlockInput: IBlock) =>
  createResource(BlockModel, createBlockInput);

export const updateBlock = (
  updateBlockInput: UpdateQuery<BlockDoc>,
  blockId: string
) => updateResource(BlockModel, updateBlockInput, blockId);

export const deleteBlock = (blockId: string) =>
  deleteResource(BlockModel, blockId);
