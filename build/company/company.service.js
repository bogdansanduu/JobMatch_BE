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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyService = void 0;
const inversify_1 = require("inversify");
const bcrypt_1 = __importDefault(require("bcrypt"));
const fs = __importStar(require("fs"));
const csv_parse_1 = require("csv-parse");
const company_repository_1 = require("./company.repository");
const inversifyConstants_1 = require("../common/utils/inversifyConstants");
const user_service_1 = __importDefault(require("../user/user.service"));
const not_found_exception_1 = require("../common/exceptions/not-found.exception");
const user_constants_1 = require("../common/constants/user.constants");
const centralizedContainer_1 = require("../common/centralizedContainer/centralizedContainer");
let CompanyService = class CompanyService {
    constructor(companyRepository, userService) {
        this.userService = userService;
        this.companyRepository = companyRepository;
    }
    getCompanyById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const company = yield this.companyRepository.getCompanyById(id);
            if (!company) {
                throw new not_found_exception_1.NotFoundException('Company not found');
            }
            return company;
        });
    }
    getAllCompanies(isBanned = false) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.companyRepository.findAll(isBanned);
        });
    }
    getCompanyByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.companyRepository.findByEmail(email);
        });
    }
    getCompanyByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.companyRepository.findByName(name);
        });
    }
    createCompany(company) {
        return __awaiter(this, void 0, void 0, function* () {
            const owner = yield this.userService.getUserById(company.ownerId);
            if (!owner) {
                throw new not_found_exception_1.NotFoundException('User not found');
            }
            company.profilePicture = company.profilePicture || user_constants_1.DEFUALT_PROFILE_PICTURE;
            return this.companyRepository.createCompany(Object.assign(Object.assign({}, company), { owner }));
        });
    }
    searchByNameAndEmail(searchTerms) {
        return __awaiter(this, void 0, void 0, function* () {
            const companies = yield this.companyRepository.searchByNameAndEmail(searchTerms);
            return companies.slice(0, 5);
        });
    }
    banCompany(companyId, banned) {
        return __awaiter(this, void 0, void 0, function* () {
            const company = yield this.companyRepository.getCompanyById(companyId);
            if (!company) {
                throw new not_found_exception_1.NotFoundException('Company not found');
            }
            const notAllowed = false;
            if (banned && notAllowed) {
                const postService = centralizedContainer_1.centralizedContainer.get(inversifyConstants_1.POST_INV.PostService);
                const commentService = centralizedContainer_1.centralizedContainer.get(inversifyConstants_1.COMMENT_INV.CommentService);
                const likeService = centralizedContainer_1.centralizedContainer.get(inversifyConstants_1.LIKE_INV.LikeService);
                const jobService = centralizedContainer_1.centralizedContainer.get(inversifyConstants_1.JOB_INV.JobService);
                yield postService.removePostsByCompanyId(companyId);
                yield commentService.removeCommentsByCompanyId(companyId);
                yield likeService.removeLikesByCompanyId(companyId);
                yield jobService.deleteByCompanyId(companyId);
            }
            const emailService = centralizedContainer_1.centralizedContainer.get(inversifyConstants_1.AWS_SES_INV.SESService);
            yield emailService.sendAccountPermissionChangedEmail(company.id, banned, false, true);
            return this.companyRepository.updateCompany(companyId, { isBanned: banned });
        });
    }
    addRecSysCompanies() {
        var _a, e_1, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const companies = [];
            const uniqueCompanies = new Set();
            const saltRounds = 10;
            const salt = yield bcrypt_1.default.genSalt(saltRounds);
            const password = 'recommendation';
            const hashedPassword = yield bcrypt_1.default.hash(password, salt);
            const parser = fs.createReadStream(`${__dirname}../../../assets/modified_job_skills_cleaned.csv`).pipe((0, csv_parse_1.parse)({
                columns: true,
                delimiter: ',',
                trim: true,
                skip_empty_lines: true,
            }));
            const recSysUsers = [];
            for (let i = 1; i <= 6; i++) {
                const recSysUser = yield this.userService.getUserByEmail(`recsys${i}@recsys.com`);
                if (recSysUser) {
                    recSysUsers.push(recSysUser);
                }
            }
            let index = 1;
            try {
                for (var _d = true, parser_1 = __asyncValues(parser), parser_1_1; parser_1_1 = yield parser_1.next(), _a = parser_1_1.done, !_a; _d = true) {
                    _c = parser_1_1.value;
                    _d = false;
                    const companyData = _c;
                    if (!uniqueCompanies.has(companyData.Company)) {
                        uniqueCompanies.add(companyData.Company);
                        const locationParts = companyData.Location.split(',').map((part) => part.trim());
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
                        const email = `recsys${index}@recsys.com`;
                        const companyName = companyData.Company;
                        const industry = 'IT';
                        const ownerId = recSysUsers[index - 1].id;
                        const newCompany = yield this.createCompany({
                            email,
                            password: hashedPassword,
                            name: companyName,
                            city,
                            state,
                            country,
                            industry,
                            ownerId: ownerId,
                            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut facilisis aliquam dictum. Suspendisse potenti. Phasellus gravida vel purus eu imperdiet. Phasellus interdum, nisl et aliquam tempus, turpis risus tempus dui, sit amet tincidunt magna metus ac turpis. Vestibulum quis est ac eros sagittis sodales. Cras consequat nulla fringilla, pellentesque velit vitae, porttitor nunc. Cras ornare massa nec turpis eleifend, blandit sodales ipsum tristique. Cras blandit pellentesque ipsum, id feugiat sapien ultrices quis. Proin tincidunt, arcu eu euismod cursus, ipsum elit congue ligula, vitae tristique ex justo eu massa. Morbi sodales non nulla non faucibus. Proin ac ex turpis. Vestibulum faucibus sagittis lacus, vitae commodo elit euismod at. Quisque est orci, blandit non imperdiet nec, elementum eu tellus. Aliquam rutrum, magna ac lobortis suscipit, ipsum dolor porttitor eros, in rutrum nunc augue sed risus. Donec facilisis maximus justo et vehicula. Nulla facilisi.',
                        });
                        console.log(`Created company: ${companyName}`);
                        index++;
                        companies.push(newCompany);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = parser_1.return)) yield _b.call(parser_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return companies;
        });
    }
};
exports.CompanyService = CompanyService;
exports.CompanyService = CompanyService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(inversifyConstants_1.COMPANY_INV.CompanyRepository)),
    __param(1, (0, inversify_1.inject)(inversifyConstants_1.USER_INV.UserService)),
    __metadata("design:paramtypes", [company_repository_1.CompanyRepository,
        user_service_1.default])
], CompanyService);
//# sourceMappingURL=company.service.js.map