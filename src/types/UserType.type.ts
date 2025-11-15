import type { UserControllerType } from "./ControllerType.type";

type UserType = {
  id: string;
  name: string;
  socketId: string | undefined;
  controller: UserControllerType;
  color: string;
};

type NewUserType = {
  name: string;
  socketId: string | undefined;
};

export type { UserType, NewUserType };
export type PublicUserType = Omit<UserType, 'socketId'>;