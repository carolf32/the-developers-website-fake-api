import { Router } from "express";
import { container } from "tsyringe";
import { CommentServices } from "../services/comment.services";
import { CommentController } from "../controllers/comment.controller";
import { IsUserIdValid } from "../middlewares/isUserIdValid.middeware";
import { IsCommentIdValid } from "../middlewares/isCommentIdValid.middleware";
import { ValidateToken } from "../middlewares/validateToken.middleware";

export const commentRouter = Router();

container.registerSingleton("CommentServices", CommentServices);
const commentController = container.resolve(CommentController);

commentRouter.post(
  "/devs/:devId/comments",
  ValidateToken.execute,
  async (req, res) => await commentController.createComment(req, res)
);
commentRouter.get(
  "/devs/:devId/comments",
  async (req, res) => await commentController.getCommentByDev(req, res)
);
commentRouter.delete(
  "/devs/:devId/comments/:commentId",
  ValidateToken.execute,
  IsUserIdValid.execute,
  IsCommentIdValid.execute,
  async (req, res) => await commentController.removeComment(req, res)
);
