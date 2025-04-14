"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

import { useToastStore } from "@/shared/ui/Toast/stores";

const DestroyGameRoom = () => {
  const router = useRouter();
  const { addToast } = useToastStore();

  useEffect(() => {
    addToast({
      title: "게임방이 삭제되었습니다.",
      description: "게임방이 삭제되었습니다. 다시 방을 생성해주세요.",
      type: "error",
    });

    router.push("/");
  }, [router]);

  return null;
};

export default DestroyGameRoom;
