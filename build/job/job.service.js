"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobService = void 0;
const inversify_1 = require("inversify");
const fs = __importStar(require("fs"));
const csv_parse_1 = require("csv-parse");
const inversifyConstants_1 = require("../common/utils/inversifyConstants");
const job_repository_1 = require("./job.repository");
const company_service_1 = require("../company/company.service");
const invalid_exception_1 = require("../common/exceptions/invalid.exception");
let JobService = class JobService {
    constructor(jobRepository, companyService) {
        this.jobRepository = jobRepository;
        this.companyService = companyService;
    }
    getAllJobs() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.jobRepository.findAll();
        });
    }
    getAllJobsByCompany(companyId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!companyId) {
                throw new invalid_exception_1.InvalidException('Company ID is invalid.');
            }
            return this.jobRepository.findAllByCompany(companyId);
        });
    }
    getAllJobsPaginated(page, limit, searchTerm) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.jobRepository.findAllPaginated(page, limit, searchTerm);
            const totalItems = yield this.jobRepository.count();
            return {
                data,
                totalItems,
                currentPage: page,
            };
        });
    }
    getJobById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.jobRepository.findOne(id);
        });
    }
    createJob(job) {
        return __awaiter(this, void 0, void 0, function* () {
            const company = yield this.companyService.getCompanyById(job.companyId);
            return this.jobRepository.createJob(Object.assign(Object.assign({}, job), { company }));
        });
    }
    addRecSysJobs() {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function* () {
            const jobs = [];
            const parser = fs.createReadStream(`${__dirname}../../../assets/modified_job_skills_cleaned.csv`).pipe((0, csv_parse_1.parse)({
                columns: true,
                delimiter: ',',
                trim: true,
                skip_empty_lines: true,
            }));
            try {
                for (var parser_1 = __asyncValues(parser), parser_1_1; parser_1_1 = yield parser_1.next(), !parser_1_1.done;) {
                    const jobData = parser_1_1.value;
                    const companyName = jobData.Company;
                    const company = yield this.companyService.getCompanyByName(companyName);
                    if (!company) {
                        console.log(`Company ${companyName} not found.`);
                        continue;
                    }
                    const locationParts = jobData.Location.split(',').map((part) => part.trim());
                    let city = '';
                    let state = '';
                    let country = '';
                    if (locationParts.length === 3) {
                        [city, state, country] = locationParts;
                    }
                    else if (locationParts.length === 2) {
                        [city, country] = locationParts;
                    }
                    else if (locationParts.length === 1) {
                        country = locationParts[0];
                    }
                    const title = jobData.Title;
                    const category = jobData.Category;
                    const responsibilities = jobData.Responsibilities;
                    const minimumQualifications = jobData.Minimum_Qualifications;
                    const preferredQualifications = jobData.Preferred_Qualifications;
                    const lat = parseFloat(jobData.Latitude);
                    const lng = parseFloat(jobData.Longitude);
                    const description = 'Description not available.';
                    const newJob = yield this.createJob({
                        title,
                        description,
                        category,
                        country,
                        city,
                        state,
                        lat,
                        lng,
                        responsibilities,
                        minimumQualifications,
                        preferredQualifications,
                        companyId: company.id,
                    });
                    jobs.push(newJob);
                    console.log(`Added job for ${jobData.Company}: ${title}`);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (parser_1_1 && !parser_1_1.done && (_a = parser_1.return)) yield _a.call(parser_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return jobs;
        });
    }
};
JobService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(inversifyConstants_1.JOB_INV.JobRepository)),
    __param(1, (0, inversify_1.inject)(inversifyConstants_1.COMPANY_INV.CompanyService)),
    __metadata("design:paramtypes", [job_repository_1.JobRepository,
        company_service_1.CompanyService])
], JobService);
exports.JobService = JobService;
//# sourceMappingURL=job.service.js.map