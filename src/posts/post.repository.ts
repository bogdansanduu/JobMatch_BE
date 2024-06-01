import { Repository } from 'typeorm';
import { injectable } from 'inversify';

import { Post } from './entities/post.entity';
import { dataSource } from '../database/dataSource';
import { PostRepositoryInterface } from './interfaces/post-repository.interface';

@injectable()
export class PostRepository implements PostRepositoryInterface {
  private readonly postRepo: Repository<Post>;

  constructor() {
    this.postRepo = dataSource.getRepository<Post>(Post);
  }

  findOne(id: number) {
    return this.postRepo.findOne({
      where: {
        id,
      },
      relations: {
        likes: {
          author: true,
          company: true,
        },
        comments: {
          author: true,
          likes: {
            author: true,
            company: true,
          },
          post: true,
        },
        author: true,
        company: true,
      },
    });
  }

  findAll() {
    return this.postRepo.find({
      relations: {
        likes: {
          author: true,
          company: true,
        },
        comments: {
          author: true,
          likes: {
            author: true,
            company: true,
          },
          post: true,
        },
        author: true,
        company: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  findByCompanyId(companyId: number) {
    return this.postRepo.find({
      where: {
        company: {
          id: companyId,
        },
      },
      relations: {
        likes: {
          author: true,
          company: true,
        },
        comments: {
          author: true,
          likes: {
            author: true,
            company: true,
          },
          post: true,
        },
        author: true,
        company: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  findMostRecentByCompanyId(companyId: number, limit: number) {
    return this.postRepo.find({
      where: {
        company: {
          id: companyId,
        },
      },
      take: limit,
      relations: {
        likes: {
          author: true,
          company: true,
        },
        comments: {
          author: true,
          likes: {
            author: true,
            company: true,
          },
          post: true,
        },
        author: true,
        company: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async create(postData: Partial<Post>) {
    const post = this.postRepo.create(postData);

    return this.postRepo.save(post);
  }

  async update(id: number, post: Partial<Post>) {
    await this.postRepo.update(id, post);

    return this.findOne(id);
  }
}
