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
exports.RecommendationController = void 0;
const inversify_1 = require("inversify");
const http_status_codes_1 = require("http-status-codes");
const recommendation_service_1 = require("./recommendation.service");
const inversifyConstants_1 = require("../common/utils/inversifyConstants");
const validateBody_1 = require("../common/utils/validateBody");
const get_recommendations_validation_1 = require("./dtos/get-recommendations.validation");
const class_transformer_1 = require("class-transformer");
const job_response_dto_1 = require("../job/dtos/job-response.dto");
const jwt_auth_decorator_1 = require("../common/decorators/jwt-auth.decorator");
const requires_roles_decorator_1 = require("../common/decorators/requires-roles.decorator");
const user_constants_1 = require("../common/constants/user.constants");
let RecommendationController = class RecommendationController {
    constructor(recommendationService) {
        this.recommendationService = recommendationService;
    }
    populateRecommendations(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.recommendationService.populateRecommendations();
            return res.status(http_status_codes_1.StatusCodes.CREATED).json({ message: 'Database populated for recommendations' });
        });
    }
    getRecommendations(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            yield (0, validateBody_1.validateBody)(body, get_recommendations_validation_1.GetRecommendationsValidation);
            const data = yield this.recommendationService.getRecommendations(body);
            const responseData = (0, class_transformer_1.plainToInstance)(job_response_dto_1.JobResponseDto, data, { excludeExtraneousValues: true });
            return res.status(http_status_codes_1.StatusCodes.OK).json(responseData);
        });
    }
};
exports.RecommendationController = RecommendationController;
__decorate([
    (0, jwt_auth_decorator_1.JwtAuth)(),
    (0, requires_roles_decorator_1.RequiresRoles)([user_constants_1.Roles.ADMIN]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], RecommendationController.prototype, "populateRecommendations", null);
__decorate([
    (0, jwt_auth_decorator_1.JwtAuth)(),
    (0, requires_roles_decorator_1.RequiresRoles)([user_constants_1.Roles.ADMIN, user_constants_1.Roles.USER, user_constants_1.Roles.COMPANY, user_constants_1.Roles.COMPANY_OWNER]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], RecommendationController.prototype, "getRecommendations", null);
exports.RecommendationController = RecommendationController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(inversifyConstants_1.RECOMMENDATION_INV.RecommendationService)),
    __metadata("design:paramtypes", [recommendation_service_1.RecommendationService])
], RecommendationController);
//# sourceMappingURL=recommendation.controller.js.map