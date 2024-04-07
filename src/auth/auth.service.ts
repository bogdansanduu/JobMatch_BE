import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';

import UserService from '../user/user.service';
import { NotFoundException } from '../common/exceptions/not-found.exception';
import { HttpException } from '../common/exceptions/http.exception';
import { AUTH_INV, USER_INV } from '../common/utils/inversifyConstants';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from '../user/entities/user.entity';
import { TokenRepository } from './token.repo';
import { AuthServiceInterface } from './interfaces/auth-service.interface';

//seconds
const EXPIRES_IN_ACCESS = 60 * 30;
const EXPIRES_IN_REFRESH = 60 * 60 * 24;

@injectable()
class AuthService implements AuthServiceInterface {
  private userService: UserService;
  private tokenRepo: TokenRepository;

  constructor(
    @inject(USER_INV.UserService)
    userService: UserService,
    @inject(AUTH_INV.TokenRepository)
    tokenRepository: TokenRepository
  ) {
    this.userService = userService;
    this.tokenRepo = tokenRepository;
  }

  async register(firstName: string, lastName: string, email: string, password: string) {
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
    };

    return await this.userService.createUser(newUserData);
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
    //generate a new refresh token and add it tgo the database

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

  //---UTILS---

  private generateAccessToken(user: User) {
    const payload = {
      userId: user.id,
      email: user.email,
    };

    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET || 'access', {
      expiresIn: EXPIRES_IN_ACCESS,
    });
  }

  private generateRefreshToken(user: User) {
    const payload = {
      userId: user.id,
      email: user.email,
    };

    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET || 'refresh', {
      expiresIn: EXPIRES_IN_REFRESH,
    });
  }
}

export default AuthService;
