import { inject, injectable } from 'inversify';

import { CreatePostDto } from './dtos/create-post.dto';
import { COMMENT_INV, COMPANY_INV, LIKE_INV, POST_INV, USER_INV } from '../common/utils/inversifyConstants';
import UserService from '../user/user.service';
import { NotFoundException } from '../common/exceptions/not-found.exception';
import { PostRepository } from './post.repository';
import { PostServiceInterface } from './interfaces/post-service.interface';
import { CreateCommentDto } from '../comment/dtos/create-comment.dto';
import { CommentService } from '../comment/comment.service';
import { LikeService } from '../like/like.service';
import { CompanyService } from '../company/company.service';

@injectable()
export class PostService implements PostServiceInterface {
  private readonly userService: UserService;
  private readonly companyService: CompanyService;
  private readonly commentService: CommentService;
  private readonly likeService: LikeService;
  private readonly postRepository: PostRepository;

  constructor(
    @inject(USER_INV.UserService)
    userService: UserService,
    @inject(COMPANY_INV.CompanyService)
    companyService: CompanyService,
    @inject(COMMENT_INV.CommentService)
    commentService: CommentService,
    @inject(POST_INV.PostRepository)
    postRepository: PostRepository,
    @inject(LIKE_INV.LikeService)
    likeService: LikeService
  ) {
    this.postRepository = postRepository;
    this.userService = userService;
    this.companyService = companyService;
    this.commentService = commentService;
    this.likeService = likeService;
  }

  getPostById(id: number) {
    return this.postRepository.findOne(id);
  }

  async getAllPosts() {
    return this.postRepository.findAll();
  }

  async getPostsByCompany(companyId: number) {
    const company = await this.companyService.getCompanyById(companyId);

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    return this.postRepository.findByCompanyId(company.id);
  }

  async getMostRecentCompanyPosts(companyId: number, limit: number) {
    const company = await this.companyService.getCompanyById(companyId);

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    return this.postRepository.findMostRecentByCompanyId(company.id, limit);
  }

  async createPost(userId: number, postDto: CreatePostDto) {
    const user = await this.userService.getUserById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const newPost = await this.postRepository.create({
      ...postDto,
      author: user,
    });

    return this.getPostById(newPost.id);
  }

  async createPostCompany(companyId: number, postDto: CreatePostDto) {
    const company = await this.companyService.getCompanyById(companyId);

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    const newPost = await this.postRepository.create({
      ...postDto,
      company,
    });

    return this.getPostById(newPost.id);
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

  async likePostCompany(postId: number, companyId: number) {
    const post = await this.getPostById(postId);
    const company = await this.companyService.getCompanyById(companyId);

    if (!post || !company) {
      throw new NotFoundException('Company or post not found');
    }

    const alreadyLiked = await this.likeService.findOneByPostIdAndCompanyId(postId, companyId);

    if (alreadyLiked) {
      return this.getPostById(postId);
    }

    await this.likeService.createLikePostCompany(post, company);

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

  async unlikePostCompany(postId: number, companyId: number) {
    const post = await this.getPostById(postId);
    const company = await this.companyService.getCompanyById(companyId);

    if (!post || !company) {
      throw new NotFoundException('Company or post not found');
    }

    const alreadyLiked = await this.likeService.findOneByPostIdAndCompanyId(postId, companyId);

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

    await this.commentService.createComment(post, commentDto, userId);

    return this.postRepository.findOne(postId);
  }

  async commentPostCompany(companyId, postId, commentDto: CreateCommentDto) {
    const company = await this.companyService.getCompanyById(companyId);
    const post = await this.getPostById(postId);

    if (!company || !post) {
      throw new NotFoundException('Company or post not found');
    }

    await this.commentService.createComment(post, commentDto, undefined, company);

    return this.postRepository.findOne(postId);
  }
}
