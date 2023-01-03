import { object, string, array, boolean, TypeOf } from "zod";

const payload = {
  body: object({
    name: string({
      required_error: "Block name is required",
    }).min(1, { message: "Block name cannot be empty" }),
    assets: array(string()).optional(),
    category: string().optional(),
    subCategory: string().optional(),
    innerCategory: string().optional(),
    status: boolean().optional(),
  }),
};

const params = {
  params: object({
    blockId: string({
      required_error: "Block Id is required",
    }),
  }),
};

export const createBlockSchema = object({ ...payload });

export const updateBlockSchema = object({ ...payload, ...params });

export const deleteBlockSchema = object({ ...params });

export const getBlockSchema = object({ ...params });

export type CreateBlockInput = TypeOf<typeof createBlockSchema>;
export type UpdateBlockInput = TypeOf<typeof updateBlockSchema>;
export type DeleteBlockInput = TypeOf<typeof deleteBlockSchema>;
export type GetBlockInput = TypeOf<typeof getBlockSchema>;
