"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const inversifyConstants_1 = require("../common/utils/inversifyConstants");
const catchErrors_1 = __importDefault(require("../common/utils/catchErrors"));
const centralizedContainer_1 = require("../common/centralizedContainer/centralizedContainer");
const authRouter = express_1.default.Router();
exports.authRouter = authRouter;
const controller = centralizedContainer_1.centralizedContainer.get(inversifyConstants_1.AUTH_INV.AuthController);
authRouter.put('/register', (0, catchErrors_1.default)(controller.register.bind(controller)));
authRouter.put('/register-admin', (0, catchErrors_1.default)(controller.registerAdmin.bind(controller)));
authRouter.put('/register-company', (0, catchErrors_1.default)(controller.registerCompany.bind(controller)));
authRouter.post('/login', (0, catchErrors_1.default)(controller.login.bind(controller)));
authRouter.post('/logout', (0, catchErrors_1.default)(controller.logout.bind(controller)));
authRouter.post('/refresh-token', (0, catchErrors_1.default)(controller.refreshAccessToken.bind(controller)));
authRouter.post('/login-company', (0, catchErrors_1.default)(controller.loginCompany.bind(controller)));
authRouter.post('/refresh-token-company', (0, catchErrors_1.default)(controller.refreshAccessTokenCompany.bind(controller)));
//# sourceMappingURL=auth.router.js.map