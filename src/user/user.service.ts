import { inject, injectable } from 'inversify';

import { USER_INV } from '../common/utils/inversifyConstants';

import { UserServiceInterface } from './interfaces/user-service.interface';
import UserRepository from './user.repository';

@injectable()
class UserService implements UserServiceInterface {
  private readonly userRepository: UserRepository;

  constructor(@inject(USER_INV.UserRepository) userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async createUser(user: { firstName: string; lastName: string; password: string; email: string }) {
    return this.userRepository.createUser(user);
  }

  deleteUser(id: number): any {
    return this.userRepository.deleteUser(id);
  }

  getAllUsers(): any {
    return this.userRepository.getAllUsers();
  }

  getUser(id: number): any {
    return this.userRepository.getUser(id);
  }

  getUserByEmail(email: string): any {
    return this.userRepository.getUserByEmail(email);
  }

  updateUser(id: number, user: any): any {
    return this.userRepository.updateUser(id, user);
  }
}

export default UserService;
