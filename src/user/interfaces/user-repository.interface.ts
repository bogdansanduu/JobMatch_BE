import { User } from '../entities/user.entity';

//TODO
//add DTOs
export interface UserRepositoryInterface {
  createUser: (user: any) => Promise<User>;
  getAllUsers: () => Promise<User[]>;
  getUser: (id: number) => Promise<User | null>;
  updateUser: (id: number, user: Partial<User>) => Promise<User | null>;
  deleteUser: (id: number) => Promise<void>;
}
