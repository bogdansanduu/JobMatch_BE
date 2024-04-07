import { inject, injectable } from 'inversify';

import { USER_INV } from '../common/utils/inversifyConstants';
import { DEFUALT_PROFILE_PICTURE } from '../common/constants/user.constants';

import { UserServiceInterface } from './interfaces/user-service.interface';
import UserRepository from './user.repository';
import { NotFoundException } from '../common/exceptions/not-found.exception';

@injectable()
class UserService implements UserServiceInterface {
  private userRepository: UserRepository;

  constructor(@inject(USER_INV.UserRepository) userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async createUser(user: {
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    profilePicture?: string;
  }) {
    user.profilePicture = user.profilePicture || DEFUALT_PROFILE_PICTURE;

    return this.userRepository.createUser(user);
  }

  deleteUser(id: number) {
    return this.userRepository.deleteUser(id);
  }

  getAllUsers() {
    return this.userRepository.getAllUsers();
  }

  async findOneById(id: number) {
    const foundUser = await this.userRepository.getUserById(id);

    if (!foundUser) {
      throw new NotFoundException('User not found');
    }

    return foundUser;
  }

  getUserByEmail(email: string) {
    return this.userRepository.getUserByEmail(email);
  }

  updateUser(id: number, user: any) {
    return this.userRepository.updateUser(id, user);
  }
}

export default UserService;
