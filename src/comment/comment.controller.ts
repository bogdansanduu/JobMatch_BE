import { NextFunction, Response, Request } from 'express';
import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';

import { CommentService } from './comment.service';
import { COMMENT_INV } from '../common/utils/inversifyConstants';
// import { NotFoundException } from '../common/exceptions/not-found.exception';
// import { validate } from 'class-validator';
// import { CreateCommentValidation } from './dtos/create-comment.validation';

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

  // async createComment(req: Request, res: Response, next: NextFunction) {
  //   const body = req.body;
  //   const userId = Number(req.params.userId);
  //   const postId = Number(req.params.postId);
  //
  //   //validate logic
  //
  //   if (!userId || !postId) {
  //     throw new NotFoundException('User or post not found');
  //   }
  //
  //   await validate(body, CreateCommentValidation);
  //
  //   const data = await this.commentService.createComment(userId, postId, body);
  //
  //   //response logic
  //
  //   //TODO
  //
  //   return res.status(StatusCodes.CREATED).json(data);
  // }
}
