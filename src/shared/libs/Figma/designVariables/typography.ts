import convertLeafKeysToCamelCase from './utils/convertLeafKeysToCamelCase'

const RAW_TYPOGRAPHY = {
  // text style
  "shadow-dropdown": {
    "box-shadow": "var(--elevation_shadow_overlay)",
  },
  "shadow-button": {
    "box-shadow": "2px 2px 10px rgba(0, 0, 0, 0), 2px 2px 20px rgba(0, 0, 0, 0.1)",
  },
  "shadow-tab-02": {
    "box-shadow": "0px 0px 4px rgba(0, 0, 0, 0.1), 2px 4px 12px rgba(0, 0, 0, 0.1)",
  },
  "shadow-profile": {
    "box-shadow": "0px 0px 1px rgba(0, 0, 0, 0.3)",
  },
  "shadow-tooltip": {
    "box-shadow": "var(--elevation_shadow_overlay)",
  },
  "shadow-float": {
    "box-shadow": "4px 8px 28px rgba(0, 0, 0, 0.1), 0px 4px 12px rgba(0, 0, 0, 0.2)",
  },
};

const TYPOGRAPHY = convertLeafKeysToCamelCase(RAW_TYPOGRAPHY)

export default TYPOGRAPHY
