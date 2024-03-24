import { Repository } from 'typeorm';
import { injectable } from 'inversify';

import { UserRepositoryInterface } from './interfaces/user-repository.interface';
import { User } from './entities/user.entity';
import { dataSource } from '../database/dataSource';

@injectable()
export class UserRepository implements UserRepositoryInterface {
  private readonly userRepo: Repository<User>;

  constructor() {
    this.userRepo = dataSource.getRepository(User);
  }

  private findOne(id: number) {
    return this.userRepo.findOne({
      where: {
        id,
      },
    });
  }

  async createUser(userData: { firstName: string; lastName: string; password: string; email: string }) {
    const user = this.userRepo.create(userData);

    return this.userRepo.save(user);
  }

  deleteUser(id: number) {
    return this.userRepo.delete(id);
  }

  getAllUsers() {
    return this.userRepo.find();
  }

  getUserById(id: number) {
    return this.userRepo.findOne({
      where: {
        id,
      },
    });
  }

  getUserByEmail(email: string) {
    return this.userRepo.findOne({
      where: {
        email,
      },
    });
  }

  async updateUser(id: number, user: Partial<User>) {
    await this.userRepo.update(id, user);

    return this.findOne(id);
  }
}

export default UserRepository;
