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

  async register(req: Request, res: Response, next: NextFunction) {
    const { firstName, lastName, email, password } = req.body; // Assuming email and pass are sent in the request body

    //validate logic

    const response = await this.authService.register(firstName, lastName, email, password);

    res.status(StatusCodes.CREATED).json(response);
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body; // Assuming email and pass are sent in the request body

    //validate logic

    const { user, accessToken, refreshToken } = await this.authService.login(email, password);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: false,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });
    return res.status(StatusCodes.OK).json({
      user,
      accessToken,
    });
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(StatusCodes.NO_CONTENT).send();
    }

    await this.authService.logout(refreshToken);

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
    });

    return res.status(StatusCodes.NO_CONTENT).send();
  }

  async refreshAccessToken(req: Request, res: Response, next: NextFunction) {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(StatusCodes.UNAUTHORIZED).send();
    }

    const { user, accessToken } = await this.authService.refreshAccessToken(refreshToken);

    return res.status(StatusCodes.OK).json({
      user,
      accessToken,
    });
  }
}
