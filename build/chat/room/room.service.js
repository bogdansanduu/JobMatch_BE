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
exports.RoomService = void 0;
const inversify_1 = require("inversify");
const dataSource_1 = require("../../database/dataSource");
const user_service_1 = __importDefault(require("../../user/user.service"));
const user_to_room_entity_1 = require("./entities/user-to-room.entity");
const inversifyConstants_1 = require("../../common/utils/inversifyConstants");
const not_found_exception_1 = require("../../common/exceptions/not-found.exception");
const room_repository_1 = require("./room.repository");
let RoomService = class RoomService {
    constructor(userService, roomRepository) {
        this.roomRepository = roomRepository;
        this.userToRoomRepository = dataSource_1.dataSource.getRepository(user_to_room_entity_1.UserToRoom);
        this.userService = userService;
    }
    findOneById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.roomRepository.findOneById(id);
        });
    }
    findOneByName(roomName) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.roomRepository.findOneByName(roomName);
        });
    }
    findAllByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const rooms = yield this.roomRepository.findByUserId(userId);
            return yield Promise.all(rooms.map((room) => __awaiter(this, void 0, void 0, function* () {
                return yield this.findOneById(room.id);
            })));
        });
    }
    createRoomName(hostId, oneOnOne, recipientId, roomName) {
        if (oneOnOne) {
            return roomName ? roomName : `ROOM_${hostId}_${recipientId}`;
        }
        else {
            return roomName ? roomName : `ROOM_${hostId}`;
        }
    }
    createRoom(createRoomDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { hostId, oneOnOne, recipientId, roomName } = createRoomDto;
            const hostUser = yield this.userService.getUserById(hostId);
            if (!hostUser) {
                throw new not_found_exception_1.NotFoundException('User not found');
            }
            const currentRoomName = this.createRoomName(hostId, oneOnOne, recipientId, roomName);
            const room = this.roomRepository.create({
                oneOnOne: oneOnOne || false,
                name: currentRoomName,
                host: hostUser,
            });
            const savedRoom = yield this.roomRepository.save(room);
            return this.findOneById(savedRoom.id);
        });
    }
    addUserToRoom(addUserToRoomDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, roomId } = addUserToRoomDto;
            const room = yield this.findOneById(roomId);
            if (!room) {
                throw new not_found_exception_1.NotFoundException('Room not found');
            }
            const existingUserToRoom = yield this.userToRoomRepository.findOne({
                where: { user: { id: userId }, room: { id: roomId } },
            });
            if (existingUserToRoom) {
                return room;
            }
            const user = yield this.userService.getUserById(userId);
            if (!user) {
                throw new not_found_exception_1.NotFoundException('User not found');
            }
            const userToRoom = this.userToRoomRepository.create({ user, room });
            yield this.userToRoomRepository.save(userToRoom);
            return room;
        });
    }
    createOneOnOneRoom(createOneOnOneRoomDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { hostId, recipientId } = createOneOnOneRoomDto;
            if (hostId === recipientId) {
                return null;
            }
            const searchedRoomName1 = this.createRoomName(hostId, true, recipientId);
            const searchedRoomName2 = this.createRoomName(recipientId, true, hostId);
            const existingRoom1 = yield this.findOneByName(searchedRoomName1);
            const existingRoom2 = yield this.findOneByName(searchedRoomName2);
            if (existingRoom1) {
                return existingRoom1;
            }
            if (existingRoom2) {
                return existingRoom2;
            }
            const room = yield this.createRoom({ hostId, recipientId, oneOnOne: true });
            if (!room) {
                throw new not_found_exception_1.NotFoundException('Room not found');
            }
            yield this.addUserToRoom({ userId: recipientId, roomId: room.id });
            yield this.addUserToRoom({ userId: hostId, roomId: room.id });
            return this.findOneById(room.id);
        });
    }
    removeRoomsByUserId(userId) {
        return this.roomRepository.deleteByUserId(userId);
    }
};
exports.RoomService = RoomService;
exports.RoomService = RoomService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(inversifyConstants_1.USER_INV.UserService)),
    __param(1, (0, inversify_1.inject)(inversifyConstants_1.ROOM_INV.RoomRepository)),
    __metadata("design:paramtypes", [user_service_1.default,
        room_repository_1.RoomRepository])
], RoomService);
//# sourceMappingURL=room.service.js.map