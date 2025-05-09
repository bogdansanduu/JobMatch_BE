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
exports.Room = void 0;
const typeorm_1 = require("typeorm");
const message_entity_1 = require("../../message/entity/message.entity");
const user_to_room_entity_1 = require("./user-to-room.entity");
const user_entity_1 = require("../../../user/entities/user.entity");
let Room = class Room extends typeorm_1.BaseEntity {
};
exports.Room = Room;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Room.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.roomsAsHost),
    __metadata("design:type", user_entity_1.User)
], Room.prototype, "host", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Room.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_to_room_entity_1.UserToRoom, (userToRoom) => userToRoom.room, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Room.prototype, "userToRooms", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => message_entity_1.Message, (message) => message.room, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Room.prototype, "messages", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Room.prototype, "oneOnOne", void 0);
exports.Room = Room = __decorate([
    (0, typeorm_1.Entity)()
], Room);
//# sourceMappingURL=room.entity.js.map