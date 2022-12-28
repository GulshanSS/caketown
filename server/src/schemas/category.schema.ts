import { object, string, array, boolean, TypeOf } from "zod";

const payload = {
  body: object({
    name: string({
      required_error: "Category name is required",
    }).min(1, { message: "Category name cannot be empty" }),
    assets: array(string()).optional(),
    showInHome: boolean().optional(),
    showInSearch: boolean().optional(),
    status: boolean().optional(),
  }),
};

const params = {
  params: object({
    categoryId: string({
      required_error: "Category Id is required",
    }).min(1, { message: "Category Id cannot be empty " }),
  }),
};

export const createCategorySchema = object({ ...payload });

export const updateCategorySchema = object({
  ...payload,
  ...params,
});

export const deleteCategorySchema = object({ ...params });

export const getCategorySchema = object({ ...params });

export type CreateCategoryInput = TypeOf<typeof createCategorySchema>;
export type UpdateCategoryInput = TypeOf<typeof updateCategorySchema>;
export type DeleteCategoryInput = TypeOf<typeof deleteCategorySchema>;
export type GetCategoryInput = TypeOf<typeof getCategorySchema>;
