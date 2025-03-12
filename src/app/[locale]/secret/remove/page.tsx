"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { CLIENT_DI_REPOSITORY } from "@/DI";
import { handleDeleteUserId } from "@/entities/Auth/api/loginApi";
import { useAuthStore } from "@/entities/Auth/client/models/store/AuthStore";
import { LogoutUseCase } from "@/entities/Auth/core";
import { PAGE_ROUTE } from "@/entities/Router/configs/route";

const RemoveAccountPage: React.FC = () => {
  const { clearSession } = useAuthStore();
  const router = useRouter();

  const handleRemoveAccount = async () => {
    try {
      /**
       * 주의 - 이 명령은 되돌릴 수 없음
       */
      await handleDeleteUserId();

      alert("delete success");
      clearSession();

      router.push(PAGE_ROUTE.MAIN);
    } catch (e) {
      console.log(e, "error");
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl font-bold mb-4">Delete Account</h1>
        <p className="text-lg mb-6 text-center">
          Are you sure you want to delete your account? This action cannot be undone.
        </p>
        <button
          onClick={handleRemoveAccount}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default RemoveAccountPage;
