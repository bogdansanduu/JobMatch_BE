import express from 'express';
import { Container, ContainerModule } from 'inversify';

import { AuthController } from './auth.controller';
import { AUTH_INV } from '../common/utils/inversifyConstants';
import AuthService from './auth.service';
import { userContainerModule } from '../user/user.router';

const container = new Container();
const authContainerModule = new ContainerModule((bind) => {
  bind(AUTH_INV.AuthService).to(AuthService);
  bind(AUTH_INV.AuthController).to(AuthController);
});

container.load(authContainerModule, userContainerModule);

const authRouter = express.Router();

const controller = container.get<AuthController>(AUTH_INV.AuthController);

authRouter.post('/login', controller.login.bind(controller));
authRouter.post('/register', controller.register.bind(controller));

export { authRouter, authContainerModule };
