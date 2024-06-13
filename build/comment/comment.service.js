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
exports.CommentService = void 0;
const inversify_1 = require("inversify");
const comment_repository_1 = require("./comment.repository");
const inversifyConstants_1 = require("../common/utils/inversifyConstants");
const not_found_exception_1 = require("../common/exceptions/not-found.exception");
const like_service_1 = require("../like/like.service");
const user_service_1 = __importDefault(require("../user/user.service"));
const company_service_1 = require("../company/company.service");
let CommentService = class CommentService {
    constructor(userService, companyService, likeService, commentRepository) {
        this.userService = userService;
        this.companyService = companyService;
        this.likeService = likeService;
        this.commentRepository = commentRepository;
    }
    getCommentById(id) {
        return this.commentRepository.findOne(id);
    }
    getAllComments() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.commentRepository.findAll();
        });
    }
    createComment(post, commentDto, user, company) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((!user && !company) || !post) {
                throw new not_found_exception_1.NotFoundException('User or company or post not found');
            }
            yield this.commentRepository.create(Object.assign(Object.assign(Object.assign(Object.assign({}, commentDto), { post: post }), (user && { author: user })), (company && { company: company })));
        });
    }
    likeComment(commentId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield this.getCommentById(commentId);
            const user = yield this.userService.getUserById(userId);
            if (!comment || !user) {
                throw new not_found_exception_1.NotFoundException('User or comment not found');
            }
            const alreadyLiked = yield this.likeService.findOneByCommentIdAndUserId(commentId, userId);
            if (alreadyLiked) {
                return this.getCommentById(commentId);
            }
            yield this.likeService.createLikeComment(comment, user);
            return this.commentRepository.findOne(commentId);
        });
    }
    likeCommentCompany(commentId, companyId) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield this.getCommentById(commentId);
            const company = yield this.companyService.getCompanyById(companyId);
            if (!comment || !company) {
                throw new not_found_exception_1.NotFoundException('Company or comment not found');
            }
            const alreadyLiked = yield this.likeService.findOneByCommentIdAndCompanyId(commentId, companyId);
            if (alreadyLiked) {
                return this.getCommentById(commentId);
            }
            yield this.likeService.createLikeCommentCompany(comment, company);
            return this.commentRepository.findOne(commentId);
        });
    }
    unlikeComment(commentId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield this.getCommentById(commentId);
            const user = yield this.userService.getUserById(userId);
            if (!comment || !user) {
                throw new not_found_exception_1.NotFoundException('User or comment not found');
            }
            const alreadyLiked = yield this.likeService.findOneByCommentIdAndUserId(commentId, userId);
            if (!alreadyLiked) {
                return this.getCommentById(commentId);
            }
            yield this.likeService.delete(alreadyLiked.id);
            return this.getCommentById(commentId);
        });
    }
    unlikeCommentCompany(commentId, companyId) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield this.getCommentById(commentId);
            const company = yield this.companyService.getCompanyById(companyId);
            if (!comment || !company) {
                throw new not_found_exception_1.NotFoundException('Company or comment not found');
            }
            const alreadyLiked = yield this.likeService.findOneByCommentIdAndCompanyId(commentId, companyId);
            if (!alreadyLiked) {
                return this.getCommentById(commentId);
            }
            yield this.likeService.delete(alreadyLiked.id);
            return this.getCommentById(commentId);
        });
    }
};
CommentService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(inversifyConstants_1.USER_INV.UserService)),
    __param(1, (0, inversify_1.inject)(inversifyConstants_1.COMPANY_INV.CompanyService)),
    __param(2, (0, inversify_1.inject)(inversifyConstants_1.LIKE_INV.LikeService)),
    __param(3, (0, inversify_1.inject)(inversifyConstants_1.COMMENT_INV.CommentRepository)),
    __metadata("design:paramtypes", [user_service_1.default,
        company_service_1.CompanyService,
        like_service_1.LikeService,
        comment_repository_1.CommentRepository])
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map