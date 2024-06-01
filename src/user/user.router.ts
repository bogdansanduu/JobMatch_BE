import express from 'express';
import { Container, ContainerModule } from 'inversify';

import { USER_INV } from '../common/utils/inversifyConstants';
import { UserRepositoryInterface } from './interfaces/user-repository.interface';
import { UserServiceInterface } from './interfaces/user-service.interface';
import UserRepository from './user.repository';
import UserService from './user.service';
import UserController from './user.controller';
import catchErrors from '../common/utils/catchErrors';

const container = new Container();
const userContainerModule = new ContainerModule((bind) => {
  bind<UserRepositoryInterface>(USER_INV.UserRepository).to(UserRepository);
  bind<UserServiceInterface>(USER_INV.UserService).to(UserService);
  bind(USER_INV.UserController).to(UserController);
});

container.load(userContainerModule);

const userRouter = express.Router();

const controller = container.get<UserController>(USER_INV.UserController);

userRouter.get('/search', catchErrors(controller.searchByNameAndEmail.bind(controller)));
userRouter.get('/all', catchErrors(controller.getAllUsers.bind(controller)));
userRouter.get('/:id', catchErrors(controller.getUserById.bind(controller)));

userRouter.patch('/:id', catchErrors(controller.updateUser.bind(controller)));

userRouter.post('/', catchErrors(controller.createUser.bind(controller)));
userRouter.post('/upload-resume/:id', catchErrors(controller.uploadUserResume.bind(controller)));

userRouter.delete('/:id', catchErrors(controller.deleteUser.bind(controller)));
userRouter.delete('/delete-resume/:id', catchErrors(controller.deleteUserResume.bind(controller)));

userRouter.put('/add-contact', catchErrors(controller.addContact.bind(controller)));
userRouter.put('/remove-contact', catchErrors(controller.removeContact.bind(controller)));

//---RecSys---

userRouter.post('/recSys', catchErrors(controller.addRecSysUsers.bind(controller)));

export { userRouter, userContainerModule };
