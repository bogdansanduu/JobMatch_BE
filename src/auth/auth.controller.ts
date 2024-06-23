import AuthService from './auth.service';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { AUTH_INV } from '../common/utils/inversifyConstants';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from '../user/dtos/user-response.dto';
import { validateBody } from '../common/utils/validateBody';
import { AdminRegisterValidation, RegisterValidation } from './dtos/register.validation';
import { CreateCompanyValidation } from '../company/dtos/create-company.validation';
import { CompanyResponseDto } from '../company/dtos/company-response.dto';
import { LoginValidation } from './dtos/login.validation';
import { getEnvVar } from '../common/utils/envConfig';
import { JwtAuth } from '../common/decorators/jwt-auth.decorator';
import { RequiresRoles } from '../common/decorators/requires-roles.decorator';
import { Roles } from '../common/constants/user.constants';

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
    const body = req.body;

    //validate logic

    await validateBody(body, RegisterValidation);

    const data = await this.authService.register(body);

    //response logic

    const responseData = plainToInstance(UserResponseDto, data, { excludeExtraneousValues: true });

    return res.status(StatusCodes.CREATED).json(responseData);
  }

  async registerAdmin(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    //validate logic

    await validateBody(body, AdminRegisterValidation);

    const adminSecret = getEnvVar<string>('ADMIN_SECRET_KEY', 'string');

    if (body.secret !== adminSecret) {
      return res.status(StatusCodes.UNAUTHORIZED).send();
    }

    const data = await this.authService.registerAdmin(body);

    //response logic

    const responseData = plainToInstance(UserResponseDto, data, { excludeExtraneousValues: true });

    return res.status(StatusCodes.CREATED).json(responseData);
  }

  @JwtAuth()
  @RequiresRoles([Roles.ADMIN, Roles.USER])
  async registerCompany(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    //validate logic

    await validateBody(body, CreateCompanyValidation);

    const user = await this.authService.registerCompany(body);

    //response logic

    if (!user) {
      return res.status(StatusCodes.CONFLICT).send();
    }

    return res.status(StatusCodes.CREATED).send();
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    //validate logic

    await validateBody({ email, password }, LoginValidation);

    const { user, accessToken, refreshToken } = await this.authService.login(email, password);

    //response logic

    const userDto = plainToInstance(UserResponseDto, user);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: false,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    return res.status(StatusCodes.OK).json({
      user: userDto,
      accessToken,
    });
  }

  async loginCompany(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    //validate logic

    await validateBody({ email, password }, LoginValidation);

    const { company, accessToken, refreshToken } = await this.authService.loginCompany(email, password);

    //response logic

    const companyDto = plainToInstance(CompanyResponseDto, company);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: false,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    return res.status(StatusCodes.OK).json({
      company: companyDto,
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
      sameSite: 'none',
    });

    return res.status(StatusCodes.NO_CONTENT).send();
  }

  async refreshAccessToken(req: Request, res: Response, next: NextFunction) {
    const { refreshToken } = req.cookies;

    //validate logic

    if (!refreshToken) {
      return res.status(StatusCodes.UNAUTHORIZED).send();
    }

    const { user, accessToken } = await this.authService.refreshAccessToken(refreshToken);

    //response logic

    const userDto = plainToInstance(UserResponseDto, user, { excludeExtraneousValues: true });

    return res.status(StatusCodes.OK).json({
      user: userDto,
      accessToken,
    });
  }

  async refreshAccessTokenCompany(req: Request, res: Response, next: NextFunction) {
    const { refreshToken } = req.cookies;

    //validate logic

    if (!refreshToken) {
      return res.status(StatusCodes.UNAUTHORIZED).send();
    }

    const { company, accessToken } = await this.authService.refreshAccessTokenCompany(refreshToken);

    //response logic

    const companyDto = plainToInstance(CompanyResponseDto, company, { excludeExtraneousValues: true });

    return res.status(StatusCodes.OK).json({
      companyDto,
      accessToken,
    });
  }
}
