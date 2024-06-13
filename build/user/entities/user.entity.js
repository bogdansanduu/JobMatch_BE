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
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const user_to_room_entity_1 = require("../../chat/room/entities/user-to-room.entity");
const room_entity_1 = require("../../chat/room/entities/room.entity");
const message_entity_1 = require("../../chat/message/entity/message.entity");
const post_entity_1 = require("../../posts/entities/post.entity");
const like_entity_1 = require("../../like/entities/like.entity");
const company_entity_1 = require("../../company/entities/company.entity");
const user_constants_1 = require("../../common/constants/user.constants");
const job_application_entity_1 = require("../../job-application/entities/job-application.entity");
const job_saved_entity_1 = require("../../job-saved/entities/job-saved.entity");
let User = User_1 = class User extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: user_constants_1.Roles, default: user_constants_1.Roles.USER }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'longtext' }),
    __metadata("design:type", String)
], User.prototype, "profilePicture", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'varchar' }),
    __metadata("design:type", String)
], User.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'varchar' }),
    __metadata("design:type", String)
], User.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", String)
], User.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'longtext' }),
    __metadata("design:type", String)
], User.prototype, "resume", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'json' }),
    __metadata("design:type", Object)
], User.prototype, "resumeFile", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "socketId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_to_room_entity_1.UserToRoom, (userToRoom) => userToRoom.user),
    __metadata("design:type", Array)
], User.prototype, "userToRooms", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => room_entity_1.Room, (room) => room.host),
    __metadata("design:type", Array)
], User.prototype, "roomsAsHost", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => message_entity_1.Message, (message) => message.author),
    __metadata("design:type", Array)
], User.prototype, "messages", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => User_1, (user) => user.following),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], User.prototype, "followers", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => User_1, (user) => user.followers),
    __metadata("design:type", Array)
], User.prototype, "following", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => post_entity_1.Post, (post) => post.author, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], User.prototype, "posts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => like_entity_1.Like, (like) => like.author, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], User.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => job_application_entity_1.JobApplication, (jobApplication) => jobApplication.applicant, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], User.prototype, "jobApplications", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => job_saved_entity_1.JobSaved, (jobSaved) => jobSaved.user, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], User.prototype, "jobsSaved", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => company_entity_1.Company, (company) => company.owner),
    __metadata("design:type", company_entity_1.Company)
], User.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
User = User_1 = __decorate([
    (0, typeorm_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map