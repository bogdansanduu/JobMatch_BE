import express from 'express';

import { Container, ContainerModule } from 'inversify';
import { PostService } from './post.service';
import { POST_INV } from '../common/utils/inversifyConstants';
import { PostController } from './post.controller';
import catchErrors from '../common/utils/catchErrors';
import { userContainerModule } from '../user/user.router';
import { PostRepository } from './post.repository';
import { likeContainerModule } from '../like/like.router';
import { commentContainerModule } from '../comment/comment.router';
import { companyContainerModule } from '../company/company.router';

const postRouter = express.Router();

const container = new Container();

const postContainerModule = new ContainerModule((bind) => {
  bind(POST_INV.PostRepository).to(PostRepository);
  bind(POST_INV.PostController).to(PostController);
  bind(POST_INV.PostService).to(PostService);
});

container.load(postContainerModule);
container.load(userContainerModule);
container.load(companyContainerModule);
container.load(likeContainerModule);
container.load(commentContainerModule);

const controller = container.get<PostController>(POST_INV.PostController);

postRouter.get('/all', catchErrors(controller.getAllPosts.bind(controller)));
postRouter.get('/company/:companyId', catchErrors(controller.getAllPostByCompany.bind(controller)));
postRouter.get('/company/most-recent/:companyId', catchErrors(controller.getMostRecentCompanyPosts.bind(controller)));

postRouter.post('/user-post/:userId', catchErrors(controller.createPost.bind(controller)));
postRouter.post('/company-post/:companyId', catchErrors(controller.createPostCompany.bind(controller)));
postRouter.post('/like/:postId/:userId', catchErrors(controller.likePost.bind(controller)));
postRouter.post('/like-company/:postId/:companyId', catchErrors(controller.likePostCompany.bind(controller)));
postRouter.post('/unlike/:postId/:userId', catchErrors(controller.unlikePost.bind(controller)));
postRouter.post('/unlike-company/:postId/:companyId', catchErrors(controller.unlikePostCompany.bind(controller)));
postRouter.post('/comment/:postId/:userId', catchErrors(controller.commentPost.bind(controller)));
postRouter.post('/comment-company/:postId/:companyId', catchErrors(controller.commentPostCompany.bind(controller)));

export { postRouter, postContainerModule };
