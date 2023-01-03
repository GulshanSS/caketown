import { UpdateQuery } from "mongoose";
import { ISlider, SliderDoc } from "../interfaces/slider.interface";
import SliderModel from "../models/slider.model";

export const getAllSlider = async () => {
  try {
    return await SliderModel.find({});
  } catch (e: any) {
    throw new Error(e);
  }
};

export const getSliderById = async (sliderId: string) => {
  try {
    return await SliderModel.findOne({ _id: sliderId });
  } catch (e: any) {
    throw new Error(e);
  }
};

export const createSlider = async (createSliderInput: ISlider) => {
  try {
    return await SliderModel.create(createSlider);
  } catch (e: any) {
    throw new Error(e);
  }
};

export const updateSlider = async (
  updateSliderInput: UpdateQuery<SliderDoc>,
  SliderId: string
) => {
  try {
    return await SliderModel.findOneAndUpdate(
      { _id: SliderId },
      updateSliderInput,
      { new: true }
    );
  } catch (e: any) {
    throw new Error(e);
  }
};

export const deleteSlider = async (sliderId: string) => {
  try {
    await SliderModel.deleteOne({ _id: sliderId });
    return true;
  } catch (e: any) {
    throw new Error(e);
  }
};
