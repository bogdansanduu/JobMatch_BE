import { NextFunction, Response, Request } from 'express';
import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';

import { POST_INV } from '../common/utils/inversifyConstants';

import { PostService } from './post.service';
import { validateBody } from '../common/utils/validateBody';
import { CreatePostValidation } from './dtos/create-post.validation';
import { NotFoundException } from '../common/exceptions/not-found.exception';
import { plainToInstance } from 'class-transformer';
import { PostResponseDto } from './dtos/post-response.dto';

@injectable()
export class PostController {
  private readonly postService: PostService;
  constructor(
    @inject(POST_INV.PostService)
    postService: PostService
  ) {
    this.postService = postService;
  }

  async getAllPosts(req: Request, res: Response, next: NextFunction) {
    const data = await this.postService.getAllPosts();

    const responseData = plainToInstance(PostResponseDto, data, { excludeExtraneousValues: true });

    return res.status(StatusCodes.OK).json(responseData);
  }

  async createPost(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    const userId = Number(req.params.userId);

    if (!userId) {
      throw new NotFoundException('User not found');
    }

    await validateBody(body, CreatePostValidation);

    const data = await this.postService.createPost(userId, body);

    //response logic

    const responseData = plainToInstance(PostResponseDto, data, { excludeExtraneousValues: true });

    return res.status(StatusCodes.CREATED).json(responseData);
  }

  async likePost(req: Request, res: Response, next: NextFunction) {
    const postId = Number(req.params.postId);
    const userId = Number(req.params.userId);

    if (!postId || !userId) {
      throw new NotFoundException('User or post not found');
    }

    const data = await this.postService.likePost(postId, userId);

    const responseData = plainToInstance(PostResponseDto, data, { excludeExtraneousValues: true });

    return res.status(StatusCodes.OK).json(responseData);
  }
}
