import { inject, injectable } from 'inversify';

import { LikeRepository } from './like.repository';
import { LIKE_INV } from '../common/utils/inversifyConstants';
import { Post } from '../posts/entities/post.entity';
import { User } from '../user/entities/user.entity';

@injectable()
export class LikeService {
  private readonly likeRepository: LikeRepository;

  constructor(@inject(LIKE_INV.LikeRepository) likeRepository: LikeRepository) {
    this.likeRepository = likeRepository;
  }

  findOneByPostIdAndUserId(postId: number, userId: number) {
    return this.likeRepository.findOneByPostAndUser(postId, userId);
  }

  findOneByCommentIdAndUserId(commentId: number, userId: number) {
    return this.likeRepository.findOneByCommentAndUser(commentId, userId);
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

  createLikeComment(comment, author) {
    return this.likeRepository.create({
      comment,
      author,
    });
  }
}
