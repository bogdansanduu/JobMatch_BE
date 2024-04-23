import express from 'express';

import { Container, ContainerModule } from 'inversify';
import { PostService } from './post.service';
import { POST_INV } from '../common/utils/inversifyConstants';
import { PostController } from './post.controller';
import catchErrors from '../common/utils/catchErrors';
import { userContainerModule } from '../user/user.router';
import { PostRepository } from './post.repository';
import { likeContainerModule } from '../like/like.router';

const postRouter = express.Router();

const container = new Container();

const postContainerModule = new ContainerModule((bind) => {
  bind(POST_INV.PostRepository).to(PostRepository);
  bind(POST_INV.PostController).to(PostController);
  bind(POST_INV.PostService).to(PostService);
});

container.load(postContainerModule);
container.load(userContainerModule);
container.load(likeContainerModule);

const controller = container.get<PostController>(POST_INV.PostController);

postRouter.get('/', (req, res) => {
  res.send('Hello World!');
});
postRouter.get('/all', catchErrors(controller.getAllPosts.bind(controller)));

postRouter.post('/:userId', catchErrors(controller.createPost.bind(controller)));
postRouter.post('/like/:postId/:userId', catchErrors(controller.likePost.bind(controller)));
postRouter.post('/unlike/:postId/:userId', catchErrors(controller.unlikePost.bind(controller)));

export { postRouter, postContainerModule };
