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

export const RoleProvider = ({ children }: {} & PropsWithChildren) => {
  const [roles, setRoles] = useState<RoleType[]>([
    {
      id: "citizen",
      name: "시민",
      description: "평범한 시민입니다. 마피아를 찾아내세요.",
      color: "#10b981",
      specialAbility: "없음",
      isEvil: false,
    },
    {
      id: "mafia",
      name: "마피아",
      description: "밤에 시민을 죽일 수 있습니다.",
      color: "#ef4444",
      specialAbility: "밤에 한 명을 죽일 수 있습니다.",
      isEvil: true,
    },
    {
      id: "doctor",
      name: "의사",
      description: "밤에 한 명을 살릴 수 있습니다.",
      color: "#3b82f6",
      specialAbility: "밤에 한 명을 마피아의 공격으로부터 보호할 수 있습니다.",
      isEvil: false,
    },
    {
      id: "police",
      name: "경찰",
      description: "밤에 한 명의 직업을 알 수 있습니다.",
      color: "#f59e0b",
      specialAbility: "밤에 한 명의 직업이 마피아인지 확인할 수 있습니다.",
      isEvil: false,
    },
  ]);

  const [isEditing, setIsEditing] = useState(false);

  const handleAddRole = (newRole: RoleType) => {
    if (!newRole.name) return;

    if (isEditing) {
      const updatedRoles = roles.map((role) => (role.id === newRole!.id ? newRole : role));
      setRoles(updatedRoles);
    } else {
      setRoles([...roles, newRole]);
    }

    setIsEditing(false);
  };

  const handleDeleteRole = (id: string) => {
    const updatedRoles = roles.filter((role) => role.id !== id);
    setRoles(updatedRoles);
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
