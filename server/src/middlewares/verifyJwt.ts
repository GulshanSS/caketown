import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export const verifyJwt = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.headers.authorization as string;
  if (!accessToken && accessToken.split(" ")[0] !== "Bearer") {
    return res.status(401).json({ message: "Login to continue" });
  }
  const { decoded, expired, valid } = verifyToken(
    accessToken.split(" ")[1]
  );
  if (expired) {
    return res.status(401).json({
      message: "Access token expired",
      valid: valid,
    });
  }
  res.locals.user = decoded;
  next();
};
