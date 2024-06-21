import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import { S3DocumentService } from './s3-document.service';
import { AWS_S3_DOCUMENT_INV } from '../common/utils/inversifyConstants';
import { JwtAuth } from '../common/decorators/jwt-auth.decorator';
import { RequiresRoles } from '../common/decorators/requires-roles.decorator';
import { Roles } from '../common/constants/user.constants';

@injectable()
export class S3DocumentController {
  private readonly S3DocumentService: S3DocumentService;

  constructor(
    @inject(AWS_S3_DOCUMENT_INV.S3DocumentService)
    S3DocumentService: S3DocumentService
  ) {
    this.S3DocumentService = S3DocumentService;
  }

  @JwtAuth()
  @RequiresRoles([Roles.ADMIN, Roles.USER, Roles.COMPANY, Roles.COMPANY_OWNER])
  async generatePreSignedPutUrl(req: Request, res: Response, next: NextFunction) {
    const { fileKey, fileType } = req.body;

    const data = await this.S3DocumentService.generatePreSignedPutUrl(fileKey, fileType);

    return res.status(200).json(data);
  }

  @JwtAuth()
  @RequiresRoles([Roles.ADMIN, Roles.USER, Roles.COMPANY, Roles.COMPANY_OWNER])
  async generatePreSignedGetUrl(req: Request, res: Response, next: NextFunction) {
    const { fileKey } = req.body;

    const data = await this.S3DocumentService.generatePreSignedGetUrl(fileKey);

    return res.status(200).json(data);
  }

  @JwtAuth()
  @RequiresRoles([Roles.ADMIN, Roles.USER, Roles.COMPANY, Roles.COMPANY_OWNER])
  async generateShortPreSignedGetUrl(req: Request, res: Response, next: NextFunction) {
    const { fileKey } = req.body;

    const data = await this.S3DocumentService.generateShortPreSignedGetUrl(fileKey);

    return res.status(200).json(data);
  }

  @JwtAuth()
  @RequiresRoles([Roles.ADMIN, Roles.USER, Roles.COMPANY, Roles.COMPANY_OWNER])
  async deleteDocument(req: Request, res: Response, next: NextFunction) {
    const { fileKey } = req.body;

    const data = await this.S3DocumentService.deleteDocument(fileKey);

    return res.status(200).json(data);
  }
}
