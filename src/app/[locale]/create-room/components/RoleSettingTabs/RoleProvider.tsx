import { PropsWithChildren, useState } from "react";

import { contextBuildHelper } from "@/shared";

import { RoleType } from "../type";

export const [RawRoleProvider, useRoleContext] = contextBuildHelper<{
  roles: RoleType[];
  isEditing: boolean;

  setIsEditing: (isEditing: boolean) => void;

  handleAddRole: (newRole: RoleType) => void;
  handleDeleteRole: (id: string) => void;
}>({
  id: "RoleProvider",
});

export const RoleProvider = ({
  children,
  roles,

  onRolesChange,
}: {
  roles: RoleType[];
  onRolesChange: (roles: RoleType[]) => void;
} & PropsWithChildren) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleAddRole = (newRole: RoleType) => {
    if (!newRole.name) return;

    if (isEditing) {
      const updatedRoles = roles.map((role) => (role.id === newRole!.id ? newRole : role));
      onRolesChange(updatedRoles);
    } else {
      onRolesChange([...roles, newRole]);
    }

    setIsEditing(false);
  };

  const handleDeleteRole = (id: string) => {
    const updatedRoles = roles.filter((role) => role.id !== id);
    onRolesChange(updatedRoles);
  };

  return (
    <RawRoleProvider
      roles={roles}
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      handleAddRole={handleAddRole}
      handleDeleteRole={handleDeleteRole}
    >
      {children}
    </RawRoleProvider>
  );
};
