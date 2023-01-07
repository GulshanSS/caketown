import { UpdateQuery } from "mongoose";
import { ISlider, SliderDoc } from "../interfaces/slider.interface";
import SliderModel from "../models/slider.model";
import {
  createResource,
  deleteResource,
  getAllResources,
  getResourceById,
  updateResource,
} from "../utils/service.factory";

export const getAllSliders = () => getAllResources(SliderModel);

export const getSliderById = (sliderId: string) =>
  getResourceById(SliderModel, sliderId);

export const createSlider = (createSliderInput: ISlider) =>
  createResource(SliderModel, createSliderInput);

export const updateSlider = (
  updateSliderInput: UpdateQuery<SliderDoc>,
  sliderId: string
) => updateResource(SliderModel, updateSliderInput, sliderId);

export const deleteSlider = (sliderId: string) =>
  deleteResource(SliderModel, sliderId);
