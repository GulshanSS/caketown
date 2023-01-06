import express from "express";
import {
  createAdminUserHandler,
  deleteAdminUserHandler,
  getAdminUserByIdHandler,
  getAllAdminUsersHandler,
  updateAdminUserHandler,
} from "../controllers/admin.user.controller";
import hashPassword from "../middlewares/hashPassword";
import validateResource from "../middlewares/validateResource";
import {
  getAdminUserSchema,
  createAdminUserSchema,
  updateAdminUserSchema,
  deleteAdminUserSchema,
} from "../schemas/admin.user.schema";

const AdminUserRouter = express.Router();

AdminUserRouter.get("/", getAllAdminUsersHandler);

AdminUserRouter.get(
  "/:adminUserId",
  validateResource(getAdminUserSchema),
  getAdminUserByIdHandler
);

AdminUserRouter.post(
  "/create",
  [validateResource(createAdminUserSchema), hashPassword()],
  createAdminUserHandler
);

AdminUserRouter.put(
  "/:adminUserId/update",
  [validateResource(updateAdminUserSchema), hashPassword()],
  updateAdminUserHandler
);

AdminUserRouter.delete(
  "/:adminUserId/delete",
  validateResource(deleteAdminUserSchema),
  deleteAdminUserHandler
);

export default AdminUserRouter;
