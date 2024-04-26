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

  findAll() {
    return this.commentRepo.find({
      relations: {
        author: true,
      },
    });
  }

  create(commentData: Partial<Comment>) {
    const comment = this.commentRepo.create(commentData);

    return this.commentRepo.save(comment);
  }
}
