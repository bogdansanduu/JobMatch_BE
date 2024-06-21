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
exports.JobSavedResponseDto = void 0;
const class_transformer_1 = require("class-transformer");
const job_response_dto_1 = require("../../job/dtos/job-response.dto");
const user_response_dto_1 = require("../../user/dtos/user-response.dto");
let JobSavedResponseDto = class JobSavedResponseDto {
};
exports.JobSavedResponseDto = JobSavedResponseDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], JobSavedResponseDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => job_response_dto_1.JobResponseDto),
    __metadata("design:type", job_response_dto_1.JobResponseDto)
], JobSavedResponseDto.prototype, "job", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => user_response_dto_1.UserSimpleResponseDto),
    __metadata("design:type", user_response_dto_1.UserSimpleResponseDto)
], JobSavedResponseDto.prototype, "user", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], JobSavedResponseDto.prototype, "savedAt", void 0);
exports.JobSavedResponseDto = JobSavedResponseDto = __decorate([
    (0, class_transformer_1.Expose)()
], JobSavedResponseDto);
//# sourceMappingURL=job-saved-response.dto.js.map