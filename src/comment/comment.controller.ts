import { NextFunction, Response, Request } from 'express';
import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';

import { CommentService } from './comment.service';
import { COMMENT_INV } from '../common/utils/inversifyConstants';
import { NotFoundException } from '../common/exceptions/not-found.exception';
import { plainToInstance } from 'class-transformer';
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

    return res.status(StatusCodes.OK).json(data);
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
}
