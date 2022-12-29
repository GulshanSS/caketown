import { object, string, array, boolean, TypeOf } from "zod";

const payload = {
  body: object({
    name: string({
      required_error: "Sub Category name is required",
    }).min(1, { message: "Sub Category name cannot be empty" }),
    category: string().optional(),
    assets: array(string()).optional(),
    showInHome: boolean().optional(),
    showInSearch: boolean().optional(),
    status: boolean().optional(),
  }),
};

const params = {
  params: object({
    subCategoryId: string({
      required_error: "Sub Category Id is required",
    }).min(1, { message: "Sub Category Id cannot be empty" }),
  }),
};

export const createSubCategorySchema = object({ ...payload });

export const updateSubCategorySchema = object({
  ...payload,
  ...params,
});

export const deleteSubCategorySchema = object({ ...params });

export const getSubCategorySchema = object({ ...params });

export type CreateSubCategoryInput = TypeOf<typeof createSubCategorySchema>;
export type UpdateSubCategoryInput = TypeOf<typeof updateSubCategorySchema>;
export type DeleteSubCategoryInput = TypeOf<typeof deleteSubCategorySchema>;
export type GetSubCategoryInput = TypeOf<typeof getSubCategorySchema>;
