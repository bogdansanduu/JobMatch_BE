import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';

import { USER_INV } from '../common/utils/inversifyConstants';

import { User } from './entities/user.entity';
import UserService from './user.service';

@injectable()
export class UserController {
  private readonly userService: UserService;

  constructor(
    @inject(USER_INV.UserService)
    userService: UserService
  ) {
    this.userService = userService;
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    //validate logic

    const data = await this.userService.createUser(body);

    return res.status(StatusCodes.CREATED).json(data);
  }
  async getUser(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    //validate logic

    const data: User = await this.userService.getUser(body);

    return res.status(StatusCodes.OK).json(data);
  }
  async updateUser(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    const id = req.params.id || '-1';

    //validate logic

    const data = await this.userService.updateUser(parseInt(id), body);

    return res.status(StatusCodes.OK).json(data);
  }
  async deleteUser(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id || '-1';

    //validate logic

    await this.userService.deleteUser(parseInt(id));

    return res.status(StatusCodes.NO_CONTENT).send();
  }
  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    const data = await this.userService.getAllUsers();

    return res.status(StatusCodes.OK).json(data);
  }
}

export default UserController;
