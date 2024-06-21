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
exports.Like = void 0;
const typeorm_1 = require("typeorm");
const post_entity_1 = require("../../posts/entities/post.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const comment_entity_1 = require("../../comment/entities/comment.entity");
const company_entity_1 = require("../../company/entities/company.entity");
let Like = class Like extends typeorm_1.BaseEntity {
};
exports.Like = Like;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Like.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => post_entity_1.Post, (post) => post.likes, { onDelete: 'CASCADE' }),
    __metadata("design:type", post_entity_1.Post)
], Like.prototype, "post", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => comment_entity_1.Comment, (comment) => comment.likes, { onDelete: 'CASCADE' }),
    __metadata("design:type", comment_entity_1.Comment)
], Like.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.likes),
    __metadata("design:type", user_entity_1.User)
], Like.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => company_entity_1.Company, (company) => company.likes),
    __metadata("design:type", company_entity_1.Company)
], Like.prototype, "company", void 0);
exports.Like = Like = __decorate([
    (0, typeorm_1.Entity)()
], Like);
//# sourceMappingURL=like.entity.js.map