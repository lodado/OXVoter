"use client";

import { set } from "lodash-es";
import { useState } from "react";

import { Banner } from "@/features/Banner";
import { Button, Input, ScrollArea, Switch, TextArea } from "@/shared/ui";
import { AlertDialog } from "@/shared/ui/Dialog";

import { RoleProvider } from "./RoleProvider";
import RoleSettingTabs from "./RoleSettingTabs";
import { RoleSettingsDialogProps, RoleType } from "./type";

export default function RoleSettingsDialog({ roles, onRolesChange }: RoleSettingsDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
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

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    setIsEditing(false);
  };

  return (
    <RoleProvider
      roles={roles}
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      handleAddRole={handleAddRole}
      handleDeleteRole={handleDeleteRole}
    >
      <Button
        type="button"
        className="h-8"
        variant="primaryLine"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        직업 설정
      </Button>

      <AlertDialog className="" isVisible={isOpen} onChangeVisible={handleOpenChange}>
        <AlertDialog.Header className="">게임 직업 설정</AlertDialog.Header>
        <AlertDialog.Body className="relative max-h-[600px] scrollbar-hide h-[calc(80*var(--vh))] gap-3 overflow-x-hidden overflow-y-auto">
          <AlertDialog.Description className="sticky h-max text-text-02">
            게임에서 사용할 직업과 특수 능력을 설정하세요.
          </AlertDialog.Description>

          <RoleSettingTabs />
        </AlertDialog.Body>
      </AlertDialog>
    </RoleProvider>
  );
}
