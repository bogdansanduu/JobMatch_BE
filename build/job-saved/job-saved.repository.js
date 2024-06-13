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
exports.JobSavedRepository = void 0;
const inversify_1 = require("inversify");
const job_saved_entity_1 = require("./entities/job-saved.entity");
const dataSource_1 = require("../database/dataSource");
let JobSavedRepository = class JobSavedRepository {
    constructor() {
        this.jobSavedRepo = dataSource_1.dataSource.getRepository(job_saved_entity_1.JobSaved);
    }
    findAll() {
        return this.jobSavedRepo.find({
            relations: {
                job: {
                    company: true,
                },
                user: true,
            },
        });
    }
    findAllByUser(userId) {
        return this.jobSavedRepo.find({
            where: {
                user: {
                    id: userId,
                },
            },
            relations: {
                job: {
                    company: true,
                },
                user: true,
            },
        });
    }
    saveJob(jobSavedData) {
        const jobSaved = this.jobSavedRepo.create(jobSavedData);
        return this.jobSavedRepo.save(jobSaved);
    }
    deleteSavedJob(jobSavedData) {
        return this.jobSavedRepo.delete(jobSavedData);
    }
};
JobSavedRepository = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], JobSavedRepository);
exports.JobSavedRepository = JobSavedRepository;
//# sourceMappingURL=job-saved.repository.js.map