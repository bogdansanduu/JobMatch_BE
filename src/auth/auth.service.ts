import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';

import UserService from '../user/user.service';
import { NotFoundException } from '../common/exceptions/notFound.exception';
import { HttpException } from '../common/exceptions/http.exception';
import { USER_INV } from '../common/utils/inversifyConstants';

//TODO add DTOS

const EXPIRES_IN = 60 * 60 * 24;

@injectable()
class AuthService {
  private userService: UserService;

  constructor(
    @inject(USER_INV.UserService)
    userService: UserService
  ) {
    this.userService = userService;
  }

  private generateAccessToken(user: any) {
    const payload = {
      sub: user.id,
      username: user.email,
      exp: Math.floor(Date.now() / 1000) + EXPIRES_IN,
    };

    return jwt.sign(payload, process.env.SECRET_KEY || 'secret');
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

    //TODO use interceptors to transform the repsonse object

    const jwtToken = this.generateAccessToken(user);
    delete user.password;

    return {
      access_token: jwtToken,
      user,
    };
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
}

export default AuthService;

// router.post('/login', async (req, res, next) => {
//   const username = req.body.username;
//   const user = { name: username };
//
//   const accessToken = generateAccessToken(user);
//   const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET || 'refreshsecret');
//
//   // Implement logic to save the refresh token
//
//   res.json({ accessToken: accessToken, refreshToken: refreshToken });
// });
//
// router.post('/token', (req, res, next) => {
//   const refreshToken = req.body.token;
//
//   if (!refreshToken) {
//     return res.sendStatus(StatusCodes.UNAUTHORIZED);
//   }
//
//   jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || 'refreshsecret', (err, user) => {
//     if (err) {
//       return res.sendStatus(StatusCodes.FORBIDDEN);
//     }
//
//     const accessToken = generateAccessToken({ name: user.name });
//     res.json({ accessToken: accessToken });
//   });
// });
//
// router.delete('/logout', (req, res, next) => {
//   // Implement logic to invalidate the refresh token
//   res.sendStatus(StatusCodes.NO_CONTENT);
// });
//
// const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];
//
//   if (!token) {
//     return res.sendStatus(StatusCodes.UNAUTHORIZED);
//   }
//
//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || 'secret', (err, user) => {
//     if (err) {
//       return res.sendStatus(StatusCodes.FORBIDDEN);
//     }
//     req.user = user;
//     next();
//   });
// };
//
// const generateAccessToken = (user: any) => {
//   return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET || 'secret', { expiresIn: '15m' });
// };
