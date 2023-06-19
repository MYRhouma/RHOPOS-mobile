import { createAnimations } from "@tamagui/animations-react-native";

import { createInterFont } from "@tamagui/font-inter";

import { createMedia } from "@tamagui/react-native-media-driver";

import { shorthands } from "@tamagui/shorthands";

import { themes, tokens } from "@tamagui/themes";

import { createTamagui, createTheme, createTokens } from "tamagui";

const altTokens = createTokens({
  color: {
    black: "#111315",
    gray1: "#292b2d",
    gray2: "#686868",
    gray3: "#ababab",
    white: "#fff",
  },
});
const dark = createTheme({
  background: altTokens.color.black,
  color: altTokens.color.white,
  // define any key to any string or number value
});

const light = createTheme({
  background: altTokens.color.white,
  color: altTokens.color.black,
  // define any key to any string or number value
});

const animations = createAnimations({
  bouncy: {
    type: "spring",

    damping: 10,

    mass: 0.9,

    stiffness: 100,
  },

  lazy: {
    type: "spring",

    damping: 20,

    stiffness: 60,
  },

  quick: {
    type: "spring",

    damping: 20,

    mass: 1.2,

    stiffness: 250,
  },
});
const headingFont = createInterFont();

const bodyFont = createInterFont();
const config = createTamagui({
  animations,

  defaultTheme: "dark",

  shouldAddPrefersColorThemes: false,

  themeClassNameOnRoot: false,

  shorthands,

  fonts: {
    heading: headingFont,

    body: bodyFont,
  },

  themes,

  tokens,

  media: createMedia({
    xs: { maxWidth: 660 },

    sm: { maxWidth: 800 },

    md: { maxWidth: 1020 },

    lg: { maxWidth: 1280 },

    xl: { maxWidth: 1420 },

    xxl: { maxWidth: 1600 },

    gtXs: { minWidth: 660 + 1 },

    gtSm: { minWidth: 800 + 1 },

    gtMd: { minWidth: 1020 + 1 },

    gtLg: { minWidth: 1280 + 1 },

    short: { maxHeight: 820 },

    tall: { minHeight: 820 },

    hoverNone: { hover: "none" },

    pointerCoarse: { pointer: "coarse" },
  }),
});
export type AppConfig = typeof config;
declare module "tamagui" {
  // overrides TamaguiCustomConfig so your custom types

  // work everywhere you import `tamagui`

  interface TamaguiCustomConfig extends AppConfig {}
}
export default config;
