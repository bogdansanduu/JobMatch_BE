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
exports.CompanySimpleResponseDto = exports.CompanyResponseDto = void 0;
const class_transformer_1 = require("class-transformer");
const user_response_dto_1 = require("../../user/dtos/user-response.dto");
let CompanyResponseDto = class CompanyResponseDto {
};
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], CompanyResponseDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CompanyResponseDto.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CompanyResponseDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CompanyResponseDto.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CompanyResponseDto.prototype, "profilePicture", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CompanyResponseDto.prototype, "industry", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CompanyResponseDto.prototype, "country", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CompanyResponseDto.prototype, "state", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CompanyResponseDto.prototype, "city", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => user_response_dto_1.UserSimpleResponseDto),
    __metadata("design:type", user_response_dto_1.UserSimpleResponseDto)
], CompanyResponseDto.prototype, "owner", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], CompanyResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], CompanyResponseDto.prototype, "updatedAt", void 0);
CompanyResponseDto = __decorate([
    (0, class_transformer_1.Exclude)()
], CompanyResponseDto);
exports.CompanyResponseDto = CompanyResponseDto;
let CompanySimpleResponseDto = class CompanySimpleResponseDto {
};
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], CompanySimpleResponseDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CompanySimpleResponseDto.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CompanySimpleResponseDto.prototype, "name", void 0);
CompanySimpleResponseDto = __decorate([
    (0, class_transformer_1.Exclude)()
], CompanySimpleResponseDto);
exports.CompanySimpleResponseDto = CompanySimpleResponseDto;
//# sourceMappingURL=company-response.dto.js.map