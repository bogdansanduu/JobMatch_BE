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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentRepository = void 0;
const inversify_1 = require("inversify");
const comment_entity_1 = require("./entities/comment.entity");
const dataSource_1 = require("../database/dataSource");
let CommentRepository = class CommentRepository {
    constructor() {
        this.commentRepo = dataSource_1.dataSource.getRepository(comment_entity_1.Comment);
    }
    findOne(id) {
        return this.commentRepo.findOne({
            where: {
                id,
            },
            relations: {
                likes: {
                    author: true,
                    company: true,
                },
                post: true,
                author: true,
                company: true,
            },
        });
    }
    findAll() {
        return this.commentRepo.find({
            relations: {
                likes: {
                    author: true,
                    company: true,
                },
                post: true,
                author: true,
                company: true,
            },
        });
    }
    create(commentData) {
        const comment = this.commentRepo.create(commentData);
        return this.commentRepo.save(comment);
    }
};
CommentRepository = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], CommentRepository);
exports.CommentRepository = CommentRepository;
//# sourceMappingURL=comment.repository.js.map