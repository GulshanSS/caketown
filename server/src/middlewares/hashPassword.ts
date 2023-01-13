import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../config/constants.config";

const hashPassword =
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const password = req.body.password;
      if (typeof password !== undefined && password !== "") {
        req.body.password = await bcrypt.hash(password, SALT_ROUNDS);
      }
      next();
    } catch (e: any) {
      return res.status(409).json(e.message);
    }
  };

export default hashPassword;
