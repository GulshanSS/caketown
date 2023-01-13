import express from "express";
import {
  getRefreshTokenHandler,
  getTokenHandler,
} from "../controllers/admin.auth.controller";
import validateResource from "../middlewares/validateResource";
import { loginAdminUserSchema } from "../schemas/admin.user.schema";

const AdminAuthRouter = express.Router();

AdminAuthRouter.post(
  "/token",
  validateResource(loginAdminUserSchema),
  getTokenHandler
);

AdminAuthRouter.get("/refreshtoken", getRefreshTokenHandler);

export default AdminAuthRouter;
