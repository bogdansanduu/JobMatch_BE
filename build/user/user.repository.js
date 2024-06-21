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
exports.UserRepository = void 0;
const typeorm_1 = require("typeorm");
const inversify_1 = require("inversify");
const user_entity_1 = require("./entities/user.entity");
const dataSource_1 = require("../database/dataSource");
let UserRepository = class UserRepository {
    constructor() {
        this.userRepo = dataSource_1.dataSource.getRepository(user_entity_1.User);
    }
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.userRepo.create(userData);
            return this.userRepo.save(user);
        });
    }
    saveUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepo.save(user);
        });
    }
    deleteUser(id) {
        return this.userRepo.delete(id);
    }
    getAllUsers(isBanned = false) {
        return this.userRepo.find({
            where: {
                isBanned,
            },
            relations: {
                followers: true,
                following: true,
                jobApplications: {
                    job: true,
                },
                jobsSaved: {
                    job: true,
                },
                company: true,
            },
        });
    }
    getUserById(id) {
        return this.userRepo.findOne({
            where: {
                id,
            },
            relations: {
                followers: true,
                following: true,
                jobApplications: {
                    job: true,
                },
                jobsSaved: {
                    job: true,
                },
                company: true,
            },
        });
    }
    getUserByEmail(email) {
        return this.userRepo.findOne({
            where: {
                email,
            },
            relations: {
                followers: true,
                following: true,
                jobApplications: {
                    job: true,
                },
                jobsSaved: {
                    job: true,
                },
                company: true,
            },
        });
    }
    searchByNameAndEmail(searchTerms) {
        return __awaiter(this, void 0, void 0, function* () {
            const whereConditions = searchTerms.map((searchTerm) => ({
                where: [
                    { firstName: (0, typeorm_1.ILike)(`%${searchTerm}%`), isBanned: false },
                    { lastName: (0, typeorm_1.ILike)(`%${searchTerm}%`), isBanned: false },
                    { email: (0, typeorm_1.ILike)(`%${searchTerm}%`), isBanned: false },
                ],
            }));
            const combinedConditions = whereConditions.reduce((acc, condition) => {
                acc.push(...condition.where);
                return acc;
            }, []);
            return this.userRepo.find({
                where: combinedConditions,
            });
        });
    }
    updateUser(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userRepo.update(id, user);
            return this.getUserById(id);
        });
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], UserRepository);
exports.default = UserRepository;
//# sourceMappingURL=user.repository.js.map