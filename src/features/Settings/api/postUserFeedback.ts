import { request } from "@/shared";

export const postUserFeedback = async ({
  userName,
  email,
  message,
}: {
  userName: string;
  email: string;
  message: string;
}) => {
  return request({
    url: "/api/user-feedback",
    method: "POST",
    body: JSON.stringify({ userName, email, message }),
  });
};
