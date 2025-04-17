import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { UserService } from "../services/user.services";

@injectable()
export class UserController {
  constructor(@inject("UserService") private userService: UserService) {}

  async getUser(req: Request, res: Response) {
    const user = await this.userService.getUser(req.params.id);
    res.status(200).json(user);
  }

  async getAllUsers(req: Request, res: Response) {
    const users = await this.userService.getAllUsers();
    res.status(200).json(users);
  }

  async createUser(req: Request, res: Response) {
    const user = await this.userService.createUser(req.body);
    res.status(201).json(user);
  }
  async loginUser(req: Request, res: Response) {
    const user = await this.userService.loginUser(req.body);
    res.status(200).json(user);
  }

  async deleteUser(req: Request, res: Response) {
    await this.userService.deleteUser(req.params.id);
    res.status(204).json();
  }
  async updateUser(req: Request, res: Response) {
    const user = await this.userService.updateUser(req.params.id, req.body);
    res.status(200).json(user);
  }
}
