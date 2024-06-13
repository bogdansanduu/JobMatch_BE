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
exports.PostResponseDto = exports.PostSimpleResponseDto = void 0;
const class_transformer_1 = require("class-transformer");
const user_response_dto_1 = require("../../user/dtos/user-response.dto");
const like_response_dto_1 = require("../../like/dtos/like-response.dto");
const comment_response_dto_1 = require("../../comment/dtos/comment-response.dto");
const company_response_dto_1 = require("../../company/dtos/company-response.dto");
let PostSimpleResponseDto = class PostSimpleResponseDto {
};
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], PostSimpleResponseDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => user_response_dto_1.UserSimpleResponseDto),
    __metadata("design:type", user_response_dto_1.UserSimpleResponseDto)
], PostSimpleResponseDto.prototype, "author", void 0);
PostSimpleResponseDto = __decorate([
    (0, class_transformer_1.Exclude)()
], PostSimpleResponseDto);
exports.PostSimpleResponseDto = PostSimpleResponseDto;
let PostResponseDto = class PostResponseDto {
};
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], PostResponseDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PostResponseDto.prototype, "title", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PostResponseDto.prototype, "content", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PostResponseDto.prototype, "picture", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => user_response_dto_1.UserResponseDto),
    __metadata("design:type", user_response_dto_1.UserResponseDto)
], PostResponseDto.prototype, "author", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => company_response_dto_1.CompanyResponseDto),
    __metadata("design:type", company_response_dto_1.CompanyResponseDto)
], PostResponseDto.prototype, "company", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => like_response_dto_1.LikeResponseDto),
    __metadata("design:type", Array)
], PostResponseDto.prototype, "likes", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => comment_response_dto_1.CommentResponseDto),
    __metadata("design:type", Array)
], PostResponseDto.prototype, "comments", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], PostResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], PostResponseDto.prototype, "updatedAt", void 0);
PostResponseDto = __decorate([
    (0, class_transformer_1.Exclude)()
], PostResponseDto);
exports.PostResponseDto = PostResponseDto;
//# sourceMappingURL=post-response.dto.js.map