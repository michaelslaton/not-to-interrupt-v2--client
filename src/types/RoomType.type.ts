import type { ChatEntryType } from "./ChatEntryType.type";
import type { UserType } from "./UserType.type";

type RoomListingType = {
  id: string;
  name: string;
  users: string[];
};

type RoomType = {
  id: string;
  name: string;
  users: UserType[];
  chat: ChatEntryType[];
};

export type { RoomType, RoomListingType };