"use client";

import React, { useState } from "react";

import { Banner } from "@/features/Banner";
import { Button, Input, Tab } from "@/shared/ui";

import { useRoleContext } from "../RoleProvider";
import { RoleType } from "../type";

const JobSettingTab = () => {
  const { roles, handleDeleteRole, handleAddRole, isEditing, setIsEditing } = useRoleContext();

  const [roleName, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  const [roleColor, setRoleColor] = useState("#3b82f6"); // 기본 파란색
  const [isEvil, setIsEvil] = useState(false);

  const [editingRole, setEditingRole] = useState<RoleType | null>(null);
  const [specialAbility, setSpecialAbility] = useState("");

  const resetForm = () => {
    setRoleName("");
    setRoleDescription("");
    setRoleColor("#3b82f6");
    setSpecialAbility("");
    setIsEvil(false);
    setEditingRole(null);
  };

  const handleEditRole = (role: RoleType) => {
    setEditingRole(role);
    setRoleName(role.name);
    setRoleDescription(role.description);
    setRoleColor(role.color);
    setSpecialAbility(role.specialAbility);
    setIsEvil(role.isEvil);

    setIsEditing(true);
  };

  return (
    <Tab.Content value="tab3" className="h-max">
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="roleName" className="">
              직업 이름
            </label>

            <Input
              id="roleName"
              value={roleName}
              setValue={(newRoleName) => setRoleName(newRoleName)}
              className="h-10"
              placeholder="마피아, 의사 등"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="roleColor" className="">
              색상
            </label>
            <div className="flex flex-row gap-2 mt-1 justify-evenly">
              <Input
                id="roleColor"
                type="color"
                value={roleColor}
                setValue={(value) => setRoleColor(value)}
                className="w-12 h-10 p-1"
              />
              <Input
                value={roleColor}
                setValue={(value) => setRoleColor(value)}
                className="flex-1 h-10 "
                placeholder="#HEX"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="roleDescription" className="">
            설명
          </label>
          <Input
            id="roleDescription"
            value={roleDescription}
            setValue={(value) => setRoleDescription(value)}
            className=" mt-1"
            placeholder="이 직업에 대한 간단한 설명"
          />
        </div>

        <div>
          <label htmlFor="specialAbility" className="">
            특수 능력
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <label htmlFor="isEvil" className="">
            진영
          </label>
        </div>
      </div>

      <div className="border-t border-border-01 pt-4 pb-10">
        <h4 className="font-medium mb-2">설정된 직업 목록</h4>
        {roles.length === 0 ? (
          <p className="text-slate-400 text-sm">설정된 직업이 없습니다. 직업을 추가해주세요.</p>
        ) : (
          <>
            <div className="space-y-2">
              {roles.map((role) => (
                <div>
                  <Banner
                    isSelected={editingRole?.id === role.id}
                    onEditRole={() => handleEditRole(role)}
                    onDeleteRole={() => handleDeleteRole(role.id)}
                    {...role}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <Button
        className="sticky bottom-4 left-0 right-0 px-4 w-full"
        onClick={() => {
          handleAddRole({
            id: editingRole?.id ?? Math.random().toString(36).substring(7),
            name: roleName,
            description: roleDescription,
            color: roleColor,
            specialAbility,
            isEvil,
          });

          resetForm();
        }}
        disabled={!roleName}
      >
        {!roleName ? "직업 이름을 입력해주세요" : isEditing ? "직업 수정" : "직업 추가"}
      </Button>
    </Tab.Content>
  );
};

export default JobSettingTab;
