import { common } from "@mui/material/colors";
import { alpha } from "@mui/material/styles";
import { error, indigo, info, neutral, success, warning } from "./colors";

export function createPalette(lightMode) {
  const mode = lightMode ? "light" : "dark";

  return {
    action: {
      active: neutral[500],
      disabled: alpha(neutral[900], 0.38),
      disabledBackground: alpha(neutral[900], 0.12),
      focus: alpha(neutral[900], 0.16),
      hover: alpha(neutral[900], 0.04),
      selected: alpha(neutral[900], 0.12),
    },
    background: {
      default: lightMode ? common.white : "#121212",
      paper: lightMode ? common.white : "#1E1E1E",
    },
    divider: "#F2F4F7",
    error,
    info,
    mode,
    neutral,
    primary: indigo,
    success,
    text: {
      primary: lightMode ? neutral[900] : "#FFFFFF",
      secondary: lightMode ? neutral[500] : "#B0B0B0",
      disabled: alpha(lightMode ? neutral[900] : "#FFFFFF", 0.38),
    },
    warning,
  };
}
