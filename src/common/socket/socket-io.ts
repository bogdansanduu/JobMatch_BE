import * as http from 'http';
import { Server } from 'socket.io';

import { app } from '../../server';
import { dataSource } from '../../database/dataSource';
import { User } from '../../user/entities/user.entity';

const ioSocket = new Server(http.createServer(app));
const userRepository = dataSource.getRepository<User>(User);

ioSocket.use(async (socket, next) => {
  const userId = parseInt(socket.handshake.query.userId as string);

  if (!userId) {
    next();
    return;
  }

  const user = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!user) {
    next();
    return;
  }

  user.socketId = socket.id;
  await userRepository.save(user);

  next();
});

ioSocket.on('connection', (socket) => {
  console.log(`User connected with socket id ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`User disconnected with socket id ${socket.id}`);
  });
});

export default ioSocket;
