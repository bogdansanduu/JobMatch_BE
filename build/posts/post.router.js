"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postContainerModule = exports.postRouter = void 0;
const express_1 = __importDefault(require("express"));
const inversify_1 = require("inversify");
const post_service_1 = require("./post.service");
const inversifyConstants_1 = require("../common/utils/inversifyConstants");
const post_controller_1 = require("./post.controller");
const catchErrors_1 = __importDefault(require("../common/utils/catchErrors"));
const user_router_1 = require("../user/user.router");
const post_repository_1 = require("./post.repository");
const like_router_1 = require("../like/like.router");
const comment_router_1 = require("../comment/comment.router");
const company_router_1 = require("../company/company.router");
const postRouter = express_1.default.Router();
exports.postRouter = postRouter;
const container = new inversify_1.Container();
const postContainerModule = new inversify_1.ContainerModule((bind) => {
    bind(inversifyConstants_1.POST_INV.PostRepository).to(post_repository_1.PostRepository);
    bind(inversifyConstants_1.POST_INV.PostController).to(post_controller_1.PostController);
    bind(inversifyConstants_1.POST_INV.PostService).to(post_service_1.PostService);
});
exports.postContainerModule = postContainerModule;
container.load(postContainerModule);
container.load(user_router_1.userContainerModule);
container.load(company_router_1.companyContainerModule);
container.load(like_router_1.likeContainerModule);
container.load(comment_router_1.commentContainerModule);
const controller = container.get(inversifyConstants_1.POST_INV.PostController);
postRouter.get('/all', (0, catchErrors_1.default)(controller.getAllPosts.bind(controller)));
postRouter.get('/company/:companyId', (0, catchErrors_1.default)(controller.getAllPostByCompany.bind(controller)));
postRouter.get('/company/most-recent/:companyId', (0, catchErrors_1.default)(controller.getMostRecentCompanyPosts.bind(controller)));
postRouter.get('/user/most-recent/:userId', (0, catchErrors_1.default)(controller.getMostRecentUserPosts.bind(controller)));
postRouter.post('/user-post/:userId', (0, catchErrors_1.default)(controller.createPost.bind(controller)));
postRouter.post('/company-post/:companyId', (0, catchErrors_1.default)(controller.createPostCompany.bind(controller)));
postRouter.post('/like/:postId/:userId', (0, catchErrors_1.default)(controller.likePost.bind(controller)));
postRouter.post('/like-company/:postId/:companyId', (0, catchErrors_1.default)(controller.likePostCompany.bind(controller)));
postRouter.post('/unlike/:postId/:userId', (0, catchErrors_1.default)(controller.unlikePost.bind(controller)));
postRouter.post('/unlike-company/:postId/:companyId', (0, catchErrors_1.default)(controller.unlikePostCompany.bind(controller)));
postRouter.post('/comment/:postId/:userId', (0, catchErrors_1.default)(controller.commentPost.bind(controller)));
postRouter.post('/comment-company/:postId/:companyId', (0, catchErrors_1.default)(controller.commentPostCompany.bind(controller)));
//# sourceMappingURL=post.router.js.map