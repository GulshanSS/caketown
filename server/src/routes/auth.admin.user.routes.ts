import express from "express";
import { adminUserLoginHandler } from "../controllers/auth.admin.user.controller";
import validateResource from "../middlewares/validateResource";
import { loginAdminUserSchema } from "../schemas/admin.user.schema";

const AuthRouter = express.Router();

AuthRouter.post(
  "/login",
  validateResource(loginAdminUserSchema),
  adminUserLoginHandler
);

export default AuthRouter;
