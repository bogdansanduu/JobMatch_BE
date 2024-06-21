import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';

import { RecommendationService } from './recommendation.service';
import { RECOMMENDATION_INV } from '../common/utils/inversifyConstants';
import { validateBody } from '../common/utils/validateBody';
import { GetRecommendationsValidation } from './dtos/get-recommendations.validation';
import { plainToInstance } from 'class-transformer';
import { JobResponseDto } from '../job/dtos/job-response.dto';
import { JwtAuth } from '../common/decorators/jwt-auth.decorator';
import { RequiresRoles } from '../common/decorators/requires-roles.decorator';
import { Roles } from '../common/constants/user.constants';

@injectable()
export class RecommendationController {
  private readonly recommendationService: RecommendationService;

  constructor(
    @inject(RECOMMENDATION_INV.RecommendationService)
    recommendationService: RecommendationService
  ) {
    this.recommendationService = recommendationService;
  }

  @JwtAuth()
  @RequiresRoles([Roles.ADMIN])
  async populateRecommendations(req: Request, res: Response, next: NextFunction) {
    await this.recommendationService.populateRecommendations();
    return res.status(StatusCodes.CREATED).json({ message: 'Database populated for recommendations' });
  }

  @JwtAuth()
  @RequiresRoles([Roles.ADMIN, Roles.USER, Roles.COMPANY, Roles.COMPANY_OWNER])
  async getRecommendations(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    await validateBody(body, GetRecommendationsValidation);

    const data = await this.recommendationService.getRecommendations(body);

    const responseData = plainToInstance(JobResponseDto, data, { excludeExtraneousValues: true });

    return res.status(StatusCodes.OK).json(responseData);
  }
}
