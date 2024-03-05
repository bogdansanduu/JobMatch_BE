import { Repository } from 'typeorm';
import { injectable } from 'inversify';

import { UserRepositoryInterface } from './interfaces/user-repository.interface';
import { User } from './entities/user.entity';
import { dataSource } from '../database/dataSource';

@injectable()
export class UserRepository implements UserRepositoryInterface {
  private userRepo: Repository<User>;

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

    return await this.userRepo.save(user);
  }

  async deleteUser(id: number) {
    const deleteResult = await this.userRepo.delete(id);

    console.log(deleteResult);
  }

  getAllUsers() {
    return this.userRepo.find();
  }

  getUser(id: number) {
    return this.userRepo.findOne({
      where: {
        id,
      },
    });
  }

  async updateUser(id: number, user: Partial<User>) {
    await this.userRepo.update(id, user);

    return this.findOne(id);
  }
}

export default UserRepository;
