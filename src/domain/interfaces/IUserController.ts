import { Request, Response } from "express";

export interface IUserController {
  //   createUser(req: Request, res: Response): Promise<void>;
  updateName(req: Request, res: Response): Promise<void>;
  updateEmail(req: Request, res: Response): Promise<void>;
  updateAvatar(req: Request, res: Response): Promise<void>;
}
