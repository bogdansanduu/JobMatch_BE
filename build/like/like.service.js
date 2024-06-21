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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeService = void 0;
const inversify_1 = require("inversify");
const like_repository_1 = require("./like.repository");
const inversifyConstants_1 = require("../common/utils/inversifyConstants");
let LikeService = class LikeService {
    constructor(likeRepository) {
        this.likeRepository = likeRepository;
    }
    findOneByPostIdAndUserId(postId, userId) {
        return this.likeRepository.findOneByPostAndUser(postId, userId);
    }
    findOneByPostIdAndCompanyId(postId, companyId) {
        return this.likeRepository.findOneByPostAndCompany(postId, companyId);
    }
    findOneByCommentIdAndUserId(commentId, userId) {
        return this.likeRepository.findOneByCommentAndUser(commentId, userId);
    }
    findOneByCommentIdAndCompanyId(commentId, companyId) {
        return this.likeRepository.findOneByCommentAndCompany(commentId, companyId);
    }
    delete(likeId) {
        return this.likeRepository.delete(likeId);
    }
    createLikePost(post, author) {
        return this.likeRepository.create({
            post,
            author,
        });
    }
    createLikePostCompany(post, company) {
        return this.likeRepository.create({
            post,
            company,
        });
    }
    createLikeComment(comment, author) {
        return this.likeRepository.create({
            comment,
            author,
        });
    }
    createLikeCommentCompany(comment, company) {
        return this.likeRepository.create({
            comment,
            company,
        });
    }
    removeLikesByUserId(userId) {
        return this.likeRepository.deleteByUserId(userId);
    }
    removeLikesByCompanyId(companyId) {
        return this.likeRepository.deleteByCompanyId(companyId);
    }
};
exports.LikeService = LikeService;
exports.LikeService = LikeService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(inversifyConstants_1.LIKE_INV.LikeRepository)),
    __metadata("design:paramtypes", [like_repository_1.LikeRepository])
], LikeService);
//# sourceMappingURL=like.service.js.map