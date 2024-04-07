export class CreateRoomDto {
  hostId: number;
  recipientId?: number;
  roomName?: string;
  oneOnOne?: boolean;
}

export class CreateOneOnOneRoomDto {
  hostId: number;
  recipientId: number;
}
