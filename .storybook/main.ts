import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "storybook-dark-mode",
    "storybook-next-intl",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },

  webpackFinal: async (config) => {
    const imageRule = config.module?.rules?.find((rule) => {
      const test = (rule as { test: RegExp }).test;

      if (!test) {
        return false;
      }

      return test.test(".svg");
    }) as { [key: string]: any };

    imageRule.exclude = /\.svg$/;

    config.module?.rules?.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },

  features: {
    experimentalRSC: true,
  },
};

export default config;

//@ts-ignore
declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
