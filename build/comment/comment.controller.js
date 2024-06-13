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
exports.CommentController = void 0;
const inversify_1 = require("inversify");
const http_status_codes_1 = require("http-status-codes");
const class_transformer_1 = require("class-transformer");
const comment_service_1 = require("./comment.service");
const inversifyConstants_1 = require("../common/utils/inversifyConstants");
const not_found_exception_1 = require("../common/exceptions/not-found.exception");
const comment_response_dto_1 = require("./dtos/comment-response.dto");
let CommentController = class CommentController {
    constructor(commentService) {
        this.commentService = commentService;
    }
    getAllComments(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.commentService.getAllComments();
            const responseData = (0, class_transformer_1.plainToInstance)(comment_response_dto_1.CommentResponseDto, data, { excludeExtraneousValues: true });
            return res.status(http_status_codes_1.StatusCodes.OK).json(responseData);
        });
    }
    likeComment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const commentId = Number(req.params.commentId);
            const userId = Number(req.params.userId);
            if (!commentId || !userId) {
                throw new not_found_exception_1.NotFoundException('User or comment not found');
            }
            const data = yield this.commentService.likeComment(commentId, userId);
            const responseData = (0, class_transformer_1.plainToInstance)(comment_response_dto_1.CommentResponseDto, data, { excludeExtraneousValues: true });
            return res.status(http_status_codes_1.StatusCodes.OK).json(responseData);
        });
    }
    likeCommentCompany(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const commentId = Number(req.params.commentId);
            const companyId = Number(req.params.companyId);
            if (!commentId || !companyId) {
                throw new not_found_exception_1.NotFoundException('Company or comment not found');
            }
            const data = yield this.commentService.likeCommentCompany(commentId, companyId);
            const responseData = (0, class_transformer_1.plainToInstance)(comment_response_dto_1.CommentResponseDto, data, { excludeExtraneousValues: true });
            return res.status(http_status_codes_1.StatusCodes.OK).json(responseData);
        });
    }
    unlikeComment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const commentId = Number(req.params.commentId);
            const userId = Number(req.params.userId);
            if (!commentId || !userId) {
                throw new not_found_exception_1.NotFoundException('User or comment not found');
            }
            const data = yield this.commentService.unlikeComment(commentId, userId);
            const responseData = (0, class_transformer_1.plainToInstance)(comment_response_dto_1.CommentResponseDto, data, { excludeExtraneousValues: true });
            return res.status(http_status_codes_1.StatusCodes.OK).json(responseData);
        });
    }
    unlikeCommentCompany(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const commentId = Number(req.params.commentId);
            const companyId = Number(req.params.companyId);
            if (!commentId || !companyId) {
                throw new not_found_exception_1.NotFoundException('Company or comment not found');
            }
            const data = yield this.commentService.unlikeCommentCompany(commentId, companyId);
            const responseData = (0, class_transformer_1.plainToInstance)(comment_response_dto_1.CommentResponseDto, data, { excludeExtraneousValues: true });
            return res.status(http_status_codes_1.StatusCodes.OK).json(responseData);
        });
    }
};
CommentController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(inversifyConstants_1.COMMENT_INV.CommentService)),
    __metadata("design:paramtypes", [comment_service_1.CommentService])
], CommentController);
exports.CommentController = CommentController;
//# sourceMappingURL=comment.controller.js.map