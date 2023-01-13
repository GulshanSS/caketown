import { object, string, number, boolean, TypeOf } from "zod";

const payload = {
  body: object({
    pincode: number({
      required_error: "Pincode is required",
    }).min(6),
    cityName: string({
      required_error: "City name is required",
    }).min(1, { message: "City name cannot be empty" }),
    deliveryOptions: object({
      express: object({
        charge: number(),
        cashOnDelivery: boolean(),
        status: boolean(),
      }),
      nextDay: object({
        charge: number(),
        cashOnDelivery: boolean(),
        status: boolean(),
      }),
      courierDay: object({
        charge: number(),
        cashOnDelivery: boolean(),
        status: boolean(),
      }),
    }).optional(),
    status: boolean().optional(),
  }),
};

const params = {
  params: object({
    pincodeId: string({
      required_error: "Pincode Id is required",
    }),
  }),
};

export const createPincodeSchema = object({ ...payload });

export const updatePincodeSchema = object({ ...params, ...payload });

export const deletePincodeSchema = object({ ...params });

export const getPincodeSchema = object({ ...params });

export type CreatePincodeInput = TypeOf<typeof createPincodeSchema>;
export type UpdatePincodeInput = TypeOf<typeof updatePincodeSchema>;
export type DeletePincodeInput = TypeOf<typeof deletePincodeSchema>;
export type GetPincodeInput = TypeOf<typeof getPincodeSchema>;
