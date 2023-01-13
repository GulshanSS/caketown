import { object, string, number, array, boolean, TypeOf } from "zod";

const payload = {
  body: object({
    name: string({
      required_error: "Product name is required",
    }),
    category: string().optional(),
    subCategory: string().optional(),
    innerCategory: string().optional(),
    message: object({
      onCake: boolean(),
      onCard: boolean(),
    }).optional(),
    productMake: array(
      object({
        name: string(),
        price: number(),
      })
    ).optional(),
    flavours: array(
      object({
        name: string(),
        price: number(),
      })
    ).optional(),
    sizesAvailable: array(
      object({
        size: number(),
        price: object({
          actual: number(),
          selling: number(),
        }),
      })
    ).min(1, { message: "Atlease one size should be mentioned" }),
    photoCake: boolean().optional(),
    assets: array(string()).optional(),
    bestSeller: boolean().optional(),
    deliveryOptions: object({
      pincodes: array(string()).min(1, "Atleast 1 pincode should be mentioned"),
    }),
    note: string().optional(),
    description: string().optional(),
    reviews: array(string()).optional(),
    rating: number().optional(),
    status: boolean().optional(),
  }),
};

const params = {
  params: object({
    productId: string({
      required_error: "Product Id is required",
    }),
  }),
};

export const createProductSchema = object({ ...payload });

export const updateProductSchema = object({ ...params, ...payload });

export const getProductSchema = object({ ...params });

export const deleteProductSchema = object({ ...params });

export type CreateProductInput = TypeOf<typeof createProductSchema>;
export type UpadateProductInput = TypeOf<typeof updateProductSchema>;
export type GetProductInput = TypeOf<typeof getProductSchema>;
export type DeleteProductInput = TypeOf<typeof deleteProductSchema>;
