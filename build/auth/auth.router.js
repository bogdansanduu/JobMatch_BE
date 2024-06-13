"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authContainerModule = exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const inversify_1 = require("inversify");
const auth_controller_1 = require("./auth.controller");
const inversifyConstants_1 = require("../common/utils/inversifyConstants");
const auth_service_1 = __importDefault(require("./auth.service"));
const user_router_1 = require("../user/user.router");
const catchErrors_1 = __importDefault(require("../common/utils/catchErrors"));
const token_repo_1 = require("./token.repo");
const company_router_1 = require("../company/company.router");
const container = new inversify_1.Container();
const authContainerModule = new inversify_1.ContainerModule((bind) => {
    bind(inversifyConstants_1.AUTH_INV.TokenRepository).to(token_repo_1.TokenRepository);
    bind(inversifyConstants_1.AUTH_INV.AuthService).to(auth_service_1.default);
    bind(inversifyConstants_1.AUTH_INV.AuthController).to(auth_controller_1.AuthController);
});
exports.authContainerModule = authContainerModule;
container.load(authContainerModule);
container.load(user_router_1.userContainerModule);
container.load(company_router_1.companyContainerModule);
const authRouter = express_1.default.Router();
exports.authRouter = authRouter;
const controller = container.get(inversifyConstants_1.AUTH_INV.AuthController);
authRouter.put('/register', (0, catchErrors_1.default)(controller.register.bind(controller)));
authRouter.put('/register-admin', (0, catchErrors_1.default)(controller.registerAdmin.bind(controller)));
authRouter.put('/register-company', (0, catchErrors_1.default)(controller.registerCompany.bind(controller)));
authRouter.post('/login', (0, catchErrors_1.default)(controller.login.bind(controller)));
authRouter.post('/logout', (0, catchErrors_1.default)(controller.logout.bind(controller)));
authRouter.post('/refresh-token', (0, catchErrors_1.default)(controller.refreshAccessToken.bind(controller)));
authRouter.post('/login-company', (0, catchErrors_1.default)(controller.loginCompany.bind(controller)));
authRouter.post('/refresh-token-company', (0, catchErrors_1.default)(controller.refreshAccessTokenCompany.bind(controller)));
//# sourceMappingURL=auth.router.js.map