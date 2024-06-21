import express from 'express';

import { POST_INV } from '../common/utils/inversifyConstants';
import { PostController } from './post.controller';
import catchErrors from '../common/utils/catchErrors';
import { centralizedContainer } from '../common/centralizedContainer/centralizedContainer';

const postRouter = express.Router();

const controller = centralizedContainer.get<PostController>(POST_INV.PostController);

postRouter.get('/all', catchErrors(controller.getAllPosts.bind(controller)));
postRouter.get('/company/:companyId', catchErrors(controller.getAllPostByCompany.bind(controller)));
postRouter.get('/user/:userId', catchErrors(controller.getAllPostsByUser.bind(controller)));
postRouter.get('/company/most-recent/:companyId', catchErrors(controller.getMostRecentCompanyPosts.bind(controller)));
postRouter.get('/user/most-recent/:userId', catchErrors(controller.getMostRecentUserPosts.bind(controller)));

postRouter.post('/user-post/:userId', catchErrors(controller.createPost.bind(controller)));
postRouter.post('/company-post/:companyId', catchErrors(controller.createPostCompany.bind(controller)));
postRouter.post('/like/:postId/:userId', catchErrors(controller.likePost.bind(controller)));
postRouter.post('/like-company/:postId/:companyId', catchErrors(controller.likePostCompany.bind(controller)));
postRouter.post('/unlike/:postId/:userId', catchErrors(controller.unlikePost.bind(controller)));
postRouter.post('/unlike-company/:postId/:companyId', catchErrors(controller.unlikePostCompany.bind(controller)));
postRouter.post('/comment/:postId/:userId', catchErrors(controller.commentPost.bind(controller)));
postRouter.post('/comment-company/:postId/:companyId', catchErrors(controller.commentPostCompany.bind(controller)));

postRouter.delete('/:postId', catchErrors(controller.removePost.bind(controller)));

export { postRouter };
