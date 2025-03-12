"use client";

import { ChevronDown } from "lucide-react";
import React from "react";

import { useSwitchTheme } from "@/shared";
import { Select } from "@/shared/ui";

const ThemeSelector = () => {
  const { isMounted, theme, updateTheme, toggleTheme } = useSwitchTheme();

  return (
    <Select value={theme} defaultValue={theme} onValueChange={updateTheme}>
      <Select.Trigger className="flex justify-between">
        <Select.Value placeholder="system" />
        <Select.Icon className="SelectIcon">
          <ChevronDown />
        </Select.Icon>
      </Select.Trigger>
      <Select.Content side="left" align="end" className="min-w-[10rem]">
        <Select.Group>
          <Select.Label>Select Theme</Select.Label>
          <Select.Item value="system">system</Select.Item>
          <Select.Item value="dark">dark</Select.Item>
          <Select.Item value="light">light</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select>
  );
};

export default ThemeSelector;
