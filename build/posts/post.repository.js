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
exports.PostRepository = void 0;
const inversify_1 = require("inversify");
const post_entity_1 = require("./entities/post.entity");
const dataSource_1 = require("../database/dataSource");
let PostRepository = class PostRepository {
    constructor() {
        this.postRepo = dataSource_1.dataSource.getRepository(post_entity_1.Post);
    }
    findOne(id) {
        return this.postRepo.findOne({
            where: {
                id,
            },
            relations: {
                likes: {
                    author: true,
                    company: true,
                },
                comments: {
                    author: true,
                    likes: {
                        author: true,
                        company: true,
                    },
                    post: true,
                },
                author: true,
                company: true,
            },
        });
    }
    findAll() {
        return this.postRepo.find({
            relations: {
                likes: {
                    author: true,
                    company: true,
                },
                comments: {
                    author: true,
                    likes: {
                        author: true,
                        company: true,
                    },
                    post: true,
                },
                author: true,
                company: true,
            },
            order: {
                createdAt: 'DESC',
            },
        });
    }
    findByUserId(userId) {
        return this.postRepo.find({
            where: {
                author: {
                    id: userId,
                },
            },
            relations: {
                likes: {
                    author: true,
                    company: true,
                },
                comments: {
                    author: true,
                    likes: {
                        author: true,
                        company: true,
                    },
                    post: true,
                },
                author: true,
                company: true,
            },
            order: {
                createdAt: 'DESC',
            },
        });
    }
    findByCompanyId(companyId) {
        return this.postRepo.find({
            where: {
                company: {
                    id: companyId,
                },
            },
            relations: {
                likes: {
                    author: true,
                    company: true,
                },
                comments: {
                    author: true,
                    likes: {
                        author: true,
                        company: true,
                    },
                    post: true,
                },
                author: true,
                company: true,
            },
            order: {
                createdAt: 'DESC',
            },
        });
    }
    findMostRecentByCompanyId(companyId, limit) {
        return this.postRepo.find({
            where: {
                company: {
                    id: companyId,
                },
            },
            take: limit,
            relations: {
                likes: {
                    author: true,
                    company: true,
                },
                comments: {
                    author: true,
                    likes: {
                        author: true,
                        company: true,
                    },
                    post: true,
                },
                author: true,
                company: true,
            },
            order: {
                createdAt: 'DESC',
            },
        });
    }
    findMostRecentByUserId(userId, limit) {
        return this.postRepo.find({
            where: {
                author: {
                    id: userId,
                },
            },
            take: limit,
            relations: {
                likes: {
                    author: true,
                    company: true,
                },
                comments: {
                    author: true,
                    likes: {
                        author: true,
                        company: true,
                    },
                    post: true,
                },
                author: true,
                company: true,
            },
            order: {
                createdAt: 'DESC',
            },
        });
    }
    create(postData) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = this.postRepo.create(postData);
            return this.postRepo.save(post);
        });
    }
    update(id, post) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.postRepo.update(id, post);
            return this.findOne(id);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.postRepo.delete(id);
        });
    }
    deleteByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.postRepo.delete({
                author: {
                    id: userId,
                },
            });
        });
    }
    deleteByCompanyId(companyId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.postRepo.delete({
                company: {
                    id: companyId,
                },
            });
        });
    }
};
exports.PostRepository = PostRepository;
exports.PostRepository = PostRepository = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], PostRepository);
//# sourceMappingURL=post.repository.js.map