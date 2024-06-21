"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = __importDefault(require("express"));
const inversifyConstants_1 = require("../common/utils/inversifyConstants");
const catchErrors_1 = __importDefault(require("../common/utils/catchErrors"));
const centralizedContainer_1 = require("../common/centralizedContainer/centralizedContainer");
const postRouter = express_1.default.Router();
exports.postRouter = postRouter;
const controller = centralizedContainer_1.centralizedContainer.get(inversifyConstants_1.POST_INV.PostController);
postRouter.get('/all', (0, catchErrors_1.default)(controller.getAllPosts.bind(controller)));
postRouter.get('/company/:companyId', (0, catchErrors_1.default)(controller.getAllPostByCompany.bind(controller)));
postRouter.get('/user/:userId', (0, catchErrors_1.default)(controller.getAllPostsByUser.bind(controller)));
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
postRouter.delete('/:postId', (0, catchErrors_1.default)(controller.removePost.bind(controller)));
//# sourceMappingURL=post.router.js.map