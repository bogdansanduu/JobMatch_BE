import { Post } from '../entities/post.entity';

export interface PostRepositoryInterface {
  findOne: (id: number) => Promise<Post | null>;
  findAll: () => Promise<Post[]>;
  create: (postData: Partial<Post>) => Promise<Post>;
  // update: (id: number, post: Partial<Post>) => Promise<Post | null>;
}
