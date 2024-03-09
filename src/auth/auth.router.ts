import express from 'express';
import { Container } from 'inversify';

import { AuthController } from './auth.controller';
import { AUTH_INV } from '../common/utils/inversifyConstants';
import AuthService from './auth.service';

const container = new Container();

container.bind<AuthService>(AUTH_INV.AuthService).to(AuthService);
container.bind<AuthController>(AUTH_INV.AuthController).to(AuthController);

const router = express.Router();

const controller = container.get<AuthController>(AUTH_INV.AuthController);

export default router;
