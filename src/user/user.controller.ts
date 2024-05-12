import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';

import { USER_INV } from '../common/utils/inversifyConstants';

import UserService from './user.service';
import { AddContactValidation } from './dtos/add-contact.validation';
import { validateBody } from '../common/utils/validateBody';
import { RemoveContactValidation } from './dtos/remove-contact.validation';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from './dtos/user-response.dto';

// import { JwtAuth } from '../common/decorators/jwt-auth.decorator';

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
    const body = parseInt(req.params.id || '-1');

    //validate logic

    const data = await this.userService.getUserById(body);

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

  // @JwtAuth()
  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    const data = await this.userService.getAllUsers();

    return res.status(StatusCodes.OK).json(data);
  }

  async addContact(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    //validate logic

    await validateBody(req.body, AddContactValidation);

    const data = await this.userService.addContact(body);

    return res.status(StatusCodes.OK).json(data);
  }

  async removeContact(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    //validate logic

    await validateBody(body, RemoveContactValidation);

    const data = await this.userService.removeContact(body);

    return res.status(StatusCodes.OK).json(data);
  }

  async searchByNameAndEmail(req: Request, res: Response, next: NextFunction) {
    const encodedSearchTerm = req.query.searchTerm as string;
    const searchTerms = decodeURIComponent(encodedSearchTerm).split(' ');

    //validate logic

    const data = await this.userService.searchByNameAndEmail(searchTerms);

    return res.status(StatusCodes.OK).json(data);
  }

  //---RecSys---
  async addRecSysUsers(req: Request, res: Response, next: NextFunction) {
    const recSysUsers = await this.userService.addRecSysUsers();

    const data = plainToInstance(UserResponseDto, recSysUsers);

    return res.status(StatusCodes.CREATED).json(data);
  }
}

export default UserController;
