import dayjs from "dayjs";

export function timestampToTimeFormat(timestamp: Date): string {
  const date = dayjs(timestamp);
  const isPM = date.format("A") === "PM";

  return `${date.format("YYYY-MM-DD")} ${date.format("A")} ${date.format("hh:mm:ss")}`;
}
