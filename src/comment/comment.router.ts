import express from 'express';

import { COMMENT_INV } from '../common/utils/inversifyConstants';
import { CommentController } from './comment.controller';
import catchErrors from '../common/utils/catchErrors';
import { centralizedContainer } from '../common/centralizedContainer/centralizedContainer';

const commentRouter = express.Router();

const controller = centralizedContainer.get<CommentController>(COMMENT_INV.CommentController);

commentRouter.get('/all', catchErrors(controller.getAllComments.bind(controller)));

commentRouter.post('/like/:commentId/:userId', catchErrors(controller.likeComment.bind(controller)));
commentRouter.post('/like-company/:commentId/:companyId', catchErrors(controller.likeCommentCompany.bind(controller)));
commentRouter.post('/unlike/:commentId/:userId', catchErrors(controller.unlikeComment.bind(controller)));
commentRouter.post(
  '/unlike-company/:commentId/:companyId',
  catchErrors(controller.unlikeCommentCompany.bind(controller))
);

export { commentRouter };
