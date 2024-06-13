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
exports.JobSavedController = void 0;
const inversify_1 = require("inversify");
const http_status_codes_1 = require("http-status-codes");
const job_saved_service_1 = require("./job-saved.service");
const inversifyConstants_1 = require("../common/utils/inversifyConstants");
let JobSavedController = class JobSavedController {
    constructor(jobSavedService) {
        this.jobSavedService = jobSavedService;
    }
    getAllSavedJobs(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.jobSavedService.getAllSavedJobs();
            return res.status(http_status_codes_1.StatusCodes.OK).json(data);
        });
    }
    getAllSavedJobsForUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = Number(req.params.userId);
            const data = yield this.jobSavedService.getAllSavedJobsForUser(userId);
            return res.status(http_status_codes_1.StatusCodes.OK).json(data);
        });
    }
    saveJob(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = Number(req.body.userId);
            const jobId = Number(req.body.jobId);
            const data = yield this.jobSavedService.saveJob(userId, jobId);
            return res.status(http_status_codes_1.StatusCodes.CREATED).json(data);
        });
    }
    unsaveJob(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = Number(req.body.userId);
            const jobId = Number(req.body.jobId);
            yield this.jobSavedService.unsaveJob(userId, jobId);
            return res.status(http_status_codes_1.StatusCodes.OK).json({ jobId });
        });
    }
};
JobSavedController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(inversifyConstants_1.JOB_SAVED_INV.JobSavedService)),
    __metadata("design:paramtypes", [job_saved_service_1.JobSavedService])
], JobSavedController);
exports.JobSavedController = JobSavedController;
//# sourceMappingURL=job-saved.controller.js.map