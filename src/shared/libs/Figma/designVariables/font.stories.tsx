// /c:/Users/chungheonlee/Desktop/programming/next-lotion/src/shared/libs/Figma/designVariables/font.stories.tsx

import "./font.css";

import { Meta } from "@storybook/react";
import React from "react";

const FontStories = ({ font, children }: { font: string; children: string }) => {
  return (
    <>
      <p className={font}>{children}</p>
    </>
  );
};

export default {
  title: "Design Variables/Font",
  component: FontStories,
} as Meta;

const Template = () => {
  const words = [
    "The quick brown fox jumps over the lazy dog",
    "키스의 고유조건은 입술끼리 만나야 하고 아주아주 부드러워야 한다",
  ];

  const classNames = [
    "heading-01",
    "heading-02",
    "heading-03",
    "heading-04",
    "heading-05",
    "heading-06",
    "body-01",
    "body-02",
    "body-03",
    "body-04",
  ];

  return (
    <>
      {classNames.map((className, index) => {
        return (
          <div className="flex flex-col gap-[10px]">
            <div className="w-full h-[2px] bg-[#eee]"></div>
            <div>{className}</div>
            {words.map((word, index) => {
              return <FontStories font={className} key={className + word} children={word} />;
            })}
            <div className="w-full h-[2px] bg-[#eee]"></div>
          </div>
        );
      })}
    </>
  );
};

export const Default = Template.bind({});
