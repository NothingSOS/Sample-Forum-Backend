import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send();

  const tokenParts = authHeader.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") return res.status(401).send();

  try {
    const info = jwt.verify(tokenParts[1], process.env.JWT_SECRET ?? "");
    req.body.userId = (info as JwtPayload).id ?? "";
    next();
  } catch (e: any) {
    if (e instanceof JsonWebTokenError) return res.status(401).send();
    return res.status(500).send();
  }
};

export default verifyToken;
