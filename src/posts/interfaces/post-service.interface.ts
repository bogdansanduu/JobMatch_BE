import { Post } from '../entities/post.entity';
import { CreatePostDto } from '../dtos/create-post.dto';

export interface PostServiceInterface {
  getPostById: (id: number) => Promise<Post | null>;
  getAllPosts: () => Promise<Post[]>;
  createPost: (userId: number, postData: CreatePostDto) => Promise<Post>;
  likePost: (postId: number, userId: number) => Promise<Post | null>;
}
