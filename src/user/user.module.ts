import { ContainerModule } from 'inversify';

import { UserRepositoryInterface } from './interfaces/user-repository.interface';
import { USER_INV } from '../common/utils/inversifyConstants';
import UserRepository from './user.repository';
import { UserServiceInterface } from './interfaces/user-service.interface';
import UserService from './user.service';
import UserController from './user.controller';

const userContainerModule = new ContainerModule((bind) => {
  bind<UserRepositoryInterface>(USER_INV.UserRepository).to(UserRepository);
  bind<UserServiceInterface>(USER_INV.UserService).to(UserService);
  bind(USER_INV.UserController).to(UserController);
});

export { userContainerModule };
