import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { container } from "tsyringe";
import { UserService } from "../services/user.services";
import { userCreateSchema, userLoginSchema } from "../schemas/user.schema";
import { ValidateBody } from "../middlewares/validateBody.middleware";
import { ValidateToken } from "../middlewares/validateToken.middleware";

export const userRouter = Router();

container.registerSingleton("UserService", UserService);
const userController = container.resolve(UserController);

userRouter.get("/:id", ValidateToken.execute, (req, res) =>
  userController.getUser(req, res)
);

userRouter.get("/", ValidateToken.execute, (req, res) =>
  userController.getAllUsers(req, res)
);

userRouter.post(
  "/register",
  ValidateBody.execute(userCreateSchema),
  (req, res) => userController.createUser(req, res)
);
userRouter.post(
  "/login",

  ValidateBody.execute(userLoginSchema),
  (req, res) => userController.loginUser(req, res)
);
userRouter.delete("/:id", ValidateToken.execute, (req, res) =>
  userController.deleteUser(req, res)
);
userRouter.patch("/:id", ValidateToken.execute, (req, res) =>
  userController.updateUser(req, res)
);
