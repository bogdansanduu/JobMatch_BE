import 'reflect-metadata';

import { app, logger } from './server';
import ioSocket from './common/socket/socket-io';

const appPort = parseInt(process.env.APP_PORT || '3000');
const socketPort = parseInt(process.env.SOCKET_PORT || '3001');

app.listen(appPort, () => {
  logger.info(`Server is running on port ${appPort}`);
});

ioSocket.listen(socketPort);
