type UserType = {
  id: string;
  name: string;
  socketId: string | undefined;
};

type NewUserType = {
  name: string;
  socketId: string | undefined;
};

export type { UserType, NewUserType };