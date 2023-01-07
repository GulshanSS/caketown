import { object, string, boolean, TypeOf } from "zod";

const createPayload = {
  body: object({
    username: string({
      required_error: "Username is required",
    }).min(1, { message: "Username cannot be empty" }),
    password: string({
      required_error: "Password is required",
    }).min(1, { message: "Passwoed cannot be empty" }),
    role: string({
      required_error: "Role is required",
    }).min(1, { message: "Role cannot be empty" }),
    status: boolean().optional(),
  }),
};

const updatePayload = {
  body: object({
    username: string()
      .min(1, { message: "Username cannot be empty" })
      .optional(),
    password: string()
      .min(1, { message: "Passwoed cannot be empty" })
      .optional(),
    role: string().min(1, { message: "Role cannot be empty" }).optional(),
    status: boolean().optional(),
  }),
};

const loginPayload = {
  body: object({
    username: string({
      required_error: "Username is required",
    }).min(1, { message: "Username cannot be empty" }),
    password: string({
      required_error: "Password is required",
    }).min(1, { message: "Passwoed cannot be empty" }),
  }),
};

const params = {
  params: object({
    adminUserId: string({
      required_error: "User Id is required",
    }),
  }),
};

export const createAdminUserSchema = object({ ...createPayload });

export const updateAdminUserSchema = object({ ...updatePayload, ...params });

export const deleteAdminUserSchema = object({ ...params });

export const getAdminUserSchema = object({ ...params });

export const loginAdminUserSchema = object({ ...loginPayload });

export type CreateAdminUserInput = TypeOf<typeof createAdminUserSchema>;
export type UpdateAdminUserInput = TypeOf<typeof updateAdminUserSchema>;
export type DeleteAdminUserInput = TypeOf<typeof deleteAdminUserSchema>;
export type GetAdminUserInput = TypeOf<typeof getAdminUserSchema>;
export type LoginAdminUserInput = TypeOf<typeof loginAdminUserSchema>;
