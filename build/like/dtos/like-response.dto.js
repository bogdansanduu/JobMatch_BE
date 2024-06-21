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
exports.LikeResponseDto = void 0;
const class_transformer_1 = require("class-transformer");
const user_response_dto_1 = require("../../user/dtos/user-response.dto");
const company_response_dto_1 = require("../../company/dtos/company-response.dto");
let LikeResponseDto = class LikeResponseDto {
};
exports.LikeResponseDto = LikeResponseDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], LikeResponseDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => company_response_dto_1.CompanySimpleResponseDto),
    __metadata("design:type", company_response_dto_1.CompanySimpleResponseDto)
], LikeResponseDto.prototype, "company", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => user_response_dto_1.UserSimpleResponseDto),
    __metadata("design:type", user_response_dto_1.UserSimpleResponseDto)
], LikeResponseDto.prototype, "author", void 0);
exports.LikeResponseDto = LikeResponseDto = __decorate([
    (0, class_transformer_1.Expose)()
], LikeResponseDto);
//# sourceMappingURL=like-response.dto.js.map