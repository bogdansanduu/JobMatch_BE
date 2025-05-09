import { DeepPartial, ILike, Repository } from 'typeorm';
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

  async createUser(userData: DeepPartial<User>) {
    const user = this.userRepo.create(userData);

    return this.userRepo.save(user);
  }

  async saveUser(user: User) {
    return this.userRepo.save(user);
  }

  deleteUser(id: number) {
    return this.userRepo.delete(id);
  }

  getAllUsers(isBanned = false) {
    return this.userRepo.find({
      where: {
        isBanned,
      },
      relations: {
        followers: true,
        following: true,
        jobApplications: {
          job: true,
        },
        jobsSaved: {
          job: true,
        },
        company: true,
      },
    });
  }

  getUserById(id: number) {
    return this.userRepo.findOne({
      where: {
        id,
      },
      relations: {
        followers: true,
        following: true,
        jobApplications: {
          job: true,
        },
        jobsSaved: {
          job: true,
        },
        company: true,
      },
    });
  }

  getUserByEmail(email: string) {
    return this.userRepo.findOne({
      where: {
        email,
      },
      relations: {
        followers: true,
        following: true,
        jobApplications: {
          job: true,
        },
        jobsSaved: {
          job: true,
        },
        company: true,
      },
    });
  }

  async searchByNameAndEmail(searchTerms: string[]): Promise<User[]> {
    const whereConditions = searchTerms.map((searchTerm) => ({
      where: [
        { firstName: ILike(`%${searchTerm}%`), isBanned: false },
        { lastName: ILike(`%${searchTerm}%`), isBanned: false },
        { email: ILike(`%${searchTerm}%`), isBanned: false },
      ],
    }));

    // Combine where conditions using OR logic
    const combinedConditions = whereConditions.reduce((acc: { [key: string]: any }[], condition) => {
      acc.push(...condition.where);
      return acc;
    }, []);

    return this.userRepo.find({
      where: combinedConditions,
    });
  }

  async updateUser(id: number, user: Partial<User>) {
    await this.userRepo.update(id, user);

    return this.getUserById(id);
  }
}

export default UserRepository;
