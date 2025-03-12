import { Meta } from "@storybook/react";
import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tab";

export default {
  title: "shared/Tabs",
  component: Tabs,
} as Meta;

const Template = (args: any) => (
  <Tabs defaultValue="tab1" {...args}>
    <TabsList>
      <TabsTrigger value="tab1">탭 1</TabsTrigger>
      <TabsTrigger value="tab2">탭 2</TabsTrigger>
    </TabsList>
    <TabsContent value="tab1">탭 1의 콘텐츠</TabsContent>
    <TabsContent value="tab2">탭 2의 콘텐츠</TabsContent>
  </Tabs>
);

export const Default = Template;
