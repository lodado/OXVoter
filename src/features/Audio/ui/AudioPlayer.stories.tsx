// AudioPlayer.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";

import AudioPlayer from "./AudioPlayer";

const meta: Meta<typeof AudioPlayer> = {
  title: "features/AudioPlayer",
  component: AudioPlayer,
  tags: ["autodocs"],
  argTypes: {
    word: { control: "text" },
    audioUrl: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof AudioPlayer>;

export const WithoutAudioUrl: Story = {
  args: {
    word: "example",
    audioUrl: null,
  },
};

export const LongWord: Story = {
  args: {
    word: "pneumonoultramicroscopicsilicovolcanoconiosis",
    audioUrl: null,
  },
};
