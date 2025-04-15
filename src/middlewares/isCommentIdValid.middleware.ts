import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { appError } from "../errors/appError";

export class IsCommentIdValid {
  static async execute(req: Request, res: Response, next: NextFunction) {
    const commentId = req.params.commentId;
    const userId = req.user?.id;

    const comment = await prisma.comment.findUnique({
      where: { id: Number(commentId) },
    });

    if (!comment) {
      throw new appError(404, "Comment not found");
    }

    if (comment.userId !== Number(userId)) {
      throw new appError(403, "You are not authorized to delete this comment");
    }

    next();
  }
}
