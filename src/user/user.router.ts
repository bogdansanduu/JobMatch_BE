import express from 'express';

import { USER_INV } from '../common/utils/inversifyConstants';
import UserController from './user.controller';
import catchErrors from '../common/utils/catchErrors';
import { centralizedContainer } from '../common/centralizedContainer/centralizedContainer';
const userRouter = express.Router();

const controller = centralizedContainer.get<UserController>(USER_INV.UserController);

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
userRouter.put('/ban/:id', catchErrors(controller.banUser.bind(controller)));

//---RecSys---

userRouter.post('/recSys', catchErrors(controller.addRecSysUsers.bind(controller)));

export { userRouter };
