"use client";

import { contextBuildHelper } from "@/shared/utils/contextBuildHelper";

export const [DropdownProvider, useDropdownContext] = contextBuildHelper<{
  isVisible: boolean;
  setVisible: (value: boolean) => void;
}>({
  id: "dropdown",
});
