import { inject, injectable } from 'inversify';

import { CreatePostDto } from './dtos/create-post.dto';
import { COMMENT_INV, LIKE_INV, POST_INV, USER_INV } from '../common/utils/inversifyConstants';
import UserService from '../user/user.service';
import { NotFoundException } from '../common/exceptions/not-found.exception';
import { PostRepository } from './post.repository';
import { PostServiceInterface } from './interfaces/post-service.interface';
import { CreateCommentDto } from '../comment/dtos/create-comment.dto';
import { CommentService } from '../comment/comment.service';
import { LikeService } from '../like/like.service';

@injectable()
export class PostService implements PostServiceInterface {
  private readonly userService: UserService;
  private readonly commentService: CommentService;
  private readonly likeService: LikeService;
  private readonly postRepository: PostRepository;

  constructor(
    @inject(USER_INV.UserService)
    userService: UserService,
    @inject(COMMENT_INV.CommentService)
    commentService: CommentService,
    @inject(POST_INV.PostRepository)
    postRepository: PostRepository,
    @inject(LIKE_INV.LikeService)
    likeService: LikeService
  ) {
    this.postRepository = postRepository;
    this.userService = userService;
    this.commentService = commentService;
    this.likeService = likeService;
  }

  getPostById(id: number) {
    return this.postRepository.findOne(id);
  }

  async getAllPosts() {
    return this.postRepository.findAll();
  }

  async createPost(userId: number, postDto: CreatePostDto) {
    const user = await this.userService.getUserById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return await this.postRepository.create({
      ...postDto,
      author: user,
    });
  }

  async likePost(postId: number, userId: number) {
    const post = await this.getPostById(postId);
    const user = await this.userService.getUserById(userId);

    if (!post || !user) {
      throw new NotFoundException('User or post not found');
    }

    const alreadyLiked = await this.likeService.findOneByPostIdAndUserId(postId, userId);

    if (alreadyLiked) {
      return this.getPostById(postId);
    }

    await this.likeService.createLikePost(post, user);

    return this.postRepository.findOne(postId);
  }

  async unlikePost(postId: number, userId: number) {
    const post = await this.getPostById(postId);
    const user = await this.userService.getUserById(userId);

    if (!post || !user) {
      throw new NotFoundException('User or post not found');
    }

    const alreadyLiked = await this.likeService.findOneByPostIdAndUserId(postId, userId);

    if (!alreadyLiked) {
      return this.getPostById(postId);
    }

    await this.likeService.delete(alreadyLiked.id);

    return this.postRepository.findOne(postId);
  }

  async commentPost(userId, postId, commentDto: CreateCommentDto) {
    const user = await this.userService.getUserById(userId);
    const post = await this.getPostById(postId);

    if (!user || !post) {
      throw new NotFoundException('User or post not found');
    }

    await this.commentService.createComment(userId, postId, commentDto);

    return this.postRepository.findOne(postId);
  }
}
