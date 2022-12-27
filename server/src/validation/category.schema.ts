import { object, number, string, array, boolean, TypeOf } from "zod";

const payload = {
  body: object({
    name: string({
      required_error: "Category name is required",
    }),
    assetDetails: Object({
      displayAssetId: string(),
      assets: array(string()),
    }),
    showInHome: boolean(),
    showInSearch: boolean(),
    status: boolean(),
  }),
};

const CreateCategorySchema = object({ ...payload });

export type CreateCategoryInput = TypeOf<typeof CreateCategorySchema>;
