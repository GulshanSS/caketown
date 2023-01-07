import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { LoginAdminUserInput } from "../schemas/admin.user.schema";
import { getAdminUser } from "../services/admin.user.service";

export const adminUserLoginHandler = async (
  req: Request<LoginAdminUserInput["body"]>,
  res: Response
) => {
  try {
    const username = req.body.username;
    const adminUser = await getAdminUser({ username });
    if (!adminUser) {
      return res
        .status(404)
        .json({ message: `Admin user with ${username} username not found` });
    }
    const password = req.body.password;
    const isMatch = await bcrypt.compare(password, adminUser.password);
    if (!isMatch) {
      return res.status(409).json({ message: "Incorrect Password" });
    }
    return res.status(200).json({ message: "Logged in successfully" });
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};
