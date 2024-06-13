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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.JobApplicationController = void 0;
const inversify_1 = require("inversify");
const http_status_codes_1 = require("http-status-codes");
const class_transformer_1 = require("class-transformer");
const job_application_service_1 = require("./job-application.service");
const inversifyConstants_1 = require("../common/utils/inversifyConstants");
const job_application_response_dto_1 = require("./dtos/job-application-response.dto");
const validateBody_1 = require("../common/utils/validateBody");
const review_application_validation_1 = require("./dtos/review-application.validation");
let JobApplicationController = class JobApplicationController {
    constructor(jobApplicationService) {
        this.jobApplicationService = jobApplicationService;
    }
    getAllJobApplications(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.jobApplicationService.getAllJobApplications();
            const responseData = (0, class_transformer_1.plainToInstance)(job_application_response_dto_1.JobApplicationResponseDto, data, { excludeExtraneousValues: true });
            return res.status(http_status_codes_1.StatusCodes.OK).json(responseData);
        });
    }
    getJobApplicationById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const data = yield this.jobApplicationService.getJobApplicationById(id);
            const responseData = (0, class_transformer_1.plainToInstance)(job_application_response_dto_1.JobApplicationResponseDto, data, { excludeExtraneousValues: true });
            return res.status(http_status_codes_1.StatusCodes.OK).json(responseData);
        });
    }
    getAllJobApplicationsForUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = Number(req.params.userId);
            const data = yield this.jobApplicationService.getAllJobApplicationsForUser(userId);
            const responseData = (0, class_transformer_1.plainToInstance)(job_application_response_dto_1.JobApplicationResponseDto, data, { excludeExtraneousValues: true });
            return res.status(http_status_codes_1.StatusCodes.OK).json(responseData);
        });
    }
    getAllJobApplicationsForJob(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const jobId = Number(req.params.jobId);
            const data = yield this.jobApplicationService.getAllJobApplicationsForJob(jobId);
            const responseData = (0, class_transformer_1.plainToInstance)(job_application_response_dto_1.JobApplicationResponseDto, data, { excludeExtraneousValues: true });
            return res.status(http_status_codes_1.StatusCodes.OK).json(responseData);
        });
    }
    applyForJob(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = Number(req.params.userId);
            const jobId = Number(req.params.jobId);
            const data = yield this.jobApplicationService.applyForJob(userId, jobId);
            const responseData = (0, class_transformer_1.plainToInstance)(job_application_response_dto_1.JobApplicationResponseDto, data, { excludeExtraneousValues: true });
            return res.status(http_status_codes_1.StatusCodes.CREATED).json(responseData);
        });
    }
    reviewApplication(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const body = req.body;
            yield (0, validateBody_1.validateBody)(body, review_application_validation_1.ReviewApplicationValidation);
            const data = yield this.jobApplicationService.reviewApplication(id, body);
            const responseData = (0, class_transformer_1.plainToInstance)(job_application_response_dto_1.JobApplicationResponseDto, data, { excludeExtraneousValues: true });
            return res.status(http_status_codes_1.StatusCodes.OK).json(responseData);
        });
    }
};
JobApplicationController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(inversifyConstants_1.JOB_APPLICATION_INV.JobApplicationService)),
    __metadata("design:paramtypes", [job_application_service_1.JobApplicationService])
], JobApplicationController);
exports.JobApplicationController = JobApplicationController;
//# sourceMappingURL=job-application.controller.js.map