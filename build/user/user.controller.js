"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const http_status_codes_1 = require("http-status-codes");
const inversify_1 = require("inversify");
const inversifyConstants_1 = require("../common/utils/inversifyConstants");
const user_service_1 = __importDefault(require("./user.service"));
const add_contact_validation_1 = require("./dtos/add-contact.validation");
const validateBody_1 = require("../common/utils/validateBody");
const remove_contact_validation_1 = require("./dtos/remove-contact.validation");
const class_transformer_1 = require("class-transformer");
const user_response_dto_1 = require("./dtos/user-response.dto");
const upload_resume_validation_1 = require("./dtos/upload-resume.validation");
const ban_user_validation_1 = require("./dtos/ban-user.validation");
const jwt_auth_decorator_1 = require("../common/decorators/jwt-auth.decorator");
const requires_roles_decorator_1 = require("../common/decorators/requires-roles.decorator");
const user_constants_1 = require("../common/constants/user.constants");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const data = yield this.userService.createUser(body);
            const responseData = (0, class_transformer_1.plainToInstance)(user_response_dto_1.UserResponseDto, data, { excludeExtraneousValues: true });
            return res.status(http_status_codes_1.StatusCodes.CREATED).json(responseData);
        });
    }
    getUserById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = Number(req.params.id);
            const data = yield this.userService.getUserById(body);
            const responseData = (0, class_transformer_1.plainToInstance)(user_response_dto_1.UserResponseDto, data, { excludeExtraneousValues: true });
            return res.status(http_status_codes_1.StatusCodes.OK).json(responseData);
        });
    }
    updateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const id = req.params.id || '-1';
            const data = yield this.userService.updateUser(parseInt(id), body);
            const responseData = (0, class_transformer_1.plainToInstance)(user_response_dto_1.UserResponseDto, data, { excludeExtraneousValues: true });
            return res.status(http_status_codes_1.StatusCodes.OK).json(responseData);
        });
    }
    uploadUserResume(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = Number(req.params.id);
            const body = req.body;
            yield (0, validateBody_1.validateBody)(body, upload_resume_validation_1.UploadResumeValidation);
            const data = yield this.userService.uploadUserResume(userId, body);
            const responseData = (0, class_transformer_1.plainToInstance)(user_response_dto_1.UserResponseDto, data, { excludeExtraneousValues: true });
            return res.status(http_status_codes_1.StatusCodes.OK).json(responseData);
        });
    }
    deleteUserResume(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = Number(req.params.id);
            const data = yield this.userService.deleteUserResume(userId);
            const responseData = (0, class_transformer_1.plainToInstance)(user_response_dto_1.UserResponseDto, data, { excludeExtraneousValues: true });
            return res.status(http_status_codes_1.StatusCodes.OK).json(responseData);
        });
    }
    deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            yield this.userService.deleteUser(id);
            return res.status(http_status_codes_1.StatusCodes.NO_CONTENT).send();
        });
    }
    getAllUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const isBanned = req.query.banned === 'true';
            const data = yield this.userService.getAllUsers(isBanned);
            const responseData = (0, class_transformer_1.plainToInstance)(user_response_dto_1.UserResponseDto, data, { excludeExtraneousValues: true });
            return res.status(http_status_codes_1.StatusCodes.OK).json(responseData);
        });
    }
    addContact(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            yield (0, validateBody_1.validateBody)(req.body, add_contact_validation_1.AddContactValidation);
            const data = yield this.userService.addContact(body);
            const responseData = (0, class_transformer_1.plainToInstance)(user_response_dto_1.UserResponseDto, data, { excludeExtraneousValues: true });
            return res.status(http_status_codes_1.StatusCodes.OK).json(responseData);
        });
    }
    removeContact(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            yield (0, validateBody_1.validateBody)(body, remove_contact_validation_1.RemoveContactValidation);
            const data = yield this.userService.removeContact(body);
            const responseData = (0, class_transformer_1.plainToInstance)(user_response_dto_1.UserResponseDto, data, { excludeExtraneousValues: true });
            return res.status(http_status_codes_1.StatusCodes.OK).json(responseData);
        });
    }
    searchByNameAndEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const encodedSearchTerm = req.query.searchTerm;
            const searchTerms = decodeURIComponent(encodedSearchTerm).split(' ');
            const data = yield this.userService.searchByNameAndEmail(searchTerms);
            const responseData = (0, class_transformer_1.plainToInstance)(user_response_dto_1.UserResponseDto, data, { excludeExtraneousValues: true });
            return res.status(http_status_codes_1.StatusCodes.OK).json(responseData);
        });
    }
    banUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = Number(req.params.id);
            const body = req.body;
            yield (0, validateBody_1.validateBody)(body, ban_user_validation_1.BanUserValidation);
            const data = yield this.userService.banUser(userId, body.banned);
            const responseData = (0, class_transformer_1.plainToInstance)(user_response_dto_1.UserResponseDto, data, { excludeExtraneousValues: true });
            return res.status(http_status_codes_1.StatusCodes.OK).json(responseData);
        });
    }
    addRecSysUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const recSysUsers = yield this.userService.addRecSysUsers();
            const data = (0, class_transformer_1.plainToInstance)(user_response_dto_1.UserResponseDto, recSysUsers);
            return res.status(http_status_codes_1.StatusCodes.CREATED).json(data);
        });
    }
};
exports.UserController = UserController;
__decorate([
    (0, jwt_auth_decorator_1.JwtAuth)(),
    (0, requires_roles_decorator_1.RequiresRoles)([user_constants_1.Roles.ADMIN, user_constants_1.Roles.USER, user_constants_1.Roles.COMPANY, user_constants_1.Roles.COMPANY_OWNER]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, jwt_auth_decorator_1.JwtAuth)(),
    (0, requires_roles_decorator_1.RequiresRoles)([user_constants_1.Roles.ADMIN, user_constants_1.Roles.USER, user_constants_1.Roles.COMPANY, user_constants_1.Roles.COMPANY_OWNER]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserById", null);
__decorate([
    (0, jwt_auth_decorator_1.JwtAuth)(),
    (0, requires_roles_decorator_1.RequiresRoles)([user_constants_1.Roles.ADMIN, user_constants_1.Roles.USER, user_constants_1.Roles.COMPANY_OWNER]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, jwt_auth_decorator_1.JwtAuth)(),
    (0, requires_roles_decorator_1.RequiresRoles)([user_constants_1.Roles.USER, user_constants_1.Roles.COMPANY_OWNER]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "uploadUserResume", null);
__decorate([
    (0, jwt_auth_decorator_1.JwtAuth)(),
    (0, requires_roles_decorator_1.RequiresRoles)([user_constants_1.Roles.USER, user_constants_1.Roles.COMPANY_OWNER]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUserResume", null);
__decorate([
    (0, jwt_auth_decorator_1.JwtAuth)(),
    (0, requires_roles_decorator_1.RequiresRoles)([user_constants_1.Roles.ADMIN, user_constants_1.Roles.USER, user_constants_1.Roles.COMPANY, user_constants_1.Roles.COMPANY_OWNER]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, jwt_auth_decorator_1.JwtAuth)(),
    (0, requires_roles_decorator_1.RequiresRoles)([user_constants_1.Roles.ADMIN, user_constants_1.Roles.USER, user_constants_1.Roles.COMPANY, user_constants_1.Roles.COMPANY_OWNER]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
__decorate([
    (0, jwt_auth_decorator_1.JwtAuth)(),
    (0, requires_roles_decorator_1.RequiresRoles)([user_constants_1.Roles.USER, user_constants_1.Roles.COMPANY_OWNER]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addContact", null);
__decorate([
    (0, jwt_auth_decorator_1.JwtAuth)(),
    (0, requires_roles_decorator_1.RequiresRoles)([user_constants_1.Roles.USER, user_constants_1.Roles.COMPANY_OWNER]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "removeContact", null);
__decorate([
    (0, jwt_auth_decorator_1.JwtAuth)(),
    (0, requires_roles_decorator_1.RequiresRoles)([user_constants_1.Roles.ADMIN, user_constants_1.Roles.USER, user_constants_1.Roles.COMPANY, user_constants_1.Roles.COMPANY_OWNER]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "searchByNameAndEmail", null);
__decorate([
    (0, jwt_auth_decorator_1.JwtAuth)(),
    (0, requires_roles_decorator_1.RequiresRoles)([user_constants_1.Roles.ADMIN]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "banUser", null);
__decorate([
    (0, jwt_auth_decorator_1.JwtAuth)(),
    (0, requires_roles_decorator_1.RequiresRoles)([user_constants_1.Roles.ADMIN]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addRecSysUsers", null);
exports.UserController = UserController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(inversifyConstants_1.USER_INV.UserService)),
    __metadata("design:paramtypes", [user_service_1.default])
], UserController);
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map