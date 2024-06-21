import express from 'express';

import { S3DocumentController } from './s3-document.controller';
import { AWS_S3_DOCUMENT_INV } from '../common/utils/inversifyConstants';
import catchErrors from '../common/utils/catchErrors';
import { centralizedContainer } from '../common/centralizedContainer/centralizedContainer';

const s3DocumentRouter = express.Router();

const controller = centralizedContainer.get<S3DocumentController>(AWS_S3_DOCUMENT_INV.S3DocumentController);

s3DocumentRouter.post('/presigned-put-url', catchErrors(controller.generatePreSignedPutUrl.bind(controller)));
s3DocumentRouter.post('/presigned-get-url', catchErrors(controller.generatePreSignedGetUrl.bind(controller)));
s3DocumentRouter.post(
  '/short-presigned-get-url',
  catchErrors(controller.generateShortPreSignedGetUrl.bind(controller))
);

s3DocumentRouter.delete('/', catchErrors(controller.deleteDocument.bind(controller)));

export { s3DocumentRouter };
