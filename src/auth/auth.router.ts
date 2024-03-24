import express from 'express';
import { Container, ContainerModule } from 'inversify';

import { AuthController } from './auth.controller';
import { AUTH_INV } from '../common/utils/inversifyConstants';
import AuthService from './auth.service';
import { userContainerModule } from '../user/user.router';
import catchErrors from '../common/utils/catchErrors';
import { TokenRepository } from './token.repo';
import { TokenRepositoryInterface } from './interfaces/token-repository.interface';
import { AuthServiceInterface } from './interfaces/auth-service.interface';

const container = new Container();
const authContainerModule = new ContainerModule((bind) => {
  bind<TokenRepositoryInterface>(AUTH_INV.TokenRepository).to(TokenRepository);
  bind<AuthServiceInterface>(AUTH_INV.AuthService).to(AuthService);
  bind(AUTH_INV.AuthController).to(AuthController);
});

container.load(authContainerModule, userContainerModule);

const authRouter = express.Router();

const controller = container.get<AuthController>(AUTH_INV.AuthController);

authRouter.post('/register', catchErrors(controller.register.bind(controller)));
authRouter.post('/login', catchErrors(controller.login.bind(controller)));
authRouter.post('/logout', catchErrors(controller.logout.bind(controller)));
authRouter.post('/refreshToken', catchErrors(controller.refreshAccessToken.bind(controller)));

export { authRouter, authContainerModule };
