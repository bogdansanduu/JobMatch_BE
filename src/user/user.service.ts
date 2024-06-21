import { inject, injectable } from 'inversify';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { DeepPartial } from 'typeorm';

import {
  AWS_SES_INV,
  COMMENT_INV,
  JOB_APPLICATION_INV,
  LIKE_INV,
  POST_INV,
  ROOM_INV,
  USER_INV,
} from '../common/utils/inversifyConstants';
import { DEFUALT_PROFILE_PICTURE, Roles } from '../common/constants/user.constants';

import { UserServiceInterface } from './interfaces/user-service.interface';
import UserRepository from './user.repository';
import { NotFoundException } from '../common/exceptions/not-found.exception';
import { InvalidException } from '../common/exceptions/invalid.exception';
import { User } from './entities/user.entity';
import { ResumeFile } from '../common/types/resume-file.type';
import { UploadResumeValidation } from './dtos/upload-resume.validation';
import { PostService } from '../posts/post.service';
import { centralizedContainer } from '../common/centralizedContainer/centralizedContainer';
import { LikeService } from '../like/like.service';
import { JobApplicationService } from '../job-application/job-application.service';
import { CommentService } from '../comment/comment.service';
import { RoomService } from '../chat/room/room.service';
import { SESService } from '../email/ses.service';

@injectable()
class UserService implements UserServiceInterface {
  private readonly userRepository: UserRepository;

  constructor(@inject(USER_INV.UserRepository) userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async createUser(user: DeepPartial<User>) {
    user.profilePicture = user.profilePicture || DEFUALT_PROFILE_PICTURE;

    return this.userRepository.createUser(user);
  }

  deleteUser(id: number) {
    return this.userRepository.deleteUser(id);
  }

  getAllUsers(isBanned = false) {
    return this.userRepository.getAllUsers(isBanned);
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

  updateUser(id: number, user: Partial<User>) {
    return this.userRepository.updateUser(id, user);
  }

  async uploadUserResume(userId: number, resumeFileDto: UploadResumeValidation) {
    const user = await this.getUserById(userId);

    const resumeFile: ResumeFile = {
      id: crypto.randomUUID(),
      fileName: resumeFileDto.fileName,
      fileKey: resumeFileDto.fileKey,
      uploadedAt: new Date(),
    };

    await this.userRepository.updateUser(user.id, { resumeFile });

    return this.getUserById(user.id);
  }

  async deleteUserResume(userId: number) {
    const user = await this.getUserById(userId);

    await this.userRepository.updateUser(user.id, { resumeFile: null });

    return this.getUserById(user.id);
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

    return this.userRepository.getUserById(contactId);
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

    return this.userRepository.getUserById(contactId);
  }

  async banUser(userId: number, banned: boolean) {
    const user = await this.userRepository.getUserById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const notAllowed = false;

    if (banned && notAllowed) {
      const postService = centralizedContainer.get<PostService>(POST_INV.PostService);
      const commentService = centralizedContainer.get<CommentService>(COMMENT_INV.CommentService);
      const likeService = centralizedContainer.get<LikeService>(LIKE_INV.LikeService);
      const jobApplicationService = centralizedContainer.get<JobApplicationService>(
        JOB_APPLICATION_INV.JobApplicationService
      );
      const roomService = centralizedContainer.get<RoomService>(ROOM_INV.RoomService);

      await postService.removePostsByUserId(user.id);
      await commentService.removeCommentsByUserId(user.id);
      await likeService.removeLikesByUserId(user.id);
      await jobApplicationService.removeApplicationsByUserId(user.id);
      await roomService.removeRoomsByUserId(user.id);
    }

    const emailService = centralizedContainer.get<SESService>(AWS_SES_INV.SESService);

    await emailService.sendAccountPermissionChangedEmail(user.id, banned, true, false);

    return this.userRepository.updateUser(userId, { isBanned: banned });
  }

  //---RecSys---

  async addRecSysUsers() {
    const users: User[] = [];
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const password = 'recsys';
    const hashedPassword = await bcrypt.hash(password, salt);

    for (let i = 1; i <= 6; i++) {
      const firstName = `RecSys${i}`;
      const lastName = `RecSys${i}`;
      const resume = 'RecSys';
      const email = `recsys${i}@recsys.com`;
      const country = 'RecSys';
      const city = 'RecSys';
      const state = 'RecSys';

      const user = await this.createUser({
        firstName,
        lastName,
        email,
        resume,
        password: hashedPassword,
        country,
        city,
        state,
      });

      await this.updateUser(user.id, { role: Roles.COMPANY_OWNER });

      console.log(`Created RecSys user ${i}`);
      users.push(user);
    }

    return users;
  }
}

export default UserService;
