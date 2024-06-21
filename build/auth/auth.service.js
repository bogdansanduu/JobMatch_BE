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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const inversify_1 = require("inversify");
const http_status_codes_1 = require("http-status-codes");
const user_service_1 = __importDefault(require("../user/user.service"));
const not_found_exception_1 = require("../common/exceptions/not-found.exception");
const http_exception_1 = require("../common/exceptions/http.exception");
const inversifyConstants_1 = require("../common/utils/inversifyConstants");
const token_repo_1 = require("./token.repo");
const company_service_1 = require("../company/company.service");
const user_constants_1 = require("../common/constants/user.constants");
const banned_exception_1 = require("../common/exceptions/banned.exception");
const envConfig_1 = require("../common/utils/envConfig");
const EXPIRES_IN_ACCESS = 60 * 15;
const EXPIRES_IN_REFRESH = 60 * 60 * 24;
const refreshTokenSecret = (0, envConfig_1.getEnvVar)('REFRESH_TOKEN_SECRET', 'string');
const accessTokenSecret = (0, envConfig_1.getEnvVar)('ACCESS_TOKEN_SECRET', 'string');
let AuthService = class AuthService {
    constructor(userService, companyService, tokenRepository) {
        this.userService = userService;
        this.companyService = companyService;
        this.tokenRepo = tokenRepository;
    }
    register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = data;
            const existingUser = yield this.userService.getUserByEmail(email);
            if (existingUser) {
                throw new http_exception_1.HttpException('User already exists', http_status_codes_1.StatusCodes.CONFLICT);
            }
            const saltRounds = 10;
            const salt = yield bcrypt_1.default.genSalt(saltRounds);
            const hashedPassword = yield bcrypt_1.default.hash(password, salt);
            const newUserData = Object.assign(Object.assign({}, data), { password: hashedPassword });
            return yield this.userService.createUser(newUserData);
        });
    }
    registerAdmin(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = data;
            const existingUser = yield this.userService.getUserByEmail(email);
            if (existingUser) {
                throw new http_exception_1.HttpException('User already exists', http_status_codes_1.StatusCodes.CONFLICT);
            }
            const saltRounds = 10;
            const salt = yield bcrypt_1.default.genSalt(saltRounds);
            const hashedPassword = yield bcrypt_1.default.hash(password, salt);
            const newUserData = Object.assign(Object.assign({}, data), { country: 'N/A', city: 'N/A', state: 'N/A', resume: 'N/A', password: hashedPassword, role: user_constants_1.Roles.ADMIN });
            return yield this.userService.createUser(newUserData);
        });
    }
    registerCompany(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, industry, country, city, description, state, ownerId } = data;
            const existingCompany = yield this.companyService.getCompanyByEmail(email);
            if (existingCompany) {
                throw new http_exception_1.HttpException('Company already exists', http_status_codes_1.StatusCodes.CONFLICT);
            }
            const saltRounds = 10;
            const salt = yield bcrypt_1.default.genSalt(saltRounds);
            const hashedPassword = yield bcrypt_1.default.hash(password, salt);
            const newCompanyData = {
                name,
                email,
                password: hashedPassword,
                industry,
                country,
                city,
                state,
                ownerId,
                description,
            };
            yield this.userService.updateUser(ownerId, { role: user_constants_1.Roles.COMPANY_OWNER });
            return yield this.companyService.createCompany(newCompanyData);
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getUserByEmail(email);
            if (!user) {
                throw new not_found_exception_1.NotFoundException('User not found');
            }
            if (user.isBanned) {
                throw new banned_exception_1.BannedException('User is banned');
            }
            const isMatch = yield bcrypt_1.default.compare(password, user.password);
            if (!isMatch) {
                throw new http_exception_1.HttpException('Invalid credentials', http_status_codes_1.StatusCodes.UNAUTHORIZED);
            }
            yield this.tokenRepo.deleteTokensByUser(user);
            const refreshToken = this.generateRefreshToken(user);
            const refreshTokenEntry = yield this.tokenRepo.createToken({
                refreshToken,
                user,
            });
            const accessToken = this.generateAccessToken(user);
            return {
                accessToken: accessToken,
                refreshToken: refreshTokenEntry.refreshToken,
                user,
            };
        });
    }
    loginCompany(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const company = yield this.companyService.getCompanyByEmail(email);
            if (!company) {
                throw new not_found_exception_1.NotFoundException('Company not found');
            }
            if (company.isBanned) {
                throw new banned_exception_1.BannedException('Company is banned');
            }
            const isMatch = yield bcrypt_1.default.compare(password, company.password);
            if (!isMatch) {
                throw new http_exception_1.HttpException('Invalid credentials', http_status_codes_1.StatusCodes.UNAUTHORIZED);
            }
            yield this.tokenRepo.deleteTokensByCompany(company);
            const refreshToken = this.generateRefreshTokenCompany(company);
            const refreshTokenEntry = yield this.tokenRepo.createTokenCompany({
                refreshToken,
                company,
            });
            const accessToken = this.generateAccessTokenCompany(company);
            return {
                accessToken: accessToken,
                refreshToken: refreshTokenEntry.refreshToken,
                company,
            };
        });
    }
    logout(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.tokenRepo.deleteTokenByName(refreshToken);
        });
    }
    refreshAccessToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const refreshTokenDb = yield this.tokenRepo.getTokenByName(refreshToken);
            if (!refreshTokenDb) {
                throw new not_found_exception_1.NotFoundException('Token not found');
            }
            const { userId } = jsonwebtoken_1.default.verify(refreshToken, refreshTokenSecret);
            const user = refreshTokenDb.user;
            if (user.id !== userId) {
                throw new http_exception_1.HttpException('Invalid token', http_status_codes_1.StatusCodes.FORBIDDEN);
            }
            const accessToken = this.generateAccessToken(user);
            return {
                user,
                accessToken,
            };
        });
    }
    refreshAccessTokenCompany(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const refreshTokenDb = yield this.tokenRepo.getTokenByName(refreshToken);
            if (!refreshTokenDb) {
                throw new not_found_exception_1.NotFoundException('Token not found');
            }
            const { companyId } = jsonwebtoken_1.default.verify(refreshToken, refreshTokenSecret);
            const company = refreshTokenDb.company;
            if (company.id !== companyId) {
                throw new http_exception_1.HttpException('Invalid token', http_status_codes_1.StatusCodes.FORBIDDEN);
            }
            const accessToken = this.generateAccessTokenCompany(company);
            return {
                company,
                accessToken,
            };
        });
    }
    generateAccessToken(data) {
        const payload = {
            userId: data.id,
            email: data.email,
        };
        return jsonwebtoken_1.default.sign(payload, accessTokenSecret, {
            expiresIn: EXPIRES_IN_ACCESS,
        });
    }
    generateAccessTokenCompany(company) {
        const payload = {
            companyId: company.id,
            email: company.email,
        };
        return jsonwebtoken_1.default.sign(payload, accessTokenSecret, {
            expiresIn: EXPIRES_IN_ACCESS,
        });
    }
    generateRefreshToken(data) {
        const payload = {
            userId: data.id,
            email: data.email,
        };
        return jsonwebtoken_1.default.sign(payload, refreshTokenSecret, {
            expiresIn: EXPIRES_IN_REFRESH,
        });
    }
    generateRefreshTokenCompany(company) {
        const payload = {
            companyId: company.id,
            email: company.email,
        };
        return jsonwebtoken_1.default.sign(payload, refreshTokenSecret, {
            expiresIn: EXPIRES_IN_REFRESH,
        });
    }
};
AuthService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(inversifyConstants_1.USER_INV.UserService)),
    __param(1, (0, inversify_1.inject)(inversifyConstants_1.COMPANY_INV.CompanyService)),
    __param(2, (0, inversify_1.inject)(inversifyConstants_1.AUTH_INV.TokenRepository)),
    __metadata("design:paramtypes", [user_service_1.default,
        company_service_1.CompanyService,
        token_repo_1.TokenRepository])
], AuthService);
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map