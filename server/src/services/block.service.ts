import { UpdateQuery } from "mongoose";
import { BlockDoc, IBlock } from "../interfaces/block.interface";
import BlockModel from "../models/block.model";

export const getAllBlock = async () => {
  try {
    return await BlockModel.find({});
  } catch (e: any) {
    throw new Error(e);
  }
};

export const getBlockById = async (blockId: string) => {
  try {
    return await BlockModel.findOne({ _id: blockId });
  } catch (e: any) {
    throw new Error(e);
  }
};

export const createBlock = async (createBlockInput: IBlock) => {
  try {
    return await BlockModel.create(createBlock);
  } catch (e: any) {
    throw new Error(e);
  }
};

export const updateBlock = async (
  updateBlockInput: UpdateQuery<BlockDoc>,
  blockId: string
) => {
  try {
    return await BlockModel.findOneAndUpdate(
      { _id: blockId },
      updateBlockInput,
      { new: true }
    );
  } catch (e: any) {
    throw new Error(e);
  }
};

export const deleteBlock = async (blockId: string) => {
  try {
    await BlockModel.deleteOne({ _id: blockId });
    return true;
  } catch (e: any) {
    throw new Error(e);
  }
};
