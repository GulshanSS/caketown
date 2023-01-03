import { object, string, boolean, TypeOf } from "zod";

const payload = {
  body: object({
    name: string({
      required_error: "AddOn Category name is required",
    }).min(1, { message: "AddOn Category cannot be empty" }),
    status: boolean().optional(),
  }),
};

const params = {
  params: object({
    addOnCategoryId: string({
      required_error: "AddOn Category Id is required",
    }),
  }),
};

export const createAddOnCategorySchema = object({ ...payload });

export const updateAddOnCategorySchema = object({ ...payload, ...params });

export const deleteAddOnCategorySchema = object({ ...params });

export const getAddOnCategorySchema = object({ ...params });

export type CreateAddOnCategoryInput = TypeOf<typeof createAddOnCategorySchema>;
export type UpdateAddOnCategoryInput = TypeOf<typeof updateAddOnCategorySchema>;
export type DeleteAddOnCategoryInput = TypeOf<typeof deleteAddOnCategorySchema>;
export type GetAddOnCategoryInput = TypeOf<typeof getAddOnCategorySchema>;
