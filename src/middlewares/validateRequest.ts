import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validateRequest = (requestPart: "body" | "query" | "params", schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse(req[requestPart]);
    return next();
  } catch (_error) {
    return res.status(400).send();
  }
};

export default validateRequest;
