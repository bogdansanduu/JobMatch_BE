"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentContainerModule = exports.commentRouter = void 0;
const express_1 = __importDefault(require("express"));
const inversify_1 = require("inversify");
const inversifyConstants_1 = require("../common/utils/inversifyConstants");
const comment_service_1 = require("./comment.service");
const comment_controller_1 = require("./comment.controller");
const comment_repository_1 = require("./comment.repository");
const catchErrors_1 = __importDefault(require("../common/utils/catchErrors"));
const user_router_1 = require("../user/user.router");
const like_router_1 = require("../like/like.router");
const company_router_1 = require("../company/company.router");
const commentRouter = express_1.default.Router();
exports.commentRouter = commentRouter;
const container = new inversify_1.Container();
const commentContainerModule = new inversify_1.ContainerModule((bind) => {
    bind(inversifyConstants_1.COMMENT_INV.CommentRepository).to(comment_repository_1.CommentRepository);
    bind(inversifyConstants_1.COMMENT_INV.CommentController).to(comment_controller_1.CommentController);
    bind(inversifyConstants_1.COMMENT_INV.CommentService).to(comment_service_1.CommentService);
});
exports.commentContainerModule = commentContainerModule;
container.load(commentContainerModule);
container.load(user_router_1.userContainerModule);
container.load(company_router_1.companyContainerModule);
container.load(like_router_1.likeContainerModule);
const controller = container.get(inversifyConstants_1.COMMENT_INV.CommentController);
commentRouter.get('/all', (0, catchErrors_1.default)(controller.getAllComments.bind(controller)));
commentRouter.post('/like/:commentId/:userId', (0, catchErrors_1.default)(controller.likeComment.bind(controller)));
commentRouter.post('/like-company/:commentId/:companyId', (0, catchErrors_1.default)(controller.likeCommentCompany.bind(controller)));
commentRouter.post('/unlike/:commentId/:userId', (0, catchErrors_1.default)(controller.unlikeComment.bind(controller)));
commentRouter.post('/unlike-company/:commentId/:companyId', (0, catchErrors_1.default)(controller.unlikeCommentCompany.bind(controller)));
//# sourceMappingURL=comment.router.js.map