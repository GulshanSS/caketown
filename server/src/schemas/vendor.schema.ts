import { string, object, boolean, TypeOf } from "zod";

const payload = {
  body: object({
    name: string({
      required_error: "Name is required",
    }).min(1, { message: "Name cannot be empty" }),
    contact: object({
      email: string({
        required_error: "Email is required",
      }).email({ message: "Not a valid email" }),
      mobileNo: string({
        required_error: "Mobile No. is required",
      }).min(10, { message: "Not a valid mobile number" }),
      alternateNo: string()
        .min(10, {
          message: "Not a valid alternate number",
        })
        .optional(),
      whatsAppNo: string({
        required_error: "Mobile No. is required",
      }).min(10, { message: "Not a valid mobile number" }),
    }),
    status: boolean().optional(),
  }),
};

const params = {
  params: object({
    vendorId: string({
      required_error: "Vendor Id is required",
    }),
  }),
};

export const createVendorSchema = object({ ...payload });

export const updateVendorSchema = object({ ...params, ...payload });

export const getVendorSchema = object({ ...params });

export const deleteVendorSchema = object({ ...params });

export type CreateVendorInput = TypeOf<typeof createVendorSchema>;
export type UpdateVendorInput = TypeOf<typeof updateVendorSchema>;
export type GetVendorInput = TypeOf<typeof getVendorSchema>;
export type DeleteVendorInput = TypeOf<typeof deleteVendorSchema>;
