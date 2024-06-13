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
exports.PostController = void 0;
const inversify_1 = require("inversify");
const http_status_codes_1 = require("http-status-codes");
const inversifyConstants_1 = require("../common/utils/inversifyConstants");
const post_service_1 = require("./post.service");
const validateBody_1 = require("../common/utils/validateBody");
const create_post_validation_1 = require("./dtos/create-post.validation");
const not_found_exception_1 = require("../common/exceptions/not-found.exception");
const class_transformer_1 = require("class-transformer");
const post_response_dto_1 = require("./dtos/post-response.dto");
const create_comment_validation_1 = require("../comment/dtos/create-comment.validation");
const jwt_auth_decorator_1 = require("../common/decorators/jwt-auth.decorator");
const requires_roles_decorator_1 = require("../common/decorators/requires-roles.decorator");
const user_constants_1 = require("../common/constants/user.constants");
let PostController = class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    getAllPosts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.postService.getAllPosts();
            const responseData = (0, class_transformer_1.plainToInstance)(post_response_dto_1.PostResponseDto, data, { excludeExtraneousValues: true });
            return res.status(http_status_codes_1.StatusCodes.OK).json(responseData);
        });
    }
    getAllPostByCompany(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const companyId = Number(req.params.companyId);
            const data = yield this.postService.getPostsByCompany(companyId);
            const responseData = (0, class_transformer_1.plainToInstance)(post_response_dto_1.PostResponseDto, data, { excludeExtraneousValues: true });
            return res.status(http_status_codes_1.StatusCodes.OK).json(responseData);
        });
    }
    getMostRecentCompanyPosts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const companyId = Number(req.params.companyId);
            const limit = Number(req.query.limit);
            const data = yield this.postService.getMostRecentCompanyPosts(companyId, limit);
            const responseData = (0, class_transformer_1.plainToInstance)(post_response_dto_1.PostResponseDto, data, { excludeExtraneousValues: true });
            return res.status(http_status_codes_1.StatusCodes.OK).json(responseData);
        });
    }
    getMostRecentUserPosts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = Number(req.params.userId);
            const limit = Number(req.query.limit);
            const data = yield this.postService.getMostRecentUserPosts(userId, limit);
            const responseData = (0, class_transformer_1.plainToInstance)(post_response_dto_1.PostResponseDto, data, { excludeExtraneousValues: true });
            return res.status(http_status_codes_1.StatusCodes.OK).json(responseData);
        });
    }
    createPost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const userId = Number(req.params.userId);
            if (!userId) {
                throw new not_found_exception_1.NotFoundException('User not found');
            }
            yield (0, validateBody_1.validateBody)(body, create_post_validation_1.CreatePostValidation);
            const data = yield this.postService.createPost(userId, body);
            const responseData = (0, class_transformer_1.plainToInstance)(post_response_dto_1.PostResponseDto, data, { excludeExtraneousValues: true });
            return res.status(http_status_codes_1.StatusCodes.CREATED).json(responseData);
        });
    }
    createPostCompany(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const companyId = Number(req.params.companyId);
            if (!companyId) {
                throw new not_found_exception_1.NotFoundException('Company not found');
            }
            yield (0, validateBody_1.validateBody)(body, create_post_validation_1.CreatePostValidation);
            const data = yield this.postService.createPostCompany(companyId, body);
            const responseData = (0, class_transformer_1.plainToInstance)(post_response_dto_1.PostResponseDto, data, { excludeExtraneousValues: true });
            return res.status(http_status_codes_1.StatusCodes.CREATED).json(responseData);
        });
    }
    likePost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const postId = Number(req.params.postId);
            const userId = Number(req.params.userId);
            if (!postId || !userId) {
                throw new not_found_exception_1.NotFoundException('User or post not found');
            }
            const data = yield this.postService.likePost(postId, userId);
            const responseData = (0, class_transformer_1.plainToInstance)(post_response_dto_1.PostResponseDto, data, { excludeExtraneousValues: true });
            return res.status(http_status_codes_1.StatusCodes.OK).json(responseData);
        });
    }
    likePostCompany(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const postId = Number(req.params.postId);
            const companyId = Number(req.params.companyId);
            if (!postId || !companyId) {
                throw new not_found_exception_1.NotFoundException('Company or post not found');
            }
            const data = yield this.postService.likePostCompany(postId, companyId);
            const responseData = (0, class_transformer_1.plainToInstance)(post_response_dto_1.PostResponseDto, data, { excludeExtraneousValues: true });
            return res.status(http_status_codes_1.StatusCodes.OK).json(responseData);
        });
    }
    unlikePost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const postId = Number(req.params.postId);
            const userId = Number(req.params.userId);
            if (!postId || !userId) {
                throw new not_found_exception_1.NotFoundException('User or post not found');
            }
            const data = yield this.postService.unlikePost(postId, userId);
            const responseData = (0, class_transformer_1.plainToInstance)(post_response_dto_1.PostResponseDto, data, { excludeExtraneousValues: true });
            return res.status(http_status_codes_1.StatusCodes.OK).json(responseData);
        });
    }
    unlikePostCompany(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const postId = Number(req.params.postId);
            const companyId = Number(req.params.companyId);
            if (!postId || !companyId) {
                throw new not_found_exception_1.NotFoundException('Company or post not found');
            }
            const data = yield this.postService.unlikePostCompany(postId, companyId);
            const responseData = (0, class_transformer_1.plainToInstance)(post_response_dto_1.PostResponseDto, data, { excludeExtraneousValues: true });
            return res.status(http_status_codes_1.StatusCodes.OK).json(responseData);
        });
    }
    commentPost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const userId = Number(req.params.userId);
            const postId = Number(req.params.postId);
            if (!userId || !postId) {
                throw new not_found_exception_1.NotFoundException('User or post not found');
            }
            yield (0, validateBody_1.validateBody)(body, create_comment_validation_1.CreateCommentValidation);
            const data = yield this.postService.commentPost(userId, postId, body);
            const responseData = (0, class_transformer_1.plainToInstance)(post_response_dto_1.PostResponseDto, data, { excludeExtraneousValues: true });
            return res.status(http_status_codes_1.StatusCodes.OK).json(responseData);
        });
    }
    commentPostCompany(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const companyId = Number(req.params.companyId);
            const postId = Number(req.params.postId);
            if (!companyId || !postId) {
                throw new not_found_exception_1.NotFoundException('Company or post not found');
            }
            yield (0, validateBody_1.validateBody)(body, create_comment_validation_1.CreateCommentValidation);
            const data = yield this.postService.commentPostCompany(companyId, postId, body);
            const responseData = (0, class_transformer_1.plainToInstance)(post_response_dto_1.PostResponseDto, data, { excludeExtraneousValues: true });
            return res.status(http_status_codes_1.StatusCodes.OK).json(responseData);
        });
    }
};
__decorate([
    (0, jwt_auth_decorator_1.JwtAuth)(),
    (0, requires_roles_decorator_1.RequiresRoles)([user_constants_1.Roles.USER, user_constants_1.Roles.COMPANY, user_constants_1.Roles.COMPANY_OWNER]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getAllPosts", null);
PostController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(inversifyConstants_1.POST_INV.PostService)),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
exports.PostController = PostController;
//# sourceMappingURL=post.controller.js.map