export const USER_INV = {
  UserRepository: Symbol.for('UserRepository'),
  UserService: Symbol.for('UserService'),
  UserInteractor: Symbol.for('UserInteractor'),
  UserController: Symbol.for('UserController'),
};

export const AUTH_INV = {
  AuthService: Symbol.for('AuthService'),
  AuthInteractor: Symbol.for('AuthInteractor'),
  AuthController: Symbol.for('AuthController'),
};
