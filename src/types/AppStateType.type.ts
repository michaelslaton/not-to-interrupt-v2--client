import type { RoomType } from "./RoomType.type";
import type { UserType } from "./UserType.type";

type AppStateType = {
  user: UserType | null;
  roomData: RoomType | null;
  error: string | null;
};

export type { AppStateType };