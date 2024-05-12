import { inject, injectable } from 'inversify';

import { CommentRepository } from './comment.repository';
import { COMMENT_INV, COMPANY_INV, LIKE_INV, USER_INV } from '../common/utils/inversifyConstants';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { NotFoundException } from '../common/exceptions/not-found.exception';
import { Post } from '../posts/entities/post.entity';
import { User } from '../user/entities/user.entity';
import { LikeService } from '../like/like.service';
import UserService from '../user/user.service';
import { Company } from '../company/entities/company.entity';
import { CompanyService } from '../company/company.service';

@injectable()
export class CommentService {
  private readonly userService: UserService;
  private readonly companyService: CompanyService;
  private readonly likeService: LikeService;
  private readonly commentRepository: CommentRepository;

  constructor(
    @inject(USER_INV.UserService)
    userService: UserService,
    @inject(COMPANY_INV.CompanyService)
    companyService: CompanyService,
    @inject(LIKE_INV.LikeService)
    likeService: LikeService,
    @inject(COMMENT_INV.CommentRepository) commentRepository: CommentRepository
  ) {
    this.userService = userService;
    this.companyService = companyService;
    this.likeService = likeService;
    this.commentRepository = commentRepository;
  }

  getCommentById(id: number) {
    return this.commentRepository.findOne(id);
  }

  async getAllComments() {
    return this.commentRepository.findAll();
  }

  async createComment(post: Post, commentDto: CreateCommentDto, user?: User, company?: Company) {
    if ((!user && !company) || !post) {
      throw new NotFoundException('User or company or post not found');
    }

    await this.commentRepository.create({
      ...commentDto,
      post: post,
      ...(user && { author: user }),
      ...(company && { company: company }),
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

  async likeCommentCompany(commentId: number, companyId: number) {
    const comment = await this.getCommentById(commentId);
    const company = await this.companyService.getCompanyById(companyId);

    if (!comment || !company) {
      throw new NotFoundException('Company or comment not found');
    }

    const alreadyLiked = await this.likeService.findOneByCommentIdAndCompanyId(commentId, companyId);

    if (alreadyLiked) {
      return this.getCommentById(commentId);
    }

    await this.likeService.createLikeCommentCompany(comment, company);

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

  async unlikeCommentCompany(commentId: number, companyId: number) {
    const comment = await this.getCommentById(commentId);
    const company = await this.companyService.getCompanyById(companyId);

    if (!comment || !company) {
      throw new NotFoundException('Company or comment not found');
    }

    const alreadyLiked = await this.likeService.findOneByCommentIdAndCompanyId(commentId, companyId);

    if (!alreadyLiked) {
      return this.getCommentById(commentId);
    }

    await this.likeService.delete(alreadyLiked.id);

    return this.getCommentById(commentId);
  }
}
