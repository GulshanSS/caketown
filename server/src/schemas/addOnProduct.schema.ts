import { object, string, array, boolean, TypeOf } from "zod";

const payload = {
  body: object({
    name: string({
      required_error: "AddOn Product name is required",
    }).min(1, { message: "AddOn Product name cannot be empty" }),
    description: string({
      required_error: "AddOn Product description is required",
    }).min(1, { message: "AddOn Product description cannot be empty" }),
    addOnCategory: array(string()).optional(),
    assets: array(string()).optional(),
    bestSeller: boolean().optional(),
    status: boolean().optional(),
  }),
};

const params = {
  params: object({
    addOnProductId: string({
      required_error: "AddOn Product Id is required",
    }),
  }),
};

export const createAddOnProductSchema = object({ ...payload });

export const updateAddOnProductSchema = object({ ...payload, ...params });

export const deleteAddOnProductSchema = object({ ...params });

export const getAddOnProductSchema = object({ ...params });

export type CreateAddOnProductInput = TypeOf<typeof createAddOnProductSchema>;
export type UpdateAddOnProductInput = TypeOf<typeof updateAddOnProductSchema>;
export type DeleteAddOnProductInput = TypeOf<typeof deleteAddOnProductSchema>;
export type GetAddOnProductInput = TypeOf<typeof getAddOnProductSchema>;
