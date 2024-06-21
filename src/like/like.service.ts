import { inject, injectable } from 'inversify';

import { LikeRepository } from './like.repository';
import { LIKE_INV } from '../common/utils/inversifyConstants';
import { Post } from '../posts/entities/post.entity';
import { User } from '../user/entities/user.entity';
import { Company } from '../company/entities/company.entity';

@injectable()
export class LikeService {
  private readonly likeRepository: LikeRepository;

  constructor(@inject(LIKE_INV.LikeRepository) likeRepository: LikeRepository) {
    this.likeRepository = likeRepository;
  }

  findOneByPostIdAndUserId(postId: number, userId: number) {
    return this.likeRepository.findOneByPostAndUser(postId, userId);
  }

  findOneByPostIdAndCompanyId(postId: number, companyId: number) {
    return this.likeRepository.findOneByPostAndCompany(postId, companyId);
  }

  findOneByCommentIdAndUserId(commentId: number, userId: number) {
    return this.likeRepository.findOneByCommentAndUser(commentId, userId);
  }

  findOneByCommentIdAndCompanyId(commentId: number, companyId: number) {
    return this.likeRepository.findOneByCommentAndCompany(commentId, companyId);
  }

  delete(likeId: number) {
    return this.likeRepository.delete(likeId);
  }

  createLikePost(post: Post, author: User) {
    return this.likeRepository.create({
      post,
      author,
    });
  }

  createLikePostCompany(post: Post, company: Company) {
    return this.likeRepository.create({
      post,
      company,
    });
  }

  createLikeComment(comment, author) {
    return this.likeRepository.create({
      comment,
      author,
    });
  }

  createLikeCommentCompany(comment, company) {
    return this.likeRepository.create({
      comment,
      company,
    });
  }

  removeLikesByUserId(userId: number) {
    return this.likeRepository.deleteByUserId(userId);
  }

  removeLikesByCompanyId(companyId: number) {
    return this.likeRepository.deleteByCompanyId(companyId);
  }
}
