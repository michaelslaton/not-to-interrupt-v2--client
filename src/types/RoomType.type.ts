import type { ChatEntryType } from "./ChatEntryType.type";
import type { UserType } from "./UserType.type";

type RoomType = {
  id: string;
  name: string;
  hostId: string;
  users: UserType[];
  chat: ChatEntryType[];
};

export type { RoomType };