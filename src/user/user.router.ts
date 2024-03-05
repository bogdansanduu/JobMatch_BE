import express from 'express';
import { Container } from 'inversify';

import { USER_INV } from '../common/utils/appConst';
import { UserRepositoryInterface } from './interfaces/user-repository.interface';
import { UserServiceInterface } from './interfaces/user-service.interface';
import UserRepository from './user.repository';
import UserService from './user.service';
import UserController from './user.controller';

const container = new Container();

container.bind<UserRepositoryInterface>(USER_INV.UserRepository).to(UserRepository);
container.bind<UserServiceInterface>(USER_INV.UserService).to(UserService);
container.bind(USER_INV.UserController).to(UserController);

const router = express.Router();

const controller = container.get<UserController>(USER_INV.UserController);

router.get('/', controller.getAllUsers.bind(controller));
router.get('/:id', controller.getUser.bind(controller));
router.patch('/:id', controller.updateUser.bind(controller));
router.post('/', controller.createUser.bind(controller));
router.delete('/:id', controller.deleteUser.bind(controller));

export default router;
