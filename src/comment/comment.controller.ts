import { NextFunction, Response, Request } from 'express';
import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { plainToInstance } from 'class-transformer';

import { CommentService } from './comment.service';
import { COMMENT_INV } from '../common/utils/inversifyConstants';
import { NotFoundException } from '../common/exceptions/not-found.exception';
import { CommentResponseDto } from './dtos/comment-response.dto';
import { JwtAuth } from '../common/decorators/jwt-auth.decorator';
import { RequiresRoles } from '../common/decorators/requires-roles.decorator';
import { Roles } from '../common/constants/user.constants';

@injectable()
export class CommentController {
  private readonly commentService: CommentService;

  constructor(
    @inject(COMMENT_INV.CommentService)
    commentService: CommentService
  ) {
    this.commentService = commentService;
  }

  @JwtAuth()
  @RequiresRoles([Roles.ADMIN, Roles.USER, Roles.COMPANY, Roles.COMPANY_OWNER])
  async getAllComments(req: Request, res: Response, next: NextFunction) {
    const data = await this.commentService.getAllComments();

    //response logic

    const responseData = plainToInstance(CommentResponseDto, data, { excludeExtraneousValues: true });

    return res.status(StatusCodes.OK).json(responseData);
  }

  @JwtAuth()
  @RequiresRoles([Roles.USER, Roles.COMPANY_OWNER])
  async likeComment(req: Request, res: Response, next: NextFunction) {
    const commentId = Number(req.params.commentId);
    const userId = Number(req.params.userId);

    //validate logic

    if (!commentId || !userId) {
      throw new NotFoundException('User or comment not found');
    }

    const data = await this.commentService.likeComment(commentId, userId);

    //response logic

    const responseData = plainToInstance(CommentResponseDto, data, { excludeExtraneousValues: true });

    return res.status(StatusCodes.OK).json(responseData);
  }

  @JwtAuth()
  @RequiresRoles([Roles.COMPANY])
  async likeCommentCompany(req: Request, res: Response, next: NextFunction) {
    const commentId = Number(req.params.commentId);
    const companyId = Number(req.params.companyId);

    //validate logic

    if (!commentId || !companyId) {
      throw new NotFoundException('Company or comment not found');
    }

    const data = await this.commentService.likeCommentCompany(commentId, companyId);

    //response logic

    const responseData = plainToInstance(CommentResponseDto, data, { excludeExtraneousValues: true });

    return res.status(StatusCodes.OK).json(responseData);
  }

  @JwtAuth()
  @RequiresRoles([Roles.USER, Roles.COMPANY_OWNER])
  async unlikeComment(req: Request, res: Response, next: NextFunction) {
    const commentId = Number(req.params.commentId);
    const userId = Number(req.params.userId);

    //validate logic

    if (!commentId || !userId) {
      throw new NotFoundException('User or comment not found');
    }

    const data = await this.commentService.unlikeComment(commentId, userId);

    //response logic

    const responseData = plainToInstance(CommentResponseDto, data, { excludeExtraneousValues: true });

    return res.status(StatusCodes.OK).json(responseData);
  }

  @JwtAuth()
  @RequiresRoles([Roles.COMPANY])
  async unlikeCommentCompany(req: Request, res: Response, next: NextFunction) {
    const commentId = Number(req.params.commentId);
    const companyId = Number(req.params.companyId);

    //validate logic

    if (!commentId || !companyId) {
      throw new NotFoundException('Company or comment not found');
    }

    const data = await this.commentService.unlikeCommentCompany(commentId, companyId);

    //response logic

    const responseData = plainToInstance(CommentResponseDto, data, { excludeExtraneousValues: true });

    return res.status(StatusCodes.OK).json(responseData);
  }
}
