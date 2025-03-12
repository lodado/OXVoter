"use client";

import React from "react";

import { cn } from "@/shared/utils";

import { useLoadingStore } from "../models/loadingStore";

const LoadingSpinner = () => {
  const { isLoading } = useLoadingStore();

  return (
    isLoading && (
      <div className="fixed bottom-0 left-0 right-0 top-0 bg-black bg-opacity-50 flex items-center justify-center z-loading">
        <svg className={cn(`animate-spin -ml-1 mr-3 h-5 w-5 `)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            className="opacity-75"
            fill="#168FFF"
            stroke="#168FFF"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    )
  );
};

export default LoadingSpinner;
