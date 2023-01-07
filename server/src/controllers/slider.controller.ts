import { Request, Response } from "express";
import { FOLDER_NAME } from "../config/constants.config";
import IFile from "../interfaces/file.interface";
import {
  CreateSliderInput,
  DeleteSliderInput,
  GetSliderInput,
  UpdateSliderInput,
} from "../schemas/slider.schema";
import {
  createSlider,
  deleteSlider,
  getAllSliders,
  getSliderById,
  updateSlider,
} from "../services/slider.service";
import { deleteAssets, uploadAssets } from "../utils/handleAssetPromises";

export const getAllSlidersHandler = async (req: Request, res: Response) => {
  try {
    const sliders = await getAllSliders();
    if (sliders.length === 0) {
      return res
        .status(200)
        .json({ message: "There are no Sliders to display" });
    }
    return res.status(200).json({ items: sliders.length, sliders });
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};

export const getSliderByIdHandler = async (
  req: Request<GetSliderInput["params"]>,
  res: Response
) => {
  try {
    const sliderId = req.params.sliderId;
    const slider = await getSliderById(sliderId);
    if (!slider) {
      return res.status(404).json({ message: "Slider not found" });
    }
    return res.status(200).json(slider);
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};

export const createSliderHandler = async (
  req: Request<{}, {}, CreateSliderInput["body"]>,
  res: Response
) => {
  try {
    const body = req.body;
    body.assets = await uploadAssets(
      req.files as IFile[],
      [],
      FOLDER_NAME.SLIDER,
      body.name
    );
    const slider = createSlider({ ...body });
    return res.status(201).json(slider);
  } catch (e: any) {
    throw new Error(e);
  }
};

export const updateSliderHandler = async (
  req: Request<UpdateSliderInput["params"], {}, UpdateSliderInput["body"]>,
  res: Response
) => {
  try {
    const sliderId = req.params.sliderId;
    const oldSlider = await getSliderById(sliderId);
    if (!oldSlider) {
      return res.status(404).json({ message: "Slider not found" });
    }
    const update = req.body;
    update.assets = await uploadAssets(
      req.files as IFile[],
      oldSlider.assets as string[],
      FOLDER_NAME.SLIDER,
      update.name
    );
    const updatedSlider = await updateSlider({ ...update }, sliderId);
    return res.status(201).json(updatedSlider);
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};

export const deleteSliderHandler = async (
  req: Request<DeleteSliderInput["params"]>,
  res: Response
) => {
  try {
    const sliderId = req.params.sliderId;
    const slider = await getSliderById(sliderId);
    if (!slider) {
      return res.status(404).json({ message: "Slider not found" });
    }
    await deleteAssets(slider.assets as string[]);
    await deleteSlider(sliderId);
    return res.status(200).json({ message: `${slider.name} is deleted` });
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};
