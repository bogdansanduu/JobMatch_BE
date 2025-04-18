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
exports.LikeRepository = void 0;
const inversify_1 = require("inversify");
const like_entity_1 = require("./entities/like.entity");
const dataSource_1 = require("../database/dataSource");
let LikeRepository = class LikeRepository {
    constructor() {
        this.likeRepo = dataSource_1.dataSource.getRepository(like_entity_1.Like);
    }
    create(likeData) {
        return __awaiter(this, void 0, void 0, function* () {
            const like = this.likeRepo.create(likeData);
            return this.likeRepo.save(like);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.likeRepo.delete(id);
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.likeRepo.findOne({
                where: {
                    id,
                },
            });
        });
    }
    findOneByPostAndUser(postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.likeRepo.findOne({
                where: {
                    post: {
                        id: postId,
                    },
                    author: {
                        id: userId,
                    },
                },
            });
        });
    }
    findOneByPostAndCompany(postId, companyId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.likeRepo.findOne({
                where: {
                    post: {
                        id: postId,
                    },
                    company: {
                        id: companyId,
                    },
                },
            });
        });
    }
    findOneByCommentAndUser(commentId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.likeRepo.findOne({
                where: {
                    comment: {
                        id: commentId,
                    },
                    author: {
                        id: userId,
                    },
                },
            });
        });
    }
    findOneByCommentAndCompany(commentId, companyId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.likeRepo.findOne({
                where: {
                    comment: {
                        id: commentId,
                    },
                    company: {
                        id: companyId,
                    },
                },
            });
        });
    }
    deleteByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.likeRepo.delete({
                author: {
                    id: userId,
                },
            });
        });
    }
    deleteByCompanyId(companyId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.likeRepo.delete({
                company: {
                    id: companyId,
                },
            });
        });
    }
};
exports.LikeRepository = LikeRepository;
exports.LikeRepository = LikeRepository = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], LikeRepository);
//# sourceMappingURL=like.repository.js.map