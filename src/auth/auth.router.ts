import express from 'express';

import { AuthController } from './auth.controller';
import { AUTH_INV } from '../common/utils/inversifyConstants';
import catchErrors from '../common/utils/catchErrors';
import { centralizedContainer } from '../common/centralizedContainer/centralizedContainer';

const authRouter = express.Router();

const controller = centralizedContainer.get<AuthController>(AUTH_INV.AuthController);

authRouter.put('/register', catchErrors(controller.register.bind(controller)));
authRouter.put('/register-admin', catchErrors(controller.registerAdmin.bind(controller)));
authRouter.put('/register-company', catchErrors(controller.registerCompany.bind(controller)));

authRouter.post('/login', catchErrors(controller.login.bind(controller)));
authRouter.post('/logout', catchErrors(controller.logout.bind(controller)));
authRouter.post('/refresh-token', catchErrors(controller.refreshAccessToken.bind(controller)));

authRouter.post('/login-company', catchErrors(controller.loginCompany.bind(controller)));
authRouter.post('/refresh-token-company', catchErrors(controller.refreshAccessTokenCompany.bind(controller)));

export { authRouter };
