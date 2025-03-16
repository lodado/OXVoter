"use client";

import { PropsWithChildren, useState } from "react";

import { BannerProps } from "@/features/Banner/ui/Banner";
import { contextBuildHelper } from "@/shared";

export interface FactionOption extends BannerProps {
  color: string;
  isSharedTheirRole: boolean;
}

export const FACTION_OPTIONS = [
  { id: "evil", name: "악역", description: "악역입니다.", color: "#ef4444", isSharedTheirRole: true },
  { id: "good", name: "선역", description: "선의 세력입니다.", color: "#10b981", isSharedTheirRole: false },
];

export const [RawFactionProvider, useFactionContext] = contextBuildHelper<{
  factions: typeof FACTION_OPTIONS;

  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;

  handleAddFaction: (newFaction: FactionOption) => void;
  handleRemoveFaction: (id: string) => void;
  handleEditFaction: (newFaction: FactionOption) => void;
}>({
  id: "VoteProvider",
  option: {
    contextThrowNeed: false,
  },
});

export const FactionProvider = ({ children }: PropsWithChildren) => {
  const [factions, onFactionsChange] = useState<FactionOption[]>(FACTION_OPTIONS);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddFaction = (newFaction: FactionOption) => {
    if (!newFaction.name) return;

    onFactionsChange([...factions, newFaction]);

    setIsEditing(false);
  };

  const handleRemoveFaction = (id: string) => {
    const updatedFactions = factions.filter((faction) => faction.id !== id);
    onFactionsChange(updatedFactions);
  };

  const handleEditFaction = (newFaction: FactionOption) => {
    const updatedFactions = factions.map((faction) => (faction.id === newFaction!.id ? newFaction : faction));
    onFactionsChange(updatedFactions);
  };

  return (
    <RawFactionProvider
      factions={factions}
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      handleAddFaction={handleAddFaction}
      handleRemoveFaction={handleRemoveFaction}
      handleEditFaction={handleEditFaction}
    >
      {children}
    </RawFactionProvider>
  );
};
