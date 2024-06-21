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
exports.RoomRepository = void 0;
const typeorm_1 = require("typeorm");
const dataSource_1 = require("../../database/dataSource");
const room_entity_1 = require("./entities/room.entity");
const inversify_1 = require("inversify");
const user_to_room_entity_1 = require("./entities/user-to-room.entity");
let RoomRepository = class RoomRepository {
    constructor() {
        this.roomRepo = dataSource_1.dataSource.getRepository(room_entity_1.Room);
        this.userToRoomRepo = dataSource_1.dataSource.getRepository(user_to_room_entity_1.UserToRoom);
    }
    findOneById(id) {
        return this.roomRepo.findOne({
            where: {
                id,
            },
            relations: {
                userToRooms: {
                    user: true,
                },
                host: true,
            },
            select: {
                id: true,
                name: true,
                oneOnOne: true,
                host: {
                    id: true,
                    email: true,
                    firstName: true,
                    lastName: true,
                    profilePicture: true,
                    socketId: true,
                },
                userToRooms: {
                    id: true,
                    roomId: true,
                    user: {
                        id: true,
                        email: true,
                        firstName: true,
                        lastName: true,
                        profilePicture: true,
                        socketId: true,
                    },
                },
            },
        });
    }
    findOneByName(roomName) {
        return this.roomRepo.findOne({
            where: {
                name: roomName,
            },
            relations: {
                userToRooms: {
                    user: true,
                },
                host: true,
            },
            select: {
                id: true,
                name: true,
                oneOnOne: true,
                host: {
                    id: true,
                    email: true,
                    firstName: true,
                    lastName: true,
                    profilePicture: true,
                    socketId: true,
                },
                userToRooms: {
                    id: true,
                    roomId: true,
                    user: {
                        id: true,
                        email: true,
                        firstName: true,
                        lastName: true,
                        profilePicture: true,
                        socketId: true,
                    },
                },
            },
        });
    }
    findByUserId(userId) {
        return this.roomRepo.find({
            where: {
                userToRooms: {
                    user: {
                        id: userId,
                    },
                },
            },
            relations: {
                userToRooms: {
                    user: true,
                },
                host: true,
            },
            select: {
                id: true,
                name: true,
                oneOnOne: true,
                host: {
                    id: true,
                    email: true,
                    firstName: true,
                    lastName: true,
                    profilePicture: true,
                    socketId: true,
                },
                userToRooms: {
                    id: true,
                    roomId: true,
                    user: {
                        id: true,
                        email: true,
                        firstName: true,
                        lastName: true,
                        profilePicture: true,
                        socketId: true,
                    },
                },
            },
        });
    }
    create(room) {
        return this.roomRepo.create(room);
    }
    save(room) {
        return this.roomRepo.save(room);
    }
    deleteByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userToRoomRepo.delete({
                user: {
                    id: userId,
                },
            });
            yield this.roomRepo.delete({
                name: (0, typeorm_1.Or)((0, typeorm_1.ILike)(`%_${userId}_%`), (0, typeorm_1.ILike)(`%_${userId}`)),
            });
        });
    }
};
exports.RoomRepository = RoomRepository;
exports.RoomRepository = RoomRepository = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], RoomRepository);
//# sourceMappingURL=room.repository.js.map