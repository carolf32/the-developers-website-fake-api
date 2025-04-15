import { injectable } from "tsyringe";
import { prisma } from "../database/prisma";
import { TComment, TCommentCreate } from "../schemas/comment.schema";

@injectable()
export class CommentServices {
  async createComment(data: TCommentCreate) {
    const newComment: TComment = await prisma.comment.create({ data });
    return newComment;
  }

  async getCommentByDev(devId: number) {
    const data = await prisma.comment.findMany({
      where: {
        devId: Number(devId),
      },
      include: {
        user: true,
      },
    });
    return data;
  }

  async removeComment(id: number) {
    await prisma.comment.delete({
      where: {
        id,
      },
    });
  }
}
