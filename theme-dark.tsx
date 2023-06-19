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
const dark = createTheme({
  background: altTokens.color.black,
  color: altTokens.color.white,
  // define any key to any string or number value
});

export default dark;
