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
const message_entity_1 = require("./entity/message.entity");
const inversifyConstants_1 = require("../../common/utils/inversifyConstants");
const not_found_exception_1 = require("../../common/exceptions/not-found.exception");
const room_service_1 = require("../room/room.service");
const user_service_1 = __importDefault(require("../../user/user.service"));
const dataSource_1 = require("../../database/dataSource");
let MessageService = class MessageService {
    constructor(userService, roomService) {
        this.messageRepo = dataSource_1.dataSource.getRepository(message_entity_1.Message);
        this.userService = userService;
        this.roomService = roomService;
    }
    create(createMessageDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, text, roomId } = createMessageDto;
            const room = yield this.roomService.findOneById(roomId);
            const user = yield this.userService.getUserById(userId);
            if (!room || !user) {
                throw new not_found_exception_1.NotFoundException('User or room not found');
            }
            const newMessage = this.messageRepo.create({
                author: user,
                text,
                room,
            });
            return this.messageRepo.save(newMessage);
        });
    }
    findAllByRoomId(roomId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.messageRepo.find({
                where: {
                    room: {
                        id: roomId,
                    },
                },
                relations: {
                    author: true,
                    room: true,
                },
                select: {
                    id: true,
                    text: true,
                    createdAt: true,
                    author: {
                        id: true,
                        email: true,
                        firstName: true,
                        lastName: true,
                        profilePicture: true,
                    },
                    room: {
                        id: true,
                    },
                },
            });
        });
    }
};
MessageService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(inversifyConstants_1.USER_INV.UserService)),
    __param(1, (0, inversify_1.inject)(inversifyConstants_1.ROOM_INV.RoomService)),
    __metadata("design:paramtypes", [user_service_1.default,
        room_service_1.RoomService])
], MessageService);
exports.default = MessageService;
//# sourceMappingURL=message.service.js.map