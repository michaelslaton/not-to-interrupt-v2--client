import type { ChatEntryType } from "./ChatEntryType.type";
import type { UserType } from "./UserType.type";

type RoomType = {
  roomId: string;
  name: string;
  hostId: string;
  users: UserType[];
  chat: ChatEntryType[];
};

export type { RoomType };