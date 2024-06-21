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
exports.S3DocumentController = void 0;
const inversify_1 = require("inversify");
const s3_document_service_1 = require("./s3-document.service");
const inversifyConstants_1 = require("../common/utils/inversifyConstants");
const jwt_auth_decorator_1 = require("../common/decorators/jwt-auth.decorator");
const requires_roles_decorator_1 = require("../common/decorators/requires-roles.decorator");
const user_constants_1 = require("../common/constants/user.constants");
let S3DocumentController = class S3DocumentController {
    constructor(S3DocumentService) {
        this.S3DocumentService = S3DocumentService;
    }
    generatePreSignedPutUrl(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fileKey, fileType } = req.body;
            const data = yield this.S3DocumentService.generatePreSignedPutUrl(fileKey, fileType);
            return res.status(200).json(data);
        });
    }
    generatePreSignedGetUrl(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fileKey } = req.body;
            const data = yield this.S3DocumentService.generatePreSignedGetUrl(fileKey);
            return res.status(200).json(data);
        });
    }
    generateShortPreSignedGetUrl(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fileKey } = req.body;
            const data = yield this.S3DocumentService.generateShortPreSignedGetUrl(fileKey);
            return res.status(200).json(data);
        });
    }
    deleteDocument(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fileKey } = req.body;
            const data = yield this.S3DocumentService.deleteDocument(fileKey);
            return res.status(200).json(data);
        });
    }
};
exports.S3DocumentController = S3DocumentController;
__decorate([
    (0, jwt_auth_decorator_1.JwtAuth)(),
    (0, requires_roles_decorator_1.RequiresRoles)([user_constants_1.Roles.ADMIN, user_constants_1.Roles.USER, user_constants_1.Roles.COMPANY, user_constants_1.Roles.COMPANY_OWNER]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], S3DocumentController.prototype, "generatePreSignedPutUrl", null);
__decorate([
    (0, jwt_auth_decorator_1.JwtAuth)(),
    (0, requires_roles_decorator_1.RequiresRoles)([user_constants_1.Roles.ADMIN, user_constants_1.Roles.USER, user_constants_1.Roles.COMPANY, user_constants_1.Roles.COMPANY_OWNER]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], S3DocumentController.prototype, "generatePreSignedGetUrl", null);
__decorate([
    (0, jwt_auth_decorator_1.JwtAuth)(),
    (0, requires_roles_decorator_1.RequiresRoles)([user_constants_1.Roles.ADMIN, user_constants_1.Roles.USER, user_constants_1.Roles.COMPANY, user_constants_1.Roles.COMPANY_OWNER]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], S3DocumentController.prototype, "generateShortPreSignedGetUrl", null);
__decorate([
    (0, jwt_auth_decorator_1.JwtAuth)(),
    (0, requires_roles_decorator_1.RequiresRoles)([user_constants_1.Roles.ADMIN, user_constants_1.Roles.USER, user_constants_1.Roles.COMPANY, user_constants_1.Roles.COMPANY_OWNER]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], S3DocumentController.prototype, "deleteDocument", null);
exports.S3DocumentController = S3DocumentController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(inversifyConstants_1.AWS_S3_DOCUMENT_INV.S3DocumentService)),
    __metadata("design:paramtypes", [s3_document_service_1.S3DocumentService])
], S3DocumentController);
//# sourceMappingURL=s3-document.controller.js.map