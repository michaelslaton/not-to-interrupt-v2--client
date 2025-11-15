import type { PublicUserType } from "./UserType.type";

type ChatEntryType = {
  user: PublicUserType;
  message: string;
  timeStamp: Date;
}

export type { ChatEntryType };