export enum SocketEventsClient {
  GET_ALL_ROOMS_FOR_USER = 'getAllRoomsForUser',
  CREATE_ONE_ON_ONE_ROOM = 'createOneOnOneRoom',
  JOIN_ROOM = 'joinRoom',
  GET_ALL_MESSAGES_FOR_ROOM = 'getAllMessagesRoom',
  SEND_MESSAGE_ROOM = 'sendMessageRoom',
}

export enum SocketEventsServer {
  ALL_ROOMS_FOR_USER = 'allRoomsForUser',
  ALL_MESSAGES_FOR_ROOM = 'allMessagesRoom',
  MESSAGE_ROOM = 'messageRoom',
  CREATED_ONE_ON_ONE_ROOM = 'createdOneOnOneRoom',
  JOINED_ROOM = 'joinedRoom',
}
