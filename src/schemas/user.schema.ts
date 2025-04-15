import { z } from "zod";

export const userSchema = z.object({
  id: z.number().positive(),
  name: z.string().min(1).max(50),
  email: z.string().email(),
  password: z.string().min(4),
  createdAt: z.date(),
});

export const userCreateSchema = userSchema.omit({ id: true, createdAt: true });
export const userLoginSchema = userSchema.pick({ email: true, password: true });
export const userUpdateSchema = userSchema
  .partial()
  .omit({ id: true, createdAt: true });
export const userReturnSchema = userSchema.omit({ password: true });

//interfaces/types
export type TUser = z.infer<typeof userSchema>;
export type TUserCreate = z.infer<typeof userCreateSchema>;
export type TUserLogin = z.infer<typeof userLoginSchema>;
export type TUserUpdate = z.infer<typeof userUpdateSchema>;
export type TUserReturn = z.infer<typeof userReturnSchema>;

export type TUserLoginReturn = {
  accessToken: string;
  user: TUserReturn;
};
