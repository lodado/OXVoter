"use client";

import { set } from "lodash-es";
import { ChevronDown, RotateCcw } from "lucide-react";
import React, { useReducer, useState } from "react";

import { Banner } from "@/features/Banner";
import { Button, IconButton, Input, Select, Switch, Tab } from "@/shared/ui";
import SpinControl from "@/shared/ui/Input/SpinControl";

import { AbilityType, useAbilityContext } from "./AbilityProvider";

const spinControlReducer = (state: { spinControlValue: number }, action: { type: string; payload?: number }) => {
  switch (action.type) {
    case "increment":
      return { spinControlValue: state.spinControlValue + 1 };
    case "decrement":
      return { spinControlValue: state.spinControlValue - 1 };
    case "reset":
      return { spinControlValue: 1 };
    case "update":
      return { spinControlValue: action.payload! };
    default:
      return state;
  }
};

const AbilitySettingTab = () => {
  const { abilities, handleDeleteAbility, handleAddAbility, isEditing, setIsEditing } = useAbilityContext();

  const [selectedAbility, setSelectedAbility] = useState<AbilityType | null>(null);

  const [abilityName, setAbilityName] = useState("");
  const [abilityDescription, setAbilityDescription] = useState("");
  const [isAbilityPublic, setIsAbilityPublic] = useState(false);

  const [priority, dispatch] = useReducer(spinControlReducer, { spinControlValue: 1 });

  const [votingTarget, setVotingTarget] = useState<"all" | "alive" | "dead" | "others" | "evil" | "good">("alive");

  const resetForm = () => {
    setAbilityName("");
    setAbilityDescription("");
    setSelectedAbility(null);

    setVotingTarget("alive");
    dispatch({ type: "reset" });

    setIsEditing(false);
    setIsAbilityPublic(false);
  };

  const handleEditAbility = (ability: AbilityType) => {
    setAbilityName(ability.name);
    setAbilityDescription(ability.description);
    setSelectedAbility(ability);
    dispatch({ type: "update", payload: ability.priority });

    setIsEditing(true);
    setIsAbilityPublic(ability.isPublic);
  };

  return (
    <Tab.Content value="tab1" className="flex flex-col gap-4 h-max">
      <div className="flex flex-col gap-4 py-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="roleName" className="">
              능력 이름
            </label>

            <Input
              id="voteName"
              value={abilityName}
              setValue={(newVoteName) => setAbilityName(newVoteName)}
              className="h-10"
              placeholder="투시, 치료 등"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="roleDescription" className="">
            설명
          </label>
          <Input
            id="abilityDescription"
            value={abilityDescription}
            setValue={(value) => setAbilityDescription(value)}
            className=" mt-1"
            placeholder="능력을 설명해주세요"
          />
        </div>

        <div className="flex flex-col gap-4">
          <label htmlFor="isPublic">결과 공유 여부</label>
          <Switch id="isPublic" checked={isAbilityPublic} onCheckedChange={setIsAbilityPublic} />
        </div>

        <div className="flex flex-col gap-4">
          <label htmlFor="specialAbility" className="">
            특수능력 타겟
          </label>

          <div className="grid grid-cols-2 gap-2">
            <Select defaultValue="all">
              <Select.Trigger className="min-w-[10rem]">
                <Select.Value placeholder="" />
                <Select.Icon className="SelectIcon">
                  <ChevronDown />
                </Select.Icon>
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="all">모두</Select.Item>
                <Select.Item value="alive">살아있는 사람</Select.Item>
                <Select.Item value="dead">죽은 사람</Select.Item>
                <Select.Item value="ours">같은 진영</Select.Item>
                <Select.Item value="myself">자기 자신</Select.Item>
                <Select.Item value="others">다른 진영</Select.Item>
              </Select.Content>
            </Select>

            <div className="flex flex-row gap-2 items-center">
              우선 순위
              <SpinControl
                svgClassName="text-text-01"
                className="text-text-01"
                value={priority.spinControlValue}
                increment={() => dispatch({ type: "increment" })}
                decrement={() => dispatch({ type: "decrement" })}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border-01 pt-4 pb-10">
        <h4 className="font-medium mb-2">설정된 능력 목록</h4>
        {abilities.length === 0 ? (
          <p className="text-slate-400 text-sm">설정된 특수능력이 없습니다. 특수 능력을 추가해주세요.</p>
        ) : (
          <>
            <div className="space-y-2">
              {abilities.map((role) => (
                <div>
                  <Banner
                    isSelected={selectedAbility?.id === role.id}
                    onEdit={() => handleEditAbility(role)}
                    onDelete={() => handleDeleteAbility(role.id)}
                    color="grey"
                    {...role}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="flex flex-row sticky bottom-4 left-0 right-0 px-4 w-full gap-2">
        <Button
          className="flex-grow"
          onClick={() => {
            handleAddAbility({
              name: abilityName,
              description: abilityDescription,
              votingTarget,
              id: selectedAbility?.id ?? Math.random().toString(36).substring(7),
              priority: priority.spinControlValue,
              isPublic: isAbilityPublic,
            });

            resetForm();
          }}
          disabled={!abilityName}
        >
          {!abilityName ? "직업 이름을 입력해주세요" : isEditing ? "직업 수정" : "직업 추가"}
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
    </Tab.Content>
  );
};

export default AbilitySettingTab;
