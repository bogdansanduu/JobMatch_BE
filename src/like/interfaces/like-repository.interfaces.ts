import { Like } from '../entities/like.entity';

export interface LikeRepositoryInterfaces {
  findOne: (id: number) => Promise<Like | null>;
  findOneByPostAndUser: (postId: number, userId: number) => Promise<Like | null>;
  findOneByCommentAndUser: (commentId: number, userId: number) => Promise<Like | null>;
  create: (likeData: Partial<Like>) => Promise<Like>;
}
