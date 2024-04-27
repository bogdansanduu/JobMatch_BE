import { Repository } from 'typeorm';
import { injectable } from 'inversify';

import { Comment } from './entities/comment.entity';
import { dataSource } from '../database/dataSource';

@injectable()
export class CommentRepository {
  private readonly commentRepo: Repository<Comment>;

  constructor() {
    this.commentRepo = dataSource.getRepository<Comment>(Comment);
  }

  findOne(id: number) {
    return this.commentRepo.findOne({
      where: {
        id,
      },
      relations: {
        likes: {
          author: true,
        },
        post: true,
        author: true,
      },
    });
  }

  findAll() {
    return this.commentRepo.find({
      relations: {
        likes: {
          author: true,
        },
        post: true,
        author: true,
      },
    });
  }

  create(commentData: Partial<Comment>) {
    const comment = this.commentRepo.create(commentData);

    return this.commentRepo.save(comment);
  }
}
