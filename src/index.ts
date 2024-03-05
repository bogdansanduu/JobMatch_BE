import 'reflect-metadata';

import { app, logger } from './server';

const port = process.env.APP_PORT || 3000;

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
