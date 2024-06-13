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
exports.PostService = void 0;
const inversify_1 = require("inversify");
const inversifyConstants_1 = require("../common/utils/inversifyConstants");
const user_service_1 = __importDefault(require("../user/user.service"));
const not_found_exception_1 = require("../common/exceptions/not-found.exception");
const post_repository_1 = require("./post.repository");
const comment_service_1 = require("../comment/comment.service");
const like_service_1 = require("../like/like.service");
const company_service_1 = require("../company/company.service");
let PostService = class PostService {
    constructor(userService, companyService, commentService, postRepository, likeService) {
        this.postRepository = postRepository;
        this.userService = userService;
        this.companyService = companyService;
        this.commentService = commentService;
        this.likeService = likeService;
    }
    getPostById(id) {
        return this.postRepository.findOne(id);
    }
    getAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.postRepository.findAll();
        });
    }
    getPostsByCompany(companyId) {
        return __awaiter(this, void 0, void 0, function* () {
            const company = yield this.companyService.getCompanyById(companyId);
            if (!company) {
                throw new not_found_exception_1.NotFoundException('Company not found');
            }
            return this.postRepository.findByCompanyId(company.id);
        });
    }
    getMostRecentCompanyPosts(companyId, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const company = yield this.companyService.getCompanyById(companyId);
            if (!company) {
                throw new not_found_exception_1.NotFoundException('Company not found');
            }
            return this.postRepository.findMostRecentByCompanyId(company.id, limit);
        });
    }
    getMostRecentUserPosts(userId, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getUserById(userId);
            if (!user) {
                throw new not_found_exception_1.NotFoundException('User not found');
            }
            return this.postRepository.findMostRecentByUserId(user.id, limit);
        });
    }
    createPost(userId, postDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getUserById(userId);
            if (!user) {
                throw new not_found_exception_1.NotFoundException('User not found');
            }
            const newPost = yield this.postRepository.create(Object.assign(Object.assign({}, postDto), { author: user }));
            return this.getPostById(newPost.id);
        });
    }
    createPostCompany(companyId, postDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const company = yield this.companyService.getCompanyById(companyId);
            if (!company) {
                throw new not_found_exception_1.NotFoundException('Company not found');
            }
            const newPost = yield this.postRepository.create(Object.assign(Object.assign({}, postDto), { company }));
            return this.getPostById(newPost.id);
        });
    }
    likePost(postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield this.getPostById(postId);
            const user = yield this.userService.getUserById(userId);
            if (!post || !user) {
                throw new not_found_exception_1.NotFoundException('User or post not found');
            }
            const alreadyLiked = yield this.likeService.findOneByPostIdAndUserId(postId, userId);
            if (alreadyLiked) {
                return this.getPostById(postId);
            }
            yield this.likeService.createLikePost(post, user);
            return this.postRepository.findOne(postId);
        });
    }
    likePostCompany(postId, companyId) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield this.getPostById(postId);
            const company = yield this.companyService.getCompanyById(companyId);
            if (!post || !company) {
                throw new not_found_exception_1.NotFoundException('Company or post not found');
            }
            const alreadyLiked = yield this.likeService.findOneByPostIdAndCompanyId(postId, companyId);
            if (alreadyLiked) {
                return this.getPostById(postId);
            }
            yield this.likeService.createLikePostCompany(post, company);
            return this.postRepository.findOne(postId);
        });
    }
    unlikePost(postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield this.getPostById(postId);
            const user = yield this.userService.getUserById(userId);
            if (!post || !user) {
                throw new not_found_exception_1.NotFoundException('User or post not found');
            }
            const alreadyLiked = yield this.likeService.findOneByPostIdAndUserId(postId, userId);
            if (!alreadyLiked) {
                return this.getPostById(postId);
            }
            yield this.likeService.delete(alreadyLiked.id);
            return this.postRepository.findOne(postId);
        });
    }
    unlikePostCompany(postId, companyId) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield this.getPostById(postId);
            const company = yield this.companyService.getCompanyById(companyId);
            if (!post || !company) {
                throw new not_found_exception_1.NotFoundException('Company or post not found');
            }
            const alreadyLiked = yield this.likeService.findOneByPostIdAndCompanyId(postId, companyId);
            if (!alreadyLiked) {
                return this.getPostById(postId);
            }
            yield this.likeService.delete(alreadyLiked.id);
            return this.postRepository.findOne(postId);
        });
    }
    commentPost(userId, postId, commentDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getUserById(userId);
            const post = yield this.getPostById(postId);
            if (!user || !post) {
                throw new not_found_exception_1.NotFoundException('User or post not found');
            }
            yield this.commentService.createComment(post, commentDto, userId);
            return this.postRepository.findOne(postId);
        });
    }
    commentPostCompany(companyId, postId, commentDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const company = yield this.companyService.getCompanyById(companyId);
            const post = yield this.getPostById(postId);
            if (!company || !post) {
                throw new not_found_exception_1.NotFoundException('Company or post not found');
            }
            yield this.commentService.createComment(post, commentDto, undefined, company);
            return this.postRepository.findOne(postId);
        });
    }
};
PostService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(inversifyConstants_1.USER_INV.UserService)),
    __param(1, (0, inversify_1.inject)(inversifyConstants_1.COMPANY_INV.CompanyService)),
    __param(2, (0, inversify_1.inject)(inversifyConstants_1.COMMENT_INV.CommentService)),
    __param(3, (0, inversify_1.inject)(inversifyConstants_1.POST_INV.PostRepository)),
    __param(4, (0, inversify_1.inject)(inversifyConstants_1.LIKE_INV.LikeService)),
    __metadata("design:paramtypes", [user_service_1.default,
        company_service_1.CompanyService,
        comment_service_1.CommentService,
        post_repository_1.PostRepository,
        like_service_1.LikeService])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map