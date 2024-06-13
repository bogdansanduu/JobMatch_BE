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
var UserResponseDto_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSimpleResponseDto = exports.UserResponseDto = void 0;
const class_transformer_1 = require("class-transformer");
const company_entity_1 = require("../../company/entities/company.entity");
const company_response_dto_1 = require("../../company/dtos/company-response.dto");
const job_application_response_dto_1 = require("../../job-application/dtos/job-application-response.dto");
let UserResponseDto = UserResponseDto_1 = class UserResponseDto {
};
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], UserResponseDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserResponseDto.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserResponseDto.prototype, "firstName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserResponseDto.prototype, "lastName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserResponseDto.prototype, "profilePicture", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserResponseDto.prototype, "country", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserResponseDto.prototype, "state", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserResponseDto.prototype, "city", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserResponseDto.prototype, "resume", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], UserResponseDto.prototype, "resumeFile", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserResponseDto.prototype, "socketId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => UserResponseDto_1),
    __metadata("design:type", Array)
], UserResponseDto.prototype, "followers", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => UserResponseDto_1),
    __metadata("design:type", Array)
], UserResponseDto.prototype, "following", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => job_application_response_dto_1.JobApplicationResponseDto),
    __metadata("design:type", Array)
], UserResponseDto.prototype, "jobApplications", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], UserResponseDto.prototype, "jobSaved", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserResponseDto.prototype, "role", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => company_response_dto_1.CompanySimpleResponseDto),
    __metadata("design:type", company_entity_1.Company)
], UserResponseDto.prototype, "company", void 0);
UserResponseDto = UserResponseDto_1 = __decorate([
    (0, class_transformer_1.Exclude)()
], UserResponseDto);
exports.UserResponseDto = UserResponseDto;
let UserSimpleResponseDto = class UserSimpleResponseDto {
};
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], UserSimpleResponseDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserSimpleResponseDto.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserSimpleResponseDto.prototype, "firstName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserSimpleResponseDto.prototype, "lastName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserSimpleResponseDto.prototype, "profilePicture", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserSimpleResponseDto.prototype, "resume", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], UserSimpleResponseDto.prototype, "resumeFile", void 0);
UserSimpleResponseDto = __decorate([
    (0, class_transformer_1.Exclude)()
], UserSimpleResponseDto);
exports.UserSimpleResponseDto = UserSimpleResponseDto;
//# sourceMappingURL=user-response.dto.js.map