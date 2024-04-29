import { Request } from 'express';

import { User } from '../../user/entities/user.entity';
import { Company } from '../../company/entities/company.entity';

export interface RequestWithUserAndCompany extends Request {
  user: User;
  company: Company;
}
