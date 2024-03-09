import AuthService from './auth.service';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { AUTH_INV } from '../common/utils/inversifyConstants';

@injectable()
export class AuthController {
  private readonly authService: AuthService;

  constructor(
    @inject(AUTH_INV.AuthService)
    authService: AuthService
  ) {
    this.authService = authService;
  }

  async signIn(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body; // Assuming email and pass are sent in the request body

    //validate logic

    const response = await this.authService.signIn(email, password);

    res.status(StatusCodes.OK).json(response);
  }
}
