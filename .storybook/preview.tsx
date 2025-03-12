import "../src/app/globals.scss";
import "../src/shared/libs/Figma/index.scss";

import type { Preview } from "@storybook/react";
import React, { useEffect } from "react";
import { useDarkMode } from "storybook-dark-mode";

import ClientProvider from "../src/app/provider/ClientProvider";
import ThemeScript from "../src/shared/libs/CustomTheme/ui/ThemeScript";
import nextIntl from "./next-intl";

const preview: Preview = {
  initialGlobals: {
    locale: "en",
    locales: {
      en: "English",
      ko: "Korean",
      ar: "Arabic",
    },
  },

  globalTypes: {},

  parameters: {
    nextIntl,

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

const session = {
  user: {
    id: "test",
    name: "test",
    email: "test",
    image: "https://picsum.photos/200",
  },
};

export const decorators = [
  (Story: any) => {
    const isDarkMode = useDarkMode();
    useEffect(() => {
      document.documentElement.setAttribute("data-theme", isDarkMode ? "dark" : "light");
      document.body.style.backgroundColor = isDarkMode ? "#000" : "#fff";
    }, [isDarkMode]);

    return <Story />;
  },

  (Story) => {
    return (
      <ClientProvider session={session}>
        <Story />
        <ThemeScript nonce="1" />
      </ClientProvider>
    );
  },
];

export default preview;
