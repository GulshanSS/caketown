import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { LoginAdminUserInput } from "../schemas/admin.user.schema";
import { getAdminUser } from "../services/admin.user.service";
import { generateToken, verifyToken } from "../utils/jwt";
import { TOKEN } from "../config/constants.config";

export const getTokenHandler = async (
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
    const payload = {
      _id: adminUser._id,
      username: adminUser.username,
      roles: adminUser.roles,
    };
    const accesstoken = generateToken(payload, {
      expiresIn: TOKEN.ACCESS_TTL,
      algorithm: TOKEN.JWT_ALGORITHM,
    });
    const refreshToken = generateToken(payload, {
      expiresIn: TOKEN.REFRESH_TTL,
      algorithm: TOKEN.JWT_ALGORITHM,
    });
    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      accesstoken,
      refreshToken,
    });
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};

export const getRefreshTokenHandler = async (req: Request, res: Response) => {
  const refreshtoken = req.headers["x-refresh"] as string;
  if (!refreshtoken) {
    return res.status(401).json({ message: "Login to continue" });
  }
  const { decoded, expired } = verifyToken(refreshtoken);
  if (expired) {
    return res.status(401).json({ message: "Login to continue" });
  }
  const payload = {
    _id: decoded!._id || "",
    username: decoded!.username || "",
    roles: decoded!.roles || [],
  };
  const newAccessToken = generateToken(payload, {
    expiresIn: TOKEN.ACCESS_TTL,
    algorithm: TOKEN.JWT_ALGORITHM,
  });
  return res.status(200).json({ succes: true, newAccessToken });
};
