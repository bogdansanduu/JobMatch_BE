import express from 'express';
import { Container, ContainerModule } from 'inversify';

import { COMMENT_INV } from '../common/utils/inversifyConstants';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { CommentRepository } from './comment.repository';
import catchErrors from '../common/utils/catchErrors';
import { userContainerModule } from '../user/user.router';
import { likeContainerModule } from '../like/like.router';

const commentRouter = express.Router();

const container = new Container();

const commentContainerModule = new ContainerModule((bind) => {
  bind(COMMENT_INV.CommentRepository).to(CommentRepository);
  bind(COMMENT_INV.CommentController).to(CommentController);
  bind(COMMENT_INV.CommentService).to(CommentService);
});

container.load(commentContainerModule);
container.load(userContainerModule);
container.load(likeContainerModule);

const controller = container.get<CommentController>(COMMENT_INV.CommentController);

commentRouter.get('/all', catchErrors(controller.getAllComments.bind(controller)));

commentRouter.post('/like/:commentId/:userId', catchErrors(controller.likeComment.bind(controller)));
commentRouter.post('/unlike/:commentId/:userId', catchErrors(controller.unlikeComment.bind(controller)));

export { commentRouter, commentContainerModule };
