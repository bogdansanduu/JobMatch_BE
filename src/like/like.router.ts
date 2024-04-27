import express from 'express';
import { Container, ContainerModule } from 'inversify';

import { LikeRepository } from './like.repository';
import { LIKE_INV } from '../common/utils/inversifyConstants';
import { LikeService } from './like.service';

const likeRouter = express.Router();

const container = new Container();

const likeContainerModule = new ContainerModule((bind) => {
  bind(LIKE_INV.LikeRepository).to(LikeRepository);
  bind(LIKE_INV.LikeService).to(LikeService);
  // bind(LIKE_INV.LikeController).to(LikeController);
});

container.load(likeContainerModule);

export { likeRouter, likeContainerModule };
