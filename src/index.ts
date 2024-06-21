import 'reflect-metadata';

import { app, logger } from './server';
import ioSocket from './common/socket/socket-io';
import { getEnvVar } from './common/utils/envConfig';

const appPort = getEnvVar<number>('PORT', 'number');
const socketPort = getEnvVar<number>('SOCKET_PORT', 'number');

app.listen(appPort, '0.0.0.0', () => {
  logger.info(`Server is running on port ${appPort}`);
});

ioSocket.listen(socketPort);
