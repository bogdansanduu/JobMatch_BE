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
}
