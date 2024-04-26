import { inject, injectable } from 'inversify';

import { USER_INV } from '../common/utils/inversifyConstants';
import { DEFUALT_PROFILE_PICTURE } from '../common/constants/user.constants';

import { UserServiceInterface } from './interfaces/user-service.interface';
import UserRepository from './user.repository';
import { NotFoundException } from '../common/exceptions/not-found.exception';
import { InvalidException } from '../common/exceptions/invalid.exception';

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

  async getUserById(id: number) {
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

  async searchByNameAndEmail(searchTerms: string[]) {
    const users = await this.userRepository.searchByNameAndEmail(searchTerms);

    return users.slice(0, 5);
  }

  async addContact({ userId, contactId }: { userId: number; contactId: number }) {
    const user1 = await this.userRepository.getUserById(userId);
    const user2 = await this.userRepository.getUserById(contactId);

    if (!user1 || !user2) {
      throw new NotFoundException('One or both users not found');
    }

    if (user1.id === user2.id) {
      throw new InvalidException();
    }

    user1.following.push(user2);
    user2.followers.push(user1);

    await this.userRepository.saveUser(user1);
    await this.userRepository.saveUser(user2);

    return this.userRepository.getUserById(userId);
  }

  async removeContact({ userId, contactId }: { userId: number; contactId: number }) {
    const user1 = await this.userRepository.getUserById(userId);
    const user2 = await this.userRepository.getUserById(contactId);

    if (!user1 || !user2) {
      throw new NotFoundException('One or both users not found');
    }

    if (user1.id === user2.id) {
      throw new InvalidException();
    }

    user1.following = user1.following.filter((user) => user.id !== contactId);
    user2.followers = user2.followers.filter((user) => user.id !== userId);

    await this.userRepository.saveUser(user1);
    await this.userRepository.saveUser(user2);

    return this.userRepository.getUserById(userId);
  }
}

export default UserService;
