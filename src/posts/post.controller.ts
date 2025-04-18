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
import { CreateCommentValidation } from '../comment/dtos/create-comment.validation';
import { JwtAuth } from '../common/decorators/jwt-auth.decorator';
import { RequiresRoles } from '../common/decorators/requires-roles.decorator';
import { Roles } from '../common/constants/user.constants';

@injectable()
export class PostController {
  private readonly postService: PostService;
  constructor(
    @inject(POST_INV.PostService)
    postService: PostService
  ) {
    this.postService = postService;
  }

  @JwtAuth()
  @RequiresRoles([Roles.ADMIN, Roles.USER, Roles.COMPANY, Roles.COMPANY_OWNER])
  async getAllPosts(req: Request, res: Response, next: NextFunction) {
    const data = await this.postService.getAllPosts();

    const responseData = plainToInstance(PostResponseDto, data, { excludeExtraneousValues: true });

    return res.status(StatusCodes.OK).json(responseData);
  }

  @JwtAuth()
  @RequiresRoles([Roles.ADMIN, Roles.USER, Roles.COMPANY, Roles.COMPANY_OWNER])
  async getAllPostByCompany(req: Request, res: Response, next: NextFunction) {
    const companyId = Number(req.params.companyId);

    //validate logic

    const data = await this.postService.getPostsByCompany(companyId);

    //response logic

    const responseData = plainToInstance(PostResponseDto, data, { excludeExtraneousValues: true });

    return res.status(StatusCodes.OK).json(responseData);
  }

  @JwtAuth()
  @RequiresRoles([Roles.ADMIN, Roles.USER, Roles.COMPANY, Roles.COMPANY_OWNER])
  async getAllPostsByUser(req: Request, res: Response, next: NextFunction) {
    const userId = Number(req.params.userId);

    //validate logic

    const data = await this.postService.getAllPostsByUserId(userId);

    //response logic

    const responseData = plainToInstance(PostResponseDto, data, { excludeExtraneousValues: true });

    return res.status(StatusCodes.OK).json(responseData);
  }

  @JwtAuth()
  @RequiresRoles([Roles.ADMIN, Roles.USER, Roles.COMPANY, Roles.COMPANY_OWNER])
  async getMostRecentCompanyPosts(req: Request, res: Response, next: NextFunction) {
    const companyId = Number(req.params.companyId);
    const limit = Number(req.query.limit);

    //validate logic

    const data = await this.postService.getMostRecentCompanyPosts(companyId, limit);

    //response logic

    const responseData = plainToInstance(PostResponseDto, data, { excludeExtraneousValues: true });

    return res.status(StatusCodes.OK).json(responseData);
  }

  @JwtAuth()
  @RequiresRoles([Roles.ADMIN, Roles.USER, Roles.COMPANY, Roles.COMPANY_OWNER])
  async getMostRecentUserPosts(req: Request, res: Response, next: NextFunction) {
    const userId = Number(req.params.userId);
    const limit = Number(req.query.limit);

    //validate logic

    const data = await this.postService.getMostRecentUserPosts(userId, limit);

    //response logic

    const responseData = plainToInstance(PostResponseDto, data, { excludeExtraneousValues: true });

    return res.status(StatusCodes.OK).json(responseData);
  }

  @JwtAuth()
  @RequiresRoles([Roles.USER, Roles.COMPANY_OWNER])
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

  @JwtAuth()
  @RequiresRoles([Roles.COMPANY])
  async createPostCompany(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    const companyId = Number(req.params.companyId);

    if (!companyId) {
      throw new NotFoundException('Company not found');
    }

    await validateBody(body, CreatePostValidation);

    const data = await this.postService.createPostCompany(companyId, body);

    //response logic

    const responseData = plainToInstance(PostResponseDto, data, { excludeExtraneousValues: true });

    return res.status(StatusCodes.CREATED).json(responseData);
  }

  @JwtAuth()
  @RequiresRoles([Roles.USER, Roles.COMPANY_OWNER])
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

  @JwtAuth()
  @RequiresRoles([Roles.COMPANY])
  async likePostCompany(req: Request, res: Response, next: NextFunction) {
    const postId = Number(req.params.postId);
    const companyId = Number(req.params.companyId);

    if (!postId || !companyId) {
      throw new NotFoundException('Company or post not found');
    }

    const data = await this.postService.likePostCompany(postId, companyId);

    const responseData = plainToInstance(PostResponseDto, data, { excludeExtraneousValues: true });

    return res.status(StatusCodes.OK).json(responseData);
  }

  @JwtAuth()
  @RequiresRoles([Roles.USER, Roles.COMPANY_OWNER])
  async unlikePost(req: Request, res: Response, next: NextFunction) {
    const postId = Number(req.params.postId);
    const userId = Number(req.params.userId);

    if (!postId || !userId) {
      throw new NotFoundException('User or post not found');
    }

    const data = await this.postService.unlikePost(postId, userId);

    const responseData = plainToInstance(PostResponseDto, data, { excludeExtraneousValues: true });

    return res.status(StatusCodes.OK).json(responseData);
  }

  @JwtAuth()
  @RequiresRoles([Roles.COMPANY])
  async unlikePostCompany(req: Request, res: Response, next: NextFunction) {
    const postId = Number(req.params.postId);
    const companyId = Number(req.params.companyId);

    if (!postId || !companyId) {
      throw new NotFoundException('Company or post not found');
    }

    const data = await this.postService.unlikePostCompany(postId, companyId);

    const responseData = plainToInstance(PostResponseDto, data, { excludeExtraneousValues: true });

    return res.status(StatusCodes.OK).json(responseData);
  }

  @JwtAuth()
  @RequiresRoles([Roles.USER, Roles.COMPANY_OWNER])
  async commentPost(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    const userId = Number(req.params.userId);
    const postId = Number(req.params.postId);

    //validate logic

    if (!userId || !postId) {
      throw new NotFoundException('User or post not found');
    }

    await validateBody(body, CreateCommentValidation);

    const data = await this.postService.commentPost(userId, postId, body);

    //response logic

    const responseData = plainToInstance(PostResponseDto, data, { excludeExtraneousValues: true });

    return res.status(StatusCodes.OK).json(responseData);
  }

  @JwtAuth()
  @RequiresRoles([Roles.COMPANY])
  async commentPostCompany(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    const companyId = Number(req.params.companyId);
    const postId = Number(req.params.postId);

    //validate logic

    if (!companyId || !postId) {
      throw new NotFoundException('Company or post not found');
    }

    await validateBody(body, CreateCommentValidation);

    const data = await this.postService.commentPostCompany(companyId, postId, body);

    //response logic

    const responseData = plainToInstance(PostResponseDto, data, { excludeExtraneousValues: true });

    return res.status(StatusCodes.OK).json(responseData);
  }

  @JwtAuth()
  @RequiresRoles([Roles.ADMIN])
  async removePost(req: Request, res: Response, next: NextFunction) {
    const postId = Number(req.params.postId);

    if (!postId) {
      throw new NotFoundException('Post not found');
    }

    await this.postService.removePost(postId);

    return res.status(StatusCodes.OK).json({ message: 'Post removed successfully' });
  }
}
