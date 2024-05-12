import { NextFunction, Response, Request } from 'express';
import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { plainToInstance } from 'class-transformer';

import { CommentService } from './comment.service';
import { COMMENT_INV } from '../common/utils/inversifyConstants';
import { NotFoundException } from '../common/exceptions/not-found.exception';
import { CommentResponseDto } from './dtos/comment-response.dto';

@injectable()
export class CommentController {
  private readonly commentService: CommentService;

  constructor(
    @inject(COMMENT_INV.CommentService)
    commentService: CommentService
  ) {
    this.commentService = commentService;
  }

  async getAllComments(req: Request, res: Response, next: NextFunction) {
    const data = await this.commentService.getAllComments();

    //response logic

    const responseData = plainToInstance(CommentResponseDto, data, { excludeExtraneousValues: true });

    return res.status(StatusCodes.OK).json(responseData);
  }

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
