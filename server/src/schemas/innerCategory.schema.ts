import { object, string, boolean, array, TypeOf } from "zod";

const payload = {
  body: object({
    name: string({
      required_error: "Inner Category name is required",
    }).min(1, { message: "Inner Category name cannot be empty" }),
    category: string().optional(),
    subCategory: string().optional(),
    assets: array(string()).optional(),
    showInHome: boolean().optional(),
    showInSearch: boolean().optional(),
    status: boolean().optional(),
  }),
};

const params = {
  params: object({
    innerCategoryId: string({
      required_error: "Inner Category Id is required",
    }),
  }),
};

export const createInnerCategorySchema = object({ ...payload });

export const updateInnerCategorySchema = object({ ...payload, ...params });

export const deleteInnerCategorySchema = object({ ...params });

export const getInnerCategorySchema = object({ ...params });

export type CreateInnerCategoryInput = TypeOf<typeof createInnerCategorySchema>;
export type UpdateInnerCategoryInput = TypeOf<typeof updateInnerCategorySchema>;
export type DeleteInnerCategoryInput = TypeOf<typeof deleteInnerCategorySchema>;
export type GetInnerCategoryInput = TypeOf<typeof getInnerCategorySchema>;
