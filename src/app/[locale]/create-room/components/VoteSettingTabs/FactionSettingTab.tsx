"use client";

import { RotateCcw } from "lucide-react";
import React, { useEffect, useState } from "react";

import { Banner } from "@/features/Banner";
import { Button, IconButton, Input, Switch, Tab } from "@/shared/ui";

import { FactionOption, useFactionContext } from "./FactionProvider";

const JobSettingTab = () => {
  const {
    factions,
    isEditing,
    setIsEditing,
    handleEditFaction: handleUpdateFaction,
    handleAddFaction,
    handleRemoveFaction,
  } = useFactionContext();

  const [initSelectedOptions, setInitSelectedOptions] = useState<FactionOption | null>(null);

  const [factionId, setFactionId] = useState("-1");
  const [factionName, setFactionName] = useState("");
  const [factionDescription, setFactionDescription] = useState("");
  const [factionColor, setFactionColor] = useState("#3b82f6"); // 기본 파란색
  const [isFactionShareTheirRole, setIsFactionShareTheirRole] = useState(false);

  const resetForm = () => {
    setFactionName("");
    setFactionDescription("");
    setFactionColor("#3b82f6");
    setFactionId("-1");

    setIsEditing(false);
    setIsFactionShareTheirRole(false);
  };

  const handleEditFaction = (faction: FactionOption) => {
    setFactionName(faction.name);
    setFactionDescription(faction.description);
    setFactionColor(faction.color);
    setIsFactionShareTheirRole(faction.isSharedTheirRole);

    setInitSelectedOptions(faction);
    setIsEditing(true);
  };

  return (
    <Tab.Content value="tab1" className="">
      <div className="flex flex-col gap-4 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="roleName" className="">
              진영 이름
            </label>

            <Input
              id="roleName"
              value={factionName}
              setValue={(newFactionName) => setFactionName(newFactionName)}
              className="h-10"
              placeholder="선역 진영, 악역 진영 등"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="roleColor" className="">
              색상
            </label>
            <div className="flex-grow flex flex-row gap-2 mt-1 ">
              <Input
                id="roleColor"
                type="color"
                value={factionColor}
                setValue={(value) => setFactionColor(value)}
                className="w-12 h-10 p-1"
              />
              <Input
                value={factionColor}
                setValue={(value) => setFactionColor(value)}
                className="flex-grow h-10 "
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
            value={factionDescription}
            setValue={(value) => setFactionDescription(value)}
            className=" mt-1"
            placeholder="이 직업에 대한 간단한 설명"
          />
        </div>

        <div className="flex flex-col justify-center gap-4">
          <label htmlFor="IsFactionShareTheirRole">진영 내 직업 공개 여부</label>

          <div className="pl-1">
            <Switch
              id="IsFactionShareTheirRole"
              checked={isFactionShareTheirRole}
              onCheckedChange={setIsFactionShareTheirRole}
            />
          </div>
        </div>
      </div>

      <div className="border-t border-border-01 pt-4 h-max pb-10">
        <h4 className="font-medium mb-2">설정된 직업 목록</h4>
        {factions.length === 0 ? (
          <p className="text-slate-400  text-sm">설정된 진영이 없습니다. 진영을 추가해주세요.</p>
        ) : (
          <>
            <div className="space-y-2 p-2 mb-10">
              {factions.map((faction) => (
                <div>
                  <Banner
                    isSelected={initSelectedOptions?.id === faction.id}
                    onEdit={() => {
                      handleEditFaction(faction);
                    }}
                    onDelete={() => {
                      handleRemoveFaction(faction.id);
                    }}
                    {...faction}
                  />
                </div>
              ))}
            </div>
          </>
        )}

        <div className="flex flex-row sticky bottom-4 left-0 right-0 px-4 w-full gap-2">
          <Button
            className="flex-grow"
            onClick={() => {
              if (isEditing)
                handleUpdateFaction({
                  id: factionId,
                  name: factionName,
                  description: factionDescription,
                  color: factionColor,
                  isSharedTheirRole: isFactionShareTheirRole,
                });
              else {
                handleAddFaction({
                  id: factionId,
                  name: factionName,
                  description: factionDescription,
                  color: factionColor,
                  isSharedTheirRole: isFactionShareTheirRole,
                });
              }

              resetForm();
            }}
            disabled={!factionName}
          >
            {!factionName ? "진영 이름을 입력해주세요" : isEditing ? "진영 수정" : "진영 추가"}
          </Button>

          <IconButton
            className="w-10"
            disabled={!isEditing}
            onClick={() => {
              resetForm();
            }}
          >
            <RotateCcw />
          </IconButton>
        </div>
      </div>
    </Tab.Content>
  );
};

export default JobSettingTab;
