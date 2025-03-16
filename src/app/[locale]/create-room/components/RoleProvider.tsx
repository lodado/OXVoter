import { contextBuildHelper } from "@/shared";

import { RoleType } from "./type";

export const [RoleProvider, useRoleContext] = contextBuildHelper<{
  roles: RoleType[];
  isEditing: boolean;

  setIsEditing: (isEditing: boolean) => void;

  handleAddRole: (newRole: RoleType) => void;
  handleDeleteRole: (id: string) => void;
}>({
  id: "RoleProvider",
});
