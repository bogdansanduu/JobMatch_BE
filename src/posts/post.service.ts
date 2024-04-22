import { inject, injectable } from 'inversify';

import { CreatePostDto } from './dtos/create-post.dto';
import { LIKE_INV, POST_INV, USER_INV } from '../common/utils/inversifyConstants';
import UserService from '../user/user.service';
import { NotFoundException } from '../common/exceptions/not-found.exception';
import { PostRepository } from './post.repository';
import { LikeRepository } from '../like/like.repository';
import { PostServiceInterface } from './interfaces/post-service.interface';

@injectable()
export class PostService implements PostServiceInterface {
  private readonly userService: UserService;
  private readonly postRepository: PostRepository;
  private readonly likeRepository: LikeRepository;

  constructor(
    @inject(USER_INV.UserService)
    userService: UserService,
    @inject(POST_INV.PostRepository)
    postRepository: PostRepository,
    @inject(LIKE_INV.LikeRepository)
    likeRepository: LikeRepository
  ) {
    this.postRepository = postRepository;
    this.userService = userService;
    this.likeRepository = likeRepository;
  }

  getPostById(id: number) {
    return this.postRepository.findOne(id);
  }

  async getAllPosts() {
    return this.postRepository.findAll();
  }

  async createPost(userId: number, postDto: CreatePostDto) {
    const user = await this.userService.findOneById(userId);

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
    const user = await this.userService.findOneById(userId);

    if (!post || !user) {
      throw new NotFoundException('User or post not found');
    }

    const alreadyLiked = await this.likeRepository.findOneByPostAndUser(postId, userId);

    if (alreadyLiked) {
      return post;
    }

    const like = await this.likeRepository.create({
      post,
      author: user,
    });
    post.likes.push(like);

    return this.postRepository.update(post.id, post);
  }
}
