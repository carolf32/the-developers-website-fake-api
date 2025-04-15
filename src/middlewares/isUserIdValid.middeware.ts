import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { appError } from "../errors/appError";

export class IsUserIdValid {
  static async execute(req: Request, res: Response, next: NextFunction) {
    const userId = req.user?.id;

    if (!userId) {
      throw new appError(400, "User ID is required");
    }

    try {
      const user = await prisma.user.findUnique({
        where: { id: Number(userId) },
      });

      if (!user) {
        throw new appError(404, "User not found");
      }
      next();
    } catch {
      throw new appError(500, "Internal server error");
    }

    next();
  }
}
