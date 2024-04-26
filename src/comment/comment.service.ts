import { inject, injectable } from 'inversify';

import { CommentRepository } from './comment.repository';
import { COMMENT_INV } from '../common/utils/inversifyConstants';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { NotFoundException } from '../common/exceptions/not-found.exception';
import { Post } from '../posts/entities/post.entity';
import { User } from '../user/entities/user.entity';

@injectable()
export class CommentService {
  // private readonly userService: UserService;
  // private readonly postService: PostService;
  private readonly commentRepository: CommentRepository;

  constructor(
    // @inject(USER_INV.UserService)
    // userService: UserService,
    // @inject(POST_INV.PostService)
    // postService: PostService,
    @inject(COMMENT_INV.CommentRepository) commentRepository: CommentRepository
  ) {
    // this.userService = userService;
    // this.postService = postService;
    this.commentRepository = commentRepository;
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
}
