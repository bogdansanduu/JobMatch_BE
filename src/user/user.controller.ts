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
import { UploadResumeValidation } from './dtos/upload-resume.validation';
import { BanUserValidation } from './dtos/ban-user.validation';

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

    //response logic

    const responseData = plainToInstance(UserResponseDto, data, { excludeExtraneousValues: true });

    return res.status(StatusCodes.CREATED).json(responseData);
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    const body = Number(req.params.id);

    //validate logic

    const data = await this.userService.getUserById(body);

    //response logic

    const responseData = plainToInstance(UserResponseDto, data, { excludeExtraneousValues: true });

    return res.status(StatusCodes.OK).json(responseData);
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    const id = req.params.id || '-1';

    //validate logic

    const data = await this.userService.updateUser(parseInt(id), body);

    //response logic

    const responseData = plainToInstance(UserResponseDto, data, { excludeExtraneousValues: true });

    return res.status(StatusCodes.OK).json(responseData);
  }

  async uploadUserResume(req: Request, res: Response, next: NextFunction) {
    const userId = Number(req.params.id);
    const body = req.body;

    //validate logic

    await validateBody(body, UploadResumeValidation);

    const data = await this.userService.uploadUserResume(userId, body);

    //response logic

    const responseData = plainToInstance(UserResponseDto, data, { excludeExtraneousValues: true });

    return res.status(StatusCodes.OK).json(responseData);
  }

  async deleteUserResume(req: Request, res: Response, next: NextFunction) {
    const userId = Number(req.params.id);

    //validate logic

    const data = await this.userService.deleteUserResume(userId);

    //response logic

    const responseData = plainToInstance(UserResponseDto, data, { excludeExtraneousValues: true });

    return res.status(StatusCodes.OK).json(responseData);
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);

    //validate logic

    await this.userService.deleteUser(id);

    return res.status(StatusCodes.NO_CONTENT).send();
  }

  // @JwtAuth()
  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    const isBanned = req.query.banned === 'true';

    console.log(isBanned);

    const data = await this.userService.getAllUsers(isBanned);

    //response logic

    const responseData = plainToInstance(UserResponseDto, data, { excludeExtraneousValues: true });

    return res.status(StatusCodes.OK).json(responseData);
  }

  async addContact(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    //validate logic

    await validateBody(req.body, AddContactValidation);

    const data = await this.userService.addContact(body);

    //response logic

    const responseData = plainToInstance(UserResponseDto, data, { excludeExtraneousValues: true });

    return res.status(StatusCodes.OK).json(responseData);
  }

  async removeContact(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    //validate logic

    await validateBody(body, RemoveContactValidation);

    const data = await this.userService.removeContact(body);

    //response logic

    const responseData = plainToInstance(UserResponseDto, data, { excludeExtraneousValues: true });

    return res.status(StatusCodes.OK).json(responseData);
  }

  async searchByNameAndEmail(req: Request, res: Response, next: NextFunction) {
    const encodedSearchTerm = req.query.searchTerm as string;
    const searchTerms = decodeURIComponent(encodedSearchTerm).split(' ');

    //validate logic

    const data = await this.userService.searchByNameAndEmail(searchTerms);

    //response logic

    const responseData = plainToInstance(UserResponseDto, data, { excludeExtraneousValues: true });

    return res.status(StatusCodes.OK).json(responseData);
  }

  async banUser(req: Request, res: Response, next: NextFunction) {
    const userId = Number(req.params.id);
    const body = req.body;

    //validate logic

    await validateBody(body, BanUserValidation);

    const data = await this.userService.banUser(userId, body.banned);

    //response logic

    const responseData = plainToInstance(UserResponseDto, data, { excludeExtraneousValues: true });

    return res.status(StatusCodes.OK).json(responseData);
  }

  //---RecSys---
  async addRecSysUsers(req: Request, res: Response, next: NextFunction) {
    const recSysUsers = await this.userService.addRecSysUsers();

    const data = plainToInstance(UserResponseDto, recSysUsers);

    return res.status(StatusCodes.CREATED).json(data);
  }
}

export default UserController;
