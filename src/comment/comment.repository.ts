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
          company: true,
        },
        post: true,
        author: true,
        company: true,
      },
    });
  }

  findAll() {
    return this.commentRepo.find({
      relations: {
        likes: {
          author: true,
          company: true,
        },
        post: true,
        author: true,
        company: true,
      },
    });
  }

  create(commentData: Partial<Comment>) {
    const comment = this.commentRepo.create(commentData);

    return this.commentRepo.save(comment);
  }

  deleteByUserId(userId: number) {
    return this.commentRepo.delete({
      author: {
        id: userId,
      },
    });
  }

  deleteByCompanyId(companyId: number) {
    return this.commentRepo.delete({
      company: {
        id: companyId,
      },
    });
  }
}
