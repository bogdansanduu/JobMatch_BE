import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { Repository } from 'typeorm';

import UserService from '../user/user.service';
import { NotFoundException } from '../common/exceptions/not-found.exception';
import { HttpException } from '../common/exceptions/http.exception';
import { USER_INV } from '../common/utils/inversifyConstants';
import { Token } from './entities/token.entity';
import { dataSource } from '../database/dataSource';
import { JwtPayload } from './interfaces/jwt-payload.interface';

//TODO add DTOS

//seconds
const EXPIRES_IN_ACCESS = 60 * 15;
const EXPIRES_IN_REFRESH = 60 * 60 * 24;

@injectable()
class AuthService {
  private userService: UserService;

  //TODO move to repository
  private readonly tokenRepo: Repository<Token>;

  constructor(
    @inject(USER_INV.UserService)
    userService: UserService
  ) {
    this.userService = userService;
    this.tokenRepo = dataSource.getRepository(Token);
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

    const newUser: any = await this.userService.createUser(newUserData);

    const jwtToken = this.generateAccessToken(newUser);
    delete newUser.password;

    return {
      access_token: jwtToken,
      user: newUser,
    };
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

    //Delete all refresh tokens for the user
    //Generate a new refresh token and add it tgo the database

    await this.tokenRepo.delete({
      user,
    });

    const refreshToken = this.generateRefreshToken(user);
    const tokenEntry = this.tokenRepo.create({
      refreshToken,
      user,
    });

    await this.tokenRepo.save(tokenEntry);

    //TODO use interceptors to transform the response object
    const accessToken = this.generateAccessToken(user);
    delete user.password;

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
      user,
    };
  }

  async logout(refreshToken: string) {
    await this.tokenRepo.delete({
      refreshToken,
    });
  }

  async refreshAccessToken(refreshToken: string) {
    const refreshTokenDb = await this.tokenRepo.findOne({
      where: {
        refreshToken,
      },
      relations: ['user'],
    });

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

  private generateAccessToken(user: any) {
    const payload = {
      userId: user.id,
      email: user.email,
    };

    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET || 'access', {
      expiresIn: EXPIRES_IN_ACCESS,
    });
  }

  private generateRefreshToken(user: any) {
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
