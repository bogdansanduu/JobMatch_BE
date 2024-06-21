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
exports.AuthController = void 0;
const auth_service_1 = __importDefault(require("./auth.service"));
const http_status_codes_1 = require("http-status-codes");
const inversify_1 = require("inversify");
const inversifyConstants_1 = require("../common/utils/inversifyConstants");
const class_transformer_1 = require("class-transformer");
const user_response_dto_1 = require("../user/dtos/user-response.dto");
const validateBody_1 = require("../common/utils/validateBody");
const register_validation_1 = require("./dtos/register.validation");
const create_company_validation_1 = require("../company/dtos/create-company.validation");
const company_response_dto_1 = require("../company/dtos/company-response.dto");
const login_validation_1 = require("./dtos/login.validation");
const envConfig_1 = require("../common/utils/envConfig");
const jwt_auth_decorator_1 = require("../common/decorators/jwt-auth.decorator");
const requires_roles_decorator_1 = require("../common/decorators/requires-roles.decorator");
const user_constants_1 = require("../common/constants/user.constants");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            yield (0, validateBody_1.validateBody)(body, register_validation_1.RegisterValidation);
            const data = yield this.authService.register(body);
            const responseData = (0, class_transformer_1.plainToInstance)(user_response_dto_1.UserResponseDto, data, { excludeExtraneousValues: true });
            return res.status(http_status_codes_1.StatusCodes.CREATED).json(responseData);
        });
    }
    registerAdmin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            yield (0, validateBody_1.validateBody)(body, register_validation_1.AdminRegisterValidation);
            const adminSecret = (0, envConfig_1.getEnvVar)('ADMIN_SECRET_KEY', 'string');
            if (body.secret !== adminSecret) {
                return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).send();
            }
            const data = yield this.authService.registerAdmin(body);
            const responseData = (0, class_transformer_1.plainToInstance)(user_response_dto_1.UserResponseDto, data, { excludeExtraneousValues: true });
            return res.status(http_status_codes_1.StatusCodes.CREATED).json(responseData);
        });
    }
    registerCompany(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            yield (0, validateBody_1.validateBody)(body, create_company_validation_1.CreateCompanyValidation);
            const user = yield this.authService.registerCompany(body);
            if (!user) {
                return res.status(http_status_codes_1.StatusCodes.CONFLICT).send();
            }
            return res.status(http_status_codes_1.StatusCodes.CREATED).send();
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            yield (0, validateBody_1.validateBody)({ email, password }, login_validation_1.LoginValidation);
            const { user, accessToken, refreshToken } = yield this.authService.login(email, password);
            const userDto = (0, class_transformer_1.plainToInstance)(user_response_dto_1.UserResponseDto, user);
            res.cookie('refreshToken', refreshToken, {
                httpOnly: false,
                secure: true,
                sameSite: 'none',
                maxAge: 1000 * 60 * 60 * 24 * 7,
            });
            return res.status(http_status_codes_1.StatusCodes.OK).json({
                user: userDto,
                accessToken,
            });
        });
    }
    loginCompany(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            yield (0, validateBody_1.validateBody)({ email, password }, login_validation_1.LoginValidation);
            const { company, accessToken, refreshToken } = yield this.authService.loginCompany(email, password);
            const companyDto = (0, class_transformer_1.plainToInstance)(company_response_dto_1.CompanyResponseDto, company);
            res.cookie('refreshToken', refreshToken, {
                httpOnly: false,
                secure: true,
                sameSite: 'none',
                maxAge: 1000 * 60 * 60 * 24 * 7,
            });
            return res.status(http_status_codes_1.StatusCodes.OK).json({
                company: companyDto,
                accessToken,
            });
        });
    }
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { refreshToken } = req.cookies;
            if (!refreshToken) {
                return res.status(http_status_codes_1.StatusCodes.NO_CONTENT).send();
            }
            yield this.authService.logout(refreshToken);
            res.clearCookie('refreshToken', {
                httpOnly: true,
                sameSite: 'none',
            });
            return res.status(http_status_codes_1.StatusCodes.NO_CONTENT).send();
        });
    }
    refreshAccessToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { refreshToken } = req.cookies;
            if (!refreshToken) {
                return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).send();
            }
            const { user, accessToken } = yield this.authService.refreshAccessToken(refreshToken);
            const userDto = (0, class_transformer_1.plainToInstance)(user_response_dto_1.UserResponseDto, user, { excludeExtraneousValues: true });
            return res.status(http_status_codes_1.StatusCodes.OK).json({
                user: userDto,
                accessToken,
            });
        });
    }
    refreshAccessTokenCompany(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { refreshToken } = req.cookies;
            if (!refreshToken) {
                return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).send();
            }
            const { company, accessToken } = yield this.authService.refreshAccessTokenCompany(refreshToken);
            const companyDto = (0, class_transformer_1.plainToInstance)(company_response_dto_1.CompanyResponseDto, company, { excludeExtraneousValues: true });
            return res.status(http_status_codes_1.StatusCodes.OK).json({
                companyDto,
                accessToken,
            });
        });
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, jwt_auth_decorator_1.JwtAuth)(),
    (0, requires_roles_decorator_1.RequiresRoles)([user_constants_1.Roles.ADMIN, user_constants_1.Roles.USER]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerCompany", null);
__decorate([
    (0, jwt_auth_decorator_1.JwtAuth)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(inversifyConstants_1.AUTH_INV.AuthService)),
    __metadata("design:paramtypes", [auth_service_1.default])
], AuthController);
//# sourceMappingURL=auth.controller.js.map