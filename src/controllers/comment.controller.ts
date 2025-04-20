import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { CommentServices } from "../services/comment.services";
import { TCommentCreate } from "../schemas/comment.schema";

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

@injectable()
export class CommentController {
  constructor(
    @inject("CommentServices") private commentService: CommentServices
  ) {}

  async createComment(req: Request, res: Response) {
    const { content } = req.body;
    const { devId } = req.params;

    if (req.user) {
      const userId = req.user.id;

      const newComment: TCommentCreate = {
        content,
        devId: Number(devId),
        userId: userId,
      };

      const createdComment = await this.commentService.createComment(
        newComment
      );
      res.status(201).json(createdComment);
    }
  }
  async getCommentByDev(req: Request, res: Response) {
    const { devId } = req.params;
    const comments = await this.commentService.getCommentByDev(Number(devId));
    res.status(200).json(comments);
  }
  async removeComment(req: Request, res: Response) {
    const { commentId } = req.params;

    await this.commentService.removeComment(Number(commentId));
    res.status(204).json({ message: "Comment deleted" });
  }
}
