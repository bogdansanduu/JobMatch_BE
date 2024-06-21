"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userContainerModule = void 0;
const inversify_1 = require("inversify");
const inversifyConstants_1 = require("../common/utils/inversifyConstants");
const user_repository_1 = __importDefault(require("./user.repository"));
const user_service_1 = __importDefault(require("./user.service"));
const user_controller_1 = __importDefault(require("./user.controller"));
const userContainerModule = new inversify_1.ContainerModule((bind) => {
    bind(inversifyConstants_1.USER_INV.UserRepository).to(user_repository_1.default);
    bind(inversifyConstants_1.USER_INV.UserService).to(user_service_1.default);
    bind(inversifyConstants_1.USER_INV.UserController).to(user_controller_1.default);
});
exports.userContainerModule = userContainerModule;
//# sourceMappingURL=user.module.js.map