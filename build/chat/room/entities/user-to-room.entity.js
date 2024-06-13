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
exports.UserToRoom = void 0;
const typeorm_1 = require("typeorm");
const room_entity_1 = require("./room.entity");
const user_entity_1 = require("../../../user/entities/user.entity");
let UserToRoom = class UserToRoom extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserToRoom.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.userToRooms),
    __metadata("design:type", user_entity_1.User)
], UserToRoom.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], UserToRoom.prototype, "roomId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => room_entity_1.Room, (room) => room.userToRooms),
    __metadata("design:type", room_entity_1.Room)
], UserToRoom.prototype, "room", void 0);
UserToRoom = __decorate([
    (0, typeorm_1.Entity)()
], UserToRoom);
exports.UserToRoom = UserToRoom;
//# sourceMappingURL=user-to-room.entity.js.map