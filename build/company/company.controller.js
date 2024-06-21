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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyController = void 0;
const inversify_1 = require("inversify");
const company_service_1 = require("./company.service");
const inversifyConstants_1 = require("../common/utils/inversifyConstants");
const http_status_codes_1 = require("http-status-codes");
const class_transformer_1 = require("class-transformer");
const company_response_dto_1 = require("./dtos/company-response.dto");
const validateBody_1 = require("../common/utils/validateBody");
const ban_company_validation_1 = require("./dtos/ban-company.validation");
const jwt_auth_decorator_1 = require("../common/decorators/jwt-auth.decorator");
const requires_roles_decorator_1 = require("../common/decorators/requires-roles.decorator");
const user_constants_1 = require("../common/constants/user.constants");
let CompanyController = class CompanyController {
    constructor(companyService) {
        this.companyService = companyService;
    }
    getAllCompanies(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const isBanned = req.query.banned === 'true';
            const data = yield this.companyService.getAllCompanies(isBanned);
            const responseData = (0, class_transformer_1.plainToInstance)(company_response_dto_1.CompanyResponseDto, data, { excludeExtraneousValues: true });
            return res.status(http_status_codes_1.StatusCodes.OK).json(responseData);
        });
    }
    getCompanyById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const data = yield this.companyService.getCompanyById(id);
            const responseData = (0, class_transformer_1.plainToInstance)(company_response_dto_1.CompanyResponseDto, data, { excludeExtraneousValues: true });
            return res.status(http_status_codes_1.StatusCodes.OK).json(responseData);
        });
    }
    searchByNameAndEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const encodedSearchTerm = req.query.searchTerm;
            const searchTerms = decodeURIComponent(encodedSearchTerm).split(' ');
            const data = yield this.companyService.searchByNameAndEmail(searchTerms);
            const responseData = (0, class_transformer_1.plainToInstance)(company_response_dto_1.CompanyResponseDto, data, { excludeExtraneousValues: true });
            return res.status(http_status_codes_1.StatusCodes.OK).json(responseData);
        });
    }
    banCompany(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const companyId = Number(req.params.id);
            const body = req.body;
            yield (0, validateBody_1.validateBody)(body, ban_company_validation_1.BanCompanyValidation);
            const data = yield this.companyService.banCompany(companyId, body.banned);
            const responseData = (0, class_transformer_1.plainToInstance)(company_response_dto_1.CompanyResponseDto, data, { excludeExtraneousValues: true });
            return res.status(http_status_codes_1.StatusCodes.OK).json(responseData);
        });
    }
    addRecSysCompanies(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const recSysCompanies = yield this.companyService.addRecSysCompanies();
            const data = (0, class_transformer_1.plainToInstance)(company_response_dto_1.CompanyResponseDto, recSysCompanies);
            return res.status(http_status_codes_1.StatusCodes.CREATED).json(data);
        });
    }
};
exports.CompanyController = CompanyController;
__decorate([
    (0, jwt_auth_decorator_1.JwtAuth)(),
    (0, requires_roles_decorator_1.RequiresRoles)([user_constants_1.Roles.ADMIN, user_constants_1.Roles.USER, user_constants_1.Roles.COMPANY, user_constants_1.Roles.COMPANY_OWNER]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "getAllCompanies", null);
__decorate([
    (0, jwt_auth_decorator_1.JwtAuth)(),
    (0, requires_roles_decorator_1.RequiresRoles)([user_constants_1.Roles.ADMIN, user_constants_1.Roles.USER, user_constants_1.Roles.COMPANY, user_constants_1.Roles.COMPANY_OWNER]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "getCompanyById", null);
__decorate([
    (0, jwt_auth_decorator_1.JwtAuth)(),
    (0, requires_roles_decorator_1.RequiresRoles)([user_constants_1.Roles.ADMIN, user_constants_1.Roles.USER, user_constants_1.Roles.COMPANY, user_constants_1.Roles.COMPANY_OWNER]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "searchByNameAndEmail", null);
__decorate([
    (0, jwt_auth_decorator_1.JwtAuth)(),
    (0, requires_roles_decorator_1.RequiresRoles)([user_constants_1.Roles.ADMIN]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "banCompany", null);
__decorate([
    (0, jwt_auth_decorator_1.JwtAuth)(),
    (0, requires_roles_decorator_1.RequiresRoles)([user_constants_1.Roles.ADMIN]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "addRecSysCompanies", null);
exports.CompanyController = CompanyController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(inversifyConstants_1.COMPANY_INV.CompanyService)),
    __metadata("design:paramtypes", [company_service_1.CompanyService])
], CompanyController);
//# sourceMappingURL=company.controller.js.map