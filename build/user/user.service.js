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
const inversify_1 = require("inversify");
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const inversifyConstants_1 = require("../common/utils/inversifyConstants");
const user_constants_1 = require("../common/constants/user.constants");
const user_repository_1 = __importDefault(require("./user.repository"));
const not_found_exception_1 = require("../common/exceptions/not-found.exception");
const invalid_exception_1 = require("../common/exceptions/invalid.exception");
const centralizedContainer_1 = require("../common/centralizedContainer/centralizedContainer");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            user.profilePicture = user.profilePicture || user_constants_1.DEFUALT_PROFILE_PICTURE;
            return this.userRepository.createUser(user);
        });
    }
    deleteUser(id) {
        return this.userRepository.deleteUser(id);
    }
    getAllUsers(isBanned = false) {
        return this.userRepository.getAllUsers(isBanned);
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundUser = yield this.userRepository.getUserById(id);
            if (!foundUser) {
                throw new not_found_exception_1.NotFoundException('User not found');
            }
            return foundUser;
        });
    }
    getUserByEmail(email) {
        return this.userRepository.getUserByEmail(email);
    }
    updateUser(id, user) {
        return this.userRepository.updateUser(id, user);
    }
    uploadUserResume(userId, resumeFileDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUserById(userId);
            const resumeFile = {
                id: crypto_1.default.randomUUID(),
                fileName: resumeFileDto.fileName,
                fileKey: resumeFileDto.fileKey,
                uploadedAt: new Date(),
            };
            yield this.userRepository.updateUser(user.id, { resumeFile });
            return this.getUserById(user.id);
        });
    }
    deleteUserResume(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUserById(userId);
            yield this.userRepository.updateUser(user.id, { resumeFile: null });
            return this.getUserById(user.id);
        });
    }
    searchByNameAndEmail(searchTerms) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userRepository.searchByNameAndEmail(searchTerms);
            return users.slice(0, 5);
        });
    }
    addContact({ userId, contactId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user1 = yield this.userRepository.getUserById(userId);
            const user2 = yield this.userRepository.getUserById(contactId);
            if (!user1 || !user2) {
                throw new not_found_exception_1.NotFoundException('One or both users not found');
            }
            if (user1.id === user2.id) {
                throw new invalid_exception_1.InvalidException();
            }
            user1.following.push(user2);
            user2.followers.push(user1);
            yield this.userRepository.saveUser(user1);
            yield this.userRepository.saveUser(user2);
            return this.userRepository.getUserById(contactId);
        });
    }
    removeContact({ userId, contactId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user1 = yield this.userRepository.getUserById(userId);
            const user2 = yield this.userRepository.getUserById(contactId);
            if (!user1 || !user2) {
                throw new not_found_exception_1.NotFoundException('One or both users not found');
            }
            if (user1.id === user2.id) {
                throw new invalid_exception_1.InvalidException();
            }
            user1.following = user1.following.filter((user) => user.id !== contactId);
            user2.followers = user2.followers.filter((user) => user.id !== userId);
            yield this.userRepository.saveUser(user1);
            yield this.userRepository.saveUser(user2);
            return this.userRepository.getUserById(contactId);
        });
    }
    banUser(userId, banned) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.getUserById(userId);
            if (!user) {
                throw new not_found_exception_1.NotFoundException('User not found');
            }
            const notAllowed = false;
            if (banned && notAllowed) {
                const postService = centralizedContainer_1.centralizedContainer.get(inversifyConstants_1.POST_INV.PostService);
                const commentService = centralizedContainer_1.centralizedContainer.get(inversifyConstants_1.COMMENT_INV.CommentService);
                const likeService = centralizedContainer_1.centralizedContainer.get(inversifyConstants_1.LIKE_INV.LikeService);
                const jobApplicationService = centralizedContainer_1.centralizedContainer.get(inversifyConstants_1.JOB_APPLICATION_INV.JobApplicationService);
                const roomService = centralizedContainer_1.centralizedContainer.get(inversifyConstants_1.ROOM_INV.RoomService);
                yield postService.removePostsByUserId(user.id);
                yield commentService.removeCommentsByUserId(user.id);
                yield likeService.removeLikesByUserId(user.id);
                yield jobApplicationService.removeApplicationsByUserId(user.id);
                yield roomService.removeRoomsByUserId(user.id);
            }
            const emailService = centralizedContainer_1.centralizedContainer.get(inversifyConstants_1.AWS_SES_INV.SESService);
            yield emailService.sendAccountPermissionChangedEmail(user.id, banned, true, false);
            return this.userRepository.updateUser(userId, { isBanned: banned });
        });
    }
    addRecSysUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = [];
            const saltRounds = 10;
            const salt = yield bcrypt_1.default.genSalt(saltRounds);
            const password = 'recsys';
            const hashedPassword = yield bcrypt_1.default.hash(password, salt);
            for (let i = 1; i <= 6; i++) {
                const firstName = `RecSys${i}`;
                const lastName = `RecSys${i}`;
                const resume = 'RecSys';
                const email = `recsys${i}@recsys.com`;
                const country = 'RecSys';
                const city = 'RecSys';
                const state = 'RecSys';
                const user = yield this.createUser({
                    firstName,
                    lastName,
                    email,
                    resume,
                    password: hashedPassword,
                    country,
                    city,
                    state,
                });
                yield this.updateUser(user.id, { role: user_constants_1.Roles.COMPANY_OWNER });
                console.log(`Created RecSys user ${i}`);
                users.push(user);
            }
            return users;
        });
    }
};
UserService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(inversifyConstants_1.USER_INV.UserRepository)),
    __metadata("design:paramtypes", [user_repository_1.default])
], UserService);
exports.default = UserService;
//# sourceMappingURL=user.service.js.map