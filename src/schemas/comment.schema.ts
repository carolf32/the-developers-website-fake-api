import { z } from "zod";

export const commentSchema = z.object({
  id: z.number().positive(),
  content: z.string().min(1).max(500),
  createdAt: z.date(),
  updatedAt: z.date(),
  devId: z.number().positive().min(1).max(4),
  userId: z.number().positive(),
});

export const commentCreateSchema = commentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

//interfaces/types
export type TComment = z.infer<typeof commentSchema>;
export type TCommentCreate = z.infer<typeof commentCreateSchema>;
