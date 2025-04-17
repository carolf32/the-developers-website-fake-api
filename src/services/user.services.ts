import { prisma } from "../database/prisma";
import { appError } from "../errors/appError";
import {
  TUserCreate,
  TUserLogin,
  TUserUpdate,
  userReturnSchema,
} from "../schemas/user.schema";
import jwt from "jsonwebtoken";
import { injectable } from "tsyringe";

@injectable()
export class UserService {
  async getUser(id: string) {
    const userId = Number(id);
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new appError(404, "User not found");
    }

    return userReturnSchema.parse(user);
  }

  async getAllUsers() {
    const users = await prisma.user.findMany();
    return users.map((user) => userReturnSchema.parse(user));
  }

  async createUser(body: TUserCreate) {
    const userExists = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (userExists) {
      throw new appError(404, "User already exists");
    }

    const newUser = {
      ...body,
    };

    const user = await prisma.user.create({ data: newUser });
    return userReturnSchema.parse(user);
  }

  async loginUser(body: TUserLogin) {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      throw new appError(404, "User not found");
    }

    if (user.password !== body.password) {
      throw new appError(404, "Email or password invalid");
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET as string
    );

    return { acessToken: token, user: userReturnSchema.parse(user) };
  }

  async deleteUser(id: string) {
    const userId = Number(id);
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new appError(404, "User not found");
    }

    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }

  async updateUser(id: string, body: TUserUpdate) {
    const userId = Number(id);
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new appError(404, "User not found");
    }

    const userUpdated = await prisma.user.update({
      where: {
        id: userId,
      },
      data: body,
    });

    return userReturnSchema.parse(userUpdated);
  }
}
