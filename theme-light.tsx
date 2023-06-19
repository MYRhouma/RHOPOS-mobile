import { createTheme, createTokens } from "tamagui";

const altTokens = createTokens({
  color: {
    black: "#111315",
    gray1: "#292b2d",
    gray2: "#686868",
    gray3: "#ababab",
    white: "#fff",
  },
});

const light = createTheme({
  background: altTokens.color.white,
  color: altTokens.color.black,
  // define any key to any string or number value
});

export default light;
