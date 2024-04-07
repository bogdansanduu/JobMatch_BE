export const USER_INV = {
  UserRepository: Symbol.for('UserRepository'),
  UserService: Symbol.for('UserService'),
  UserController: Symbol.for('UserController'),
};

export const AUTH_INV = {
  TokenRepository: Symbol.for('TokenRepository'),
  AuthService: Symbol.for('AuthService'),
  AuthController: Symbol.for('AuthController'),
};

export const MESSAGE_INV = {
  MessageRepository: Symbol.for('MessageRepository'),
  MessageService: Symbol.for('MessageService'),
  MessageGateway: Symbol.for('MessageGateway'),
};

export const ROOM_INV = {
  RoomRepository: Symbol.for('RoomRepository'),
  RoomService: Symbol.for('RoomService'),
  RoomGateway: Symbol.for('RoomGateway'),
};
