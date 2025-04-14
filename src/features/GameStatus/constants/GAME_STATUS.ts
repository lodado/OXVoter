export const GAME_STATUS = {
  WAIT: "WAIT",
  PLAY: "PLAY",
  VOTE: "VOTE",
  DONE: "DONE",
  DESTROY: "DESTROY",
} as const;

export type GAME_STATUS_TYPE = keyof typeof GAME_STATUS;


export type UserInformation = {
  userId: string;
  userName: string;
  isHost: boolean;
  state: string;
};

export interface GameInformation {
  roomId: string;
  roomState: string;
  roomName: string;

  users: UserInformation[];

  optionMap: {
    [key: string]: number;
  };
};