"use client";

import { useTranslations } from "next-intl";

import { useToastStore } from "../stores";

const useErrorToastMapper = () => {
  const i18n = useTranslations();
  const { addToast } = useToastStore();

  const handleErrorToastByCode =
    (errorToastMapping: {
      [key in string]: {
        title: string;
        description: string;
      };
    }) =>
    (error: unknown) => {
      // 에러 객체에서 코드 추출
      const code = (error as { code: keyof typeof errorToastMapping }).code;
      const errorData = errorToastMapping[code];

      // 매핑된 에러 메시지가 있으면 해당 메시지로 toast 생성, 없으면 기본 메시지 사용
      if (errorData) {
        addToast({
          title: i18n(errorData.title),
          description: i18n(errorData.description),
          type: "error",
        });
      } else {
        addToast({
          title: i18n("joinRoom.generalTitle"),
          description: i18n("joinRoom.generalDescription"),
          type: "error",
        });
      }
    };

  return handleErrorToastByCode;
};

export default useErrorToastMapper;
