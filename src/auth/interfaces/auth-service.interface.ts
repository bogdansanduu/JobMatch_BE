import { RegisterValidation } from '../dtos/register.validation';

export interface AuthServiceInterface {
  register(data: RegisterValidation);
  login(email: string, password: string);
  logout(refreshToken: string);
  refreshAccessToken(refreshToken: string);
}
