export const ROOT_URL: string = "";

export const USER_ID_SPLITTER: string = `${(process.env.KAKAO_ID ?? "mockingforTest")!.substring(0, 7)}@`;

export const IS_DEPLOYMENT = !!process.env.VERCEL_URL;

export const NAVIGATION_HEIGHT = 64;

export const ROOM_OPTIONS = [
  { id: "yes", text: "yes" },
  { id: "no", text: "no" },
  { id: "abstain", text: "abstention" },
];
