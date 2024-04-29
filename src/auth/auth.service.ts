import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';

import UserService from '../user/user.service';
import { NotFoundException } from '../common/exceptions/not-found.exception';
import { HttpException } from '../common/exceptions/http.exception';
import { AUTH_INV, COMPANY_INV, USER_INV } from '../common/utils/inversifyConstants';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from '../user/entities/user.entity';
import { TokenRepository } from './token.repo';
import { AuthServiceInterface } from './interfaces/auth-service.interface';
import { RegisterValidation } from './dtos/register.validation';
import { CompanyService } from '../company/company.service';
import { CreateCompanyValidation } from '../company/dtos/create-company.validation';
import { Company } from '../company/entities/company.entity';
import { Roles } from '../common/constants/user.constants';

//seconds
const EXPIRES_IN_ACCESS = 5;
const EXPIRES_IN_REFRESH = 60 * 60 * 24;

@injectable()
class AuthService implements AuthServiceInterface {
  private userService: UserService;
  private companyService: CompanyService;
  private tokenRepo: TokenRepository;

  constructor(
    @inject(USER_INV.UserService)
    userService: UserService,
    @inject(COMPANY_INV.CompanyService)
    companyService: CompanyService,
    @inject(AUTH_INV.TokenRepository)
    tokenRepository: TokenRepository
  ) {
    this.userService = userService;
    this.companyService = companyService;
    this.tokenRepo = tokenRepository;
  }

  async register(data: RegisterValidation) {
    const { firstName, lastName, email, password, country, city, state } = data;

    const existingUser = await this.userService.getUserByEmail(email);

    if (existingUser) {
      throw new HttpException('User already exists', StatusCodes.CONFLICT);
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUserData = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      country,
      city,
      state,
    };

    return await this.userService.createUser(newUserData);
  }

  async registerCompany(data: CreateCompanyValidation) {
    const { name, email, password, industry, country, city, state, ownerId } = data;

    const existingCompany = await this.companyService.getCompanyByEmail(email);

    if (existingCompany) {
      throw new HttpException('Company already exists', StatusCodes.CONFLICT);
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newCompanyData = {
      name,
      email,
      password: hashedPassword,
      industry,
      country,
      city,
      state,
      ownerId,
    };

    await this.userService.updateUser(ownerId, { role: Roles.COMPANY_OWNER });

    return await this.companyService.createCompany(newCompanyData);
  }

  async login(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new HttpException('Invalid credentials', StatusCodes.UNAUTHORIZED);
    }

    //delete all refresh tokens for the user
    //generate a new refresh token and add it to the database

    await this.tokenRepo.deleteTokensByUser(user);

    const refreshToken = this.generateRefreshToken(user);
    const refreshTokenEntry = await this.tokenRepo.createToken({
      refreshToken,
      user,
    });

    const accessToken = this.generateAccessToken(user);

    return {
      accessToken: accessToken,
      refreshToken: refreshTokenEntry.refreshToken,
      user,
    };
  }

  async loginCompany(email: string, password: string) {
    const company = await this.companyService.getCompanyByEmail(email);

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    const isMatch = await bcrypt.compare(password, company.password);

    if (!isMatch) {
      throw new HttpException('Invalid credentials', StatusCodes.UNAUTHORIZED);
    }

    //delete all refresh tokens for the company
    //generate a new refresh token and add it tgo the database

    await this.tokenRepo.deleteTokensByCompany(company);

    const refreshToken = this.generateRefreshTokenCompany(company);
    const refreshTokenEntry = await this.tokenRepo.createTokenCompany({
      refreshToken,
      company,
    });

    const accessToken = this.generateAccessTokenCompany(company);

    return {
      accessToken: accessToken,
      refreshToken: refreshTokenEntry.refreshToken,
      company,
    };
  }

  async logout(refreshToken: string) {
    await this.tokenRepo.deleteTokenByName(refreshToken);
  }

  async refreshAccessToken(refreshToken: string) {
    const refreshTokenDb = await this.tokenRepo.getTokenByName(refreshToken);

    if (!refreshTokenDb) {
      throw new NotFoundException('Token not found');
    }

    const { userId } = <JwtPayload>jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || 'refresh');
    const user = refreshTokenDb.user;

    if (user.id !== userId) {
      throw new HttpException('Invalid token', StatusCodes.FORBIDDEN);
    }

    const accessToken = this.generateAccessToken(user);

    return {
      user,
      accessToken,
    };
  }

  async refreshAccessTokenCompany(refreshToken: string) {
    const refreshTokenDb = await this.tokenRepo.getTokenByName(refreshToken);

    if (!refreshTokenDb) {
      throw new NotFoundException('Token not found');
    }

    const { companyId } = <JwtPayload>jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || 'refresh');
    const company = refreshTokenDb.company;

    if (company.id !== companyId) {
      throw new HttpException('Invalid token', StatusCodes.FORBIDDEN);
    }

    const accessToken = this.generateAccessTokenCompany(company);

    return {
      company,
      accessToken,
    };
  }

  //---UTILS---

  private generateAccessToken(data: User) {
    const payload = {
      userId: data.id,
      email: data.email,
    };

    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET || 'access', {
      expiresIn: EXPIRES_IN_ACCESS,
    });
  }

  private generateAccessTokenCompany(company: Company) {
    const payload = {
      companyId: company.id,
      email: company.email,
    };

    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET || 'access', {
      expiresIn: EXPIRES_IN_ACCESS,
    });
  }

  private generateRefreshToken(data: User) {
    const payload = {
      userId: data.id,
      email: data.email,
    };

    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET || 'refresh', {
      expiresIn: EXPIRES_IN_REFRESH,
    });
  }

  private generateRefreshTokenCompany(company: Company) {
    const payload = {
      companyId: company.id,
      email: company.email,
    };

    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET || 'refresh', {
      expiresIn: EXPIRES_IN_REFRESH,
    });
  }
}

export default AuthService;
