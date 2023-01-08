import { Request, Response, NextFunction } from "express";

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!res.locals.user.roles) {
      return res.status(401).json({ message: "Not authorized" });
    }
    const result = res.locals.user.roles
      .map((role: string) => roles.includes(role))
      .find((val: boolean) => val === true);
    if (!result) {
      return res.status(401).json({ message: "Not authorized" });
    }
    next();
  };
};
