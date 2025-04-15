import { NextFunction, Request, Response } from "express";
import { appError } from "../errors/appError";
import jwt, { JwtPayload } from "jsonwebtoken";

interface TokenPayload {
  id: number;
  name: string;
  email: string;
  iat: number;
  exp: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        name: string;
        email: string;
      };
    }
  }
}

export class ValidateToken {
  static execute(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;

    const token = authorization?.replace("Bearer ", "");
    if (!token) {
      throw new appError(403, "Token is required");
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as TokenPayload;

      req.user = {
        id: decoded.id,
        name: decoded.name,
        email: decoded.email,
      };

      return next();
    } catch (error) {
      throw new appError(401, "Invalid token");
    }
  }
}
