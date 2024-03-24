export interface AuthServiceInterface {
  register(firstName: string, lastName: string, email: string, password: string);
  login(email: string, password: string);
  logout(refreshToken: string);
  refreshAccessToken(refreshToken: string);
}
