import { lookup } from "dns";
import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError, ZodIssue } from "zod";
import logger from "../config/logger.config";

const validateResource =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e: any) {
      if (e instanceof ZodError) {
        let validationErrors = {} as Record<string, string>;
        e.errors?.map(
          (err: ZodIssue) => (validationErrors[err.path[1]] = err.message)
        );
        return res.status(400).json(validationErrors);
      }
      return res.status(409).json(e.message);
    }
  };

export default validateResource;
