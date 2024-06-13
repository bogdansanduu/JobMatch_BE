"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeContainerModule = exports.likeRouter = void 0;
const express_1 = __importDefault(require("express"));
const inversify_1 = require("inversify");
const like_repository_1 = require("./like.repository");
const inversifyConstants_1 = require("../common/utils/inversifyConstants");
const like_service_1 = require("./like.service");
const likeRouter = express_1.default.Router();
exports.likeRouter = likeRouter;
const container = new inversify_1.Container();
const likeContainerModule = new inversify_1.ContainerModule((bind) => {
    bind(inversifyConstants_1.LIKE_INV.LikeRepository).to(like_repository_1.LikeRepository);
    bind(inversifyConstants_1.LIKE_INV.LikeService).to(like_service_1.LikeService);
});
exports.likeContainerModule = likeContainerModule;
container.load(likeContainerModule);
//# sourceMappingURL=like.router.js.map