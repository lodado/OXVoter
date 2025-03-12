const shared = require("../designVariables");

const { TYPOGRAPHY } = shared;
const { VARIABLES } = shared;

const { COLOR, SPACE } = VARIABLES;

const plugin = require("tailwindcss/plugin");
const animated = require("tailwindcss-animate");
const scrollBarHide = require("tailwind-scrollbar-hide");

const { tailwindLogicalPropertiesPlugins } = require("./logicalProperties");

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["selector", "class"],
  content: ["./src/**/*.{ts,tsx}"],

  /** logical properties 사용 */
  corePlugins: {
    width: false,
    height: false,

    padding: false,
    margin: false,
    border: false,

    inset: false,
    top: false,
    left: false,
    bottom: false,
    right: false,

    float: false,
    clear: false,

    textAlign: false,
  },

  extend: {
    fontFamily: {
      sans: ["Spoqa Han Sans Neo"],
      pretendard: ["Pretendard", "sans"],
    },
  },

  variants: {
    extend: {},
  },

  theme: {
    extend: {
      screens: {
        "very-small": "360px",
        sm: "550px",
      },

      colors: {
        ...COLOR.light,
      },

      keyframes: {
        "infinite-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },

      animation: {
        "infinite-scroll": "infinite-scroll 25s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },

      boxShadow: {},

      spacing: {
        ...SPACE.spacing,
      },

      /* z-index 시멘틱하게 관리 */
      zIndex: {
        tooltip: "15000",
        loading: "10000",
        overlay: "1000",
        toast: "700",
        dropdown: "500",
        dialog: "100",
        portal: "50",
        nav: "30",
        header: "10",
      },
    },
  },
  /** @type {import('tailwindcss/types/config').PluginCreator} */
  plugins: [
    animated,
    scrollBarHide,
    plugin(function ({ addComponents }: any) {
      addComponents({ ...TYPOGRAPHY });
    }),
    function ({ addVariant }: any) {
      addVariant("data-[state=open]", '&[data-state="open"]');
    },
    ...tailwindLogicalPropertiesPlugins,
  ],
};
