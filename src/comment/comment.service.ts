import { inject, injectable } from 'inversify';

import { CommentRepository } from './comment.repository';
import { COMMENT_INV, LIKE_INV, USER_INV } from '../common/utils/inversifyConstants';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { NotFoundException } from '../common/exceptions/not-found.exception';
import { Post } from '../posts/entities/post.entity';
import { User } from '../user/entities/user.entity';
import { LikeService } from '../like/like.service';
import UserService from '../user/user.service';

@injectable()
export class CommentService {
  private readonly userService: UserService;
  private readonly likeService: LikeService;
  private readonly commentRepository: CommentRepository;

  constructor(
    @inject(USER_INV.UserService)
    userService: UserService,
    @inject(LIKE_INV.LikeService)
    likeService: LikeService,
    @inject(COMMENT_INV.CommentRepository) commentRepository: CommentRepository
  ) {
    this.userService = userService;
    this.likeService = likeService;
    this.commentRepository = commentRepository;
  }

  getCommentById(id: number) {
    return this.commentRepository.findOne(id);
  }

  async getAllComments() {
    return this.commentRepository.findAll();
  }

  async createComment(user: User, post: Post, commentDto: CreateCommentDto) {
    if (!user || !post) {
      throw new NotFoundException('User or post not found');
    }

    return await this.commentRepository.create({
      ...commentDto,
      author: user,
      post: post,
    });
  }

  async likeComment(commentId: number, userId: number) {
    const comment = await this.getCommentById(commentId);
    const user = await this.userService.getUserById(userId);

    if (!comment || !user) {
      throw new NotFoundException('User or comment not found');
    }

    const alreadyLiked = await this.likeService.findOneByCommentIdAndUserId(commentId, userId);

    if (alreadyLiked) {
      return this.getCommentById(commentId);
    }

    await this.likeService.createLikeComment(comment, user);

    return this.commentRepository.findOne(commentId);
  }

  async unlikeComment(commentId: number, userId: number) {
    const comment = await this.getCommentById(commentId);
    const user = await this.userService.getUserById(userId);

    if (!comment || !user) {
      throw new NotFoundException('User or comment not found');
    }

    const alreadyLiked = await this.likeService.findOneByCommentIdAndUserId(commentId, userId);

    if (!alreadyLiked) {
      return this.getCommentById(commentId);
    }

    await this.likeService.delete(alreadyLiked.id);

    return this.getCommentById(commentId);
  }
}
