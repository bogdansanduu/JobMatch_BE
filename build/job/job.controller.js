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
exports.JobController = void 0;
const inversify_1 = require("inversify");
const job_service_1 = require("./job.service");
const inversifyConstants_1 = require("../common/utils/inversifyConstants");
const http_status_codes_1 = require("http-status-codes");
const class_transformer_1 = require("class-transformer");
const job_response_dto_1 = require("./dtos/job-response.dto");
const validateBody_1 = require("../common/utils/validateBody");
const create_job_validation_1 = require("./dtos/create-job.validation");
let JobController = class JobController {
    constructor(jobService) {
        this.jobService = jobService;
    }
    getAllJobs(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.jobService.getAllJobs();
            const responseData = (0, class_transformer_1.plainToInstance)(job_response_dto_1.JobResponseDto, data, { excludeExtraneousValues: true });
            return res.status(http_status_codes_1.StatusCodes.OK).json(responseData);
        });
    }
    getJobById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const jobId = Number(req.params.jobId);
            const data = yield this.jobService.getJobById(jobId);
            const responseData = (0, class_transformer_1.plainToInstance)(job_response_dto_1.JobResponseDto, data, { excludeExtraneousValues: true });
            return res.status(http_status_codes_1.StatusCodes.OK).json(responseData);
        });
    }
    getAllJobsByCompany(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const companyId = Number(req.params.companyId);
            const data = yield this.jobService.getAllJobsByCompany(companyId);
            const responseData = (0, class_transformer_1.plainToInstance)(job_response_dto_1.JobResponseDto, data, { excludeExtraneousValues: true });
            return res.status(http_status_codes_1.StatusCodes.OK).json(responseData);
        });
    }
    getAllJobsPaginated(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;
            const searchTerm = req.query.searchTerm;
            const jobsPaginated = yield this.jobService.getAllJobsPaginated(page, limit, searchTerm);
            const responseData = (0, class_transformer_1.plainToInstance)(job_response_dto_1.JobResponseDto, jobsPaginated.data, { excludeExtraneousValues: true });
            return res.status(http_status_codes_1.StatusCodes.OK).json(Object.assign(Object.assign({}, jobsPaginated), { data: responseData }));
        });
    }
    createJob(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            yield (0, validateBody_1.validateBody)(body, create_job_validation_1.CreateJobValidation);
            const data = yield this.jobService.createJob(body);
            const responseData = (0, class_transformer_1.plainToInstance)(job_response_dto_1.JobResponseDto, data, { excludeExtraneousValues: true });
            return res.status(http_status_codes_1.StatusCodes.CREATED).json(responseData);
        });
    }
    addRecSysJobs(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.jobService.addRecSysJobs();
            const responseData = (0, class_transformer_1.plainToInstance)(job_response_dto_1.JobResponseDto, data, { excludeExtraneousValues: true });
            return res.status(http_status_codes_1.StatusCodes.CREATED).json(responseData);
        });
    }
};
JobController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(inversifyConstants_1.JOB_INV.JobService)),
    __metadata("design:paramtypes", [job_service_1.JobService])
], JobController);
exports.JobController = JobController;
//# sourceMappingURL=job.controller.js.map