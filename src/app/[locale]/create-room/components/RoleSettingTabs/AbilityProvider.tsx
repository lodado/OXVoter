import { PropsWithChildren, useState } from "react";

import { contextBuildHelper } from "@/shared";

export interface AbilityType {
  id: string;
  name: string;
  description: string;
  votingTarget: "all" | "alive" | "dead" | "others" | "evil" | "good";
  priority: number;
  isPublic: boolean;
}

export const [RawAbilityProvider, useAbilityContext] = contextBuildHelper<{
  abilities: AbilityType[];

  isEditing: boolean;

  setIsEditing: (isEditing: boolean) => void;

  handleAddAbility: (newAbility: AbilityType) => void;
  handleDeleteAbility: (id: string) => void;
}>({
  id: "AbilityProvider",
});

export const AbilityProvider = ({ children }: {} & PropsWithChildren) => {
  const [isEditing, setIsEditing] = useState(false);
  const [abilities, setAbilities] = useState<AbilityType[]>([
    {
      id: "mafia",
      name: "마피아",
      description: "밤에 한 명을 죽일 수 있습니다.",
      votingTarget: "alive",
      priority: 1,
      isPublic: true,
    },
    {
      id: "doctor",
      name: "의사",
      description: "밤에 한 명을 마피아의 공격으로부터 보호할 수 있습니다.",
      votingTarget: "alive",
      priority: 2,
      isPublic: true,
    },
    {
      id: "police",
      name: "경찰",
      description: "밤에 한 명의 직업이 마피아인지 확인할 수 있습니다.",
      votingTarget: "alive",
      priority: 1,
      isPublic: false,
    },
  ]);

  const handleAddAbility = (newAbility: AbilityType) => {
    if (!newAbility.name) return;

    if (isEditing) {
      const updatedAbilities = abilities.map((ability) => (ability.id === newAbility!.id ? newAbility : ability));
      setAbilities(updatedAbilities);
    } else {
      setAbilities([...abilities, newAbility]);
    }

    setIsEditing(false);
  };

  const handleDeleteAbility = (id: string) => {
    const updatedAbilities = abilities.filter((ability) => ability.id !== id);
    setAbilities(updatedAbilities);
  };

  return (
    <RawAbilityProvider
      abilities={abilities}
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      handleAddAbility={handleAddAbility}
      handleDeleteAbility={handleDeleteAbility}
    >
      {children}
    </RawAbilityProvider>
  );
};
