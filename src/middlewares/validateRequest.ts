import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validateRequest = (querySchema: AnyZodObject | null, paramsSchema: AnyZodObject | null, bodySchema: AnyZodObject | null) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    querySchema?.parse(req.query);
    paramsSchema?.parse(req.params);
    bodySchema?.parse(req.body);
    return next();
  } catch (_error) {
    return res.status(400).send();
  }
};

export default validateRequest;
