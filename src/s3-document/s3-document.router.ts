import express from 'express';
import { Container, ContainerModule } from 'inversify';

import { S3DocumentService } from './s3-document.service';
import { S3DocumentController } from './s3-document.controller';
import { AWS_S3_DOCUMENT_INV } from '../common/utils/inversifyConstants';
import catchErrors from '../common/utils/catchErrors';

const s3DocumentRouter = express.Router();

const container = new Container();

const s3DocumentContainerModule = new ContainerModule((bind) => {
  bind(AWS_S3_DOCUMENT_INV.S3DocumentService).to(S3DocumentService);
  bind(AWS_S3_DOCUMENT_INV.S3DocumentController).to(S3DocumentController);
});

container.load(s3DocumentContainerModule);

const controller = container.get<S3DocumentController>(AWS_S3_DOCUMENT_INV.S3DocumentController);

s3DocumentRouter.post('/presigned-put-url', catchErrors(controller.generatePreSignedPutUrl.bind(controller)));
s3DocumentRouter.post('/presigned-get-url', catchErrors(controller.generatePreSignedGetUrl.bind(controller)));
s3DocumentRouter.post(
  '/short-presigned-get-url',
  catchErrors(controller.generateShortPreSignedGetUrl.bind(controller))
);

s3DocumentRouter.delete('/', catchErrors(controller.deleteDocument.bind(controller)));

export { s3DocumentRouter, s3DocumentContainerModule };
