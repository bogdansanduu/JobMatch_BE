"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRouter = void 0;
const express_1 = __importDefault(require("express"));
const inversifyConstants_1 = require("../common/utils/inversifyConstants");
const catchErrors_1 = __importDefault(require("../common/utils/catchErrors"));
const centralizedContainer_1 = require("../common/centralizedContainer/centralizedContainer");
const commentRouter = express_1.default.Router();
exports.commentRouter = commentRouter;
const controller = centralizedContainer_1.centralizedContainer.get(inversifyConstants_1.COMMENT_INV.CommentController);
commentRouter.get('/all', (0, catchErrors_1.default)(controller.getAllComments.bind(controller)));
commentRouter.post('/like/:commentId/:userId', (0, catchErrors_1.default)(controller.likeComment.bind(controller)));
commentRouter.post('/like-company/:commentId/:companyId', (0, catchErrors_1.default)(controller.likeCommentCompany.bind(controller)));
commentRouter.post('/unlike/:commentId/:userId', (0, catchErrors_1.default)(controller.unlikeComment.bind(controller)));
commentRouter.post('/unlike-company/:commentId/:companyId', (0, catchErrors_1.default)(controller.unlikeCommentCompany.bind(controller)));
//# sourceMappingURL=comment.router.js.map