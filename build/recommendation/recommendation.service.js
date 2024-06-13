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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecommendationService = void 0;
const inversify_1 = require("inversify");
const axios_1 = __importDefault(require("axios"));
const process_1 = __importDefault(require("process"));
const user_service_1 = __importDefault(require("../user/user.service"));
const company_service_1 = require("../company/company.service");
const job_service_1 = require("../job/job.service");
const inversifyConstants_1 = require("../common/utils/inversifyConstants");
const http_exception_1 = require("../common/exceptions/http.exception");
let RecommendationService = class RecommendationService {
    constructor(userService, companyService, jobService) {
        this.userService = userService;
        this.companyService = companyService;
        this.jobService = jobService;
    }
    populateRecommendations() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userService.addRecSysUsers();
            yield this.companyService.addRecSysCompanies();
            yield this.jobService.addRecSysJobs();
        });
    }
    getRecommendations(recommendationInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${process_1.default.env.FASTAPI_SERVER_URL}/getRecommendations` || 'http://localhost:8000/getRecommendations';
            const secretKey = process_1.default.env.SECRET_FASTAPI_SERVER || 'secret';
            try {
                const { data } = yield axios_1.default.get(url, {
                    headers: {
                        'X-Secret-Key': secretKey,
                    },
                    data: recommendationInfo,
                });
                const jobs = [];
                for (const jobRecommendation of data.recommendations) {
                    const job = yield this.jobService.getJobById(jobRecommendation.id);
                    if (job) {
                        jobs.push(job);
                    }
                }
                return jobs;
            }
            catch (error) {
                const axiosError = error;
                throw new http_exception_1.HttpException(axiosError.message, axiosError.status || 500);
            }
        });
    }
};
RecommendationService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(inversifyConstants_1.USER_INV.UserService)),
    __param(1, (0, inversify_1.inject)(inversifyConstants_1.COMPANY_INV.CompanyService)),
    __param(2, (0, inversify_1.inject)(inversifyConstants_1.JOB_INV.JobService)),
    __metadata("design:paramtypes", [user_service_1.default,
        company_service_1.CompanyService,
        job_service_1.JobService])
], RecommendationService);
exports.RecommendationService = RecommendationService;
//# sourceMappingURL=recommendation.service.js.map