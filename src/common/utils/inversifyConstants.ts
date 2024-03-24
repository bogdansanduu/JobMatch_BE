export const USER_INV = {
  UserRepository: Symbol.for('UserRepository'),
  UserService: Symbol.for('UserService'),
  UserInteractor: Symbol.for('UserInteractor'),
  UserController: Symbol.for('UserController'),
};

export const AUTH_INV = {
  TokenRepository: Symbol.for('TokenRepository'),
  AuthService: Symbol.for('AuthService'),
  AuthInteractor: Symbol.for('AuthInteractor'),
  AuthController: Symbol.for('AuthController'),
};
