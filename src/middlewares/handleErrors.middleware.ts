import { NextFunction, Request, Response } from "express";
import { appError } from "../errors/appError";
import { ZodError } from "zod";
import { JsonWebTokenError } from "jsonwebtoken";

export class handleErrors {
  static execute(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (error instanceof appError) {
      return res.status(error.statusCode).json({
        message: error.message,
      });
    }
    if (error instanceof ZodError) {
      return res.status(403).json(error);
    }
    if (error instanceof JsonWebTokenError) {
      return res.status(403).json({ message: error.message });
    }

    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
