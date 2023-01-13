import { object, string, array, boolean, TypeOf } from "zod";

const payload = {
  body: object({
    name: string({
      required_error: "Slider name is required",
    }).min(1, { message: "Slider name cannot be empty" }),
    assets: array(string()).optional(),
    category: string().optional(),
    subCategory: string().optional(),
    innerCategory: string().optional(),
    status: boolean().optional(),
  }),
};

const params = {
  params: object({
    sliderId: string({
      required_error: "Slider Id is required",
    }),
  }),
};

export const createSliderSchema = object({ ...payload });

export const updateSliderSchema = object({ ...payload, ...params });

export const deleteSliderSchema = object({ ...params });

export const getSliderSchema = object({ ...params });

export type CreateSliderInput = TypeOf<typeof createSliderSchema>;
export type UpdateSliderInput = TypeOf<typeof updateSliderSchema>;
export type DeleteSliderInput = TypeOf<typeof deleteSliderSchema>;
export type GetSliderInput = TypeOf<typeof getSliderSchema>;
