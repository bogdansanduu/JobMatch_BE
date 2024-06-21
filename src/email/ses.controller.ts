import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';

import { SESService } from './ses.service';
import { AWS_SES_INV } from '../common/utils/inversifyConstants';
import { StatusCodes } from 'http-status-codes';
import { JwtAuth } from '../common/decorators/jwt-auth.decorator';
import { RequiresRoles } from '../common/decorators/requires-roles.decorator';
import { Roles } from '../common/constants/user.constants';

@injectable()
export class SESController {
  private readonly sesService: SESService;

  constructor(@inject(AWS_SES_INV.SESService) sesService: SESService) {
    this.sesService = sesService;
  }

  @JwtAuth()
  @RequiresRoles([Roles.COMPANY])
  async sendApplicationEvaluatedEmail(req: Request, res: Response, next: NextFunction) {
    const jobApplicationId = Number(req.params.jobApplicationId);

    //validate logic

    const data = await this.sesService.sendApplicationEvaluatedEmail(jobApplicationId);

    return res.status(StatusCodes.OK).json(data);
  }
}
