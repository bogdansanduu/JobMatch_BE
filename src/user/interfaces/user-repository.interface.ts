import { User } from '../entities/user.entity';
import { DeleteResult } from 'typeorm';

export interface UserRepositoryInterface {
  createUser: (user: any) => Promise<User>;
  saveUser: (user: User) => Promise<User>;
  getAllUsers: () => Promise<User[]>;
  getUserById: (id: number) => Promise<User | null>;
  getUserByEmail: (email: string) => Promise<User | null>;
  updateUser: (id: number, user: Partial<User>) => Promise<User | null>;
  deleteUser: (id: number) => Promise<DeleteResult>;
  searchByNameAndEmail: (searchTerms: string[]) => Promise<User[]>;
}
