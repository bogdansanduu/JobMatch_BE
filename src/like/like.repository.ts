import { Repository } from 'typeorm';
import { injectable } from 'inversify';

import { Like } from './entities/like.entity';
import { dataSource } from '../database/dataSource';
import { LikeRepositoryInterfaces } from './interfaces/like-repository.interfaces';

@injectable()
export class LikeRepository implements LikeRepositoryInterfaces {
  private readonly likeRepo: Repository<Like>;

  constructor() {
    this.likeRepo = dataSource.getRepository<Like>(Like);
  }

  async create(likeData: Partial<Like>) {
    const like = this.likeRepo.create(likeData);

    return this.likeRepo.save(like);
  }

  async delete(id: number) {
    await this.likeRepo.delete(id);
  }

  async findOne(id: number) {
    return this.likeRepo.findOne({
      where: {
        id,
      },
    });
  }

  async findOneByPostAndUser(postId: number, userId: number) {
    return this.likeRepo.findOne({
      where: {
        post: {
          id: postId,
        },
        author: {
          id: userId,
        },
      },
    });
  }

  async findOneByPostAndCompany(postId: number, companyId: number) {
    return this.likeRepo.findOne({
      where: {
        post: {
          id: postId,
        },
        company: {
          id: companyId,
        },
      },
    });
  }

  async findOneByCommentAndUser(commentId: number, userId: number) {
    return this.likeRepo.findOne({
      where: {
        comment: {
          id: commentId,
        },
        author: {
          id: userId,
        },
      },
    });
  }

  async findOneByCommentAndCompany(commentId: number, companyId: number) {
    return this.likeRepo.findOne({
      where: {
        comment: {
          id: commentId,
        },
        company: {
          id: companyId,
        },
      },
    });
  }

  async deleteByUserId(userId: number) {
    return this.likeRepo.delete({
      author: {
        id: userId,
      },
    });
  }

  async deleteByCompanyId(companyId: number) {
    return this.likeRepo.delete({
      company: {
        id: companyId,
      },
    });
  }
}
