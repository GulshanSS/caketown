import jwt from "jsonwebtoken";
import { KEY, TOKEN } from "../config/constants.config";

export const generateToken = (payload: Object, options: jwt.SignOptions) => {
  return jwt.sign(payload, KEY.PRIVATE_KEY!, options);
};

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, KEY.PUBLIC_KEY!, {
      algorithms: [TOKEN.JWT_ALGORITHM],
    });
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    return {
      valid: false,
      expired: true,
      decoded: null,
    };
  }
};
