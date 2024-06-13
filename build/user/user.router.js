"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userContainerModule = exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const inversify_1 = require("inversify");
const inversifyConstants_1 = require("../common/utils/inversifyConstants");
const user_repository_1 = __importDefault(require("./user.repository"));
const user_service_1 = __importDefault(require("./user.service"));
const user_controller_1 = __importDefault(require("./user.controller"));
const catchErrors_1 = __importDefault(require("../common/utils/catchErrors"));
const container = new inversify_1.Container();
const userContainerModule = new inversify_1.ContainerModule((bind) => {
    bind(inversifyConstants_1.USER_INV.UserRepository).to(user_repository_1.default);
    bind(inversifyConstants_1.USER_INV.UserService).to(user_service_1.default);
    bind(inversifyConstants_1.USER_INV.UserController).to(user_controller_1.default);
});
exports.userContainerModule = userContainerModule;
container.load(userContainerModule);
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
const controller = container.get(inversifyConstants_1.USER_INV.UserController);
userRouter.get('/search', (0, catchErrors_1.default)(controller.searchByNameAndEmail.bind(controller)));
userRouter.get('/all', (0, catchErrors_1.default)(controller.getAllUsers.bind(controller)));
userRouter.get('/:id', (0, catchErrors_1.default)(controller.getUserById.bind(controller)));
userRouter.patch('/:id', (0, catchErrors_1.default)(controller.updateUser.bind(controller)));
userRouter.post('/', (0, catchErrors_1.default)(controller.createUser.bind(controller)));
userRouter.post('/upload-resume/:id', (0, catchErrors_1.default)(controller.uploadUserResume.bind(controller)));
userRouter.delete('/:id', (0, catchErrors_1.default)(controller.deleteUser.bind(controller)));
userRouter.delete('/delete-resume/:id', (0, catchErrors_1.default)(controller.deleteUserResume.bind(controller)));
userRouter.put('/add-contact', (0, catchErrors_1.default)(controller.addContact.bind(controller)));
userRouter.put('/remove-contact', (0, catchErrors_1.default)(controller.removeContact.bind(controller)));
userRouter.post('/recSys', (0, catchErrors_1.default)(controller.addRecSysUsers.bind(controller)));
//# sourceMappingURL=user.router.js.map