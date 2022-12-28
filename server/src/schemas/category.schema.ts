import { object, string, array, boolean, TypeOf } from "zod";

const payload = {
  body: object({
    name: string({
      required_error: "Category name is required",
    }).min(1, { message: "Category name cannot be empty" }),
    assetDetails: object({
      displayAssetId: string(),
      assets: array(string()),
    }).optional(),
    showInHome: boolean().optional(),
    showInSearch: boolean().optional(),
    status: boolean().optional(),
  }),
};

export const createCategorySchema = object({ ...payload });

export type CreateCategoryInput = TypeOf<typeof createCategorySchema>;
