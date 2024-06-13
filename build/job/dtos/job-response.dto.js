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
exports.JobResponseDto = void 0;
const class_transformer_1 = require("class-transformer");
const company_response_dto_1 = require("../../company/dtos/company-response.dto");
const job_application_response_dto_1 = require("../../job-application/dtos/job-application-response.dto");
let JobResponseDto = class JobResponseDto {
};
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], JobResponseDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], JobResponseDto.prototype, "title", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], JobResponseDto.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], JobResponseDto.prototype, "category", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], JobResponseDto.prototype, "country", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], JobResponseDto.prototype, "state", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], JobResponseDto.prototype, "city", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], JobResponseDto.prototype, "lat", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], JobResponseDto.prototype, "lng", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], JobResponseDto.prototype, "responsibilities", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], JobResponseDto.prototype, "minimumQualifications", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], JobResponseDto.prototype, "preferredQualifications", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => job_application_response_dto_1.JobApplicationResponseDto),
    __metadata("design:type", Array)
], JobResponseDto.prototype, "applications", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], JobResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], JobResponseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => company_response_dto_1.CompanyResponseDto),
    __metadata("design:type", company_response_dto_1.CompanyResponseDto)
], JobResponseDto.prototype, "company", void 0);
JobResponseDto = __decorate([
    (0, class_transformer_1.Exclude)()
], JobResponseDto);
exports.JobResponseDto = JobResponseDto;
//# sourceMappingURL=job-response.dto.js.map