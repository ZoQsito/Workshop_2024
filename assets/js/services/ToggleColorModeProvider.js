import React, { createContext, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "../theme";

export const ToggleColorModeContext = createContext({
  mode: "light",
  toggleColorMode: () => {},
});

function ToggleColorModeProvider({ children }) {
  const storedMode = localStorage.getItem("colorMode");
  const [mode, setMode] = React.useState(storedMode || "light");

  const colorMode = React.useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        const newMode = mode === "light" ? "dark" : "light";
        setMode(newMode);
        localStorage.setItem("colorMode", newMode);
      },
    }),
    [mode]
  );

  const currentMode = colorMode.mode;
  const theme = createTheme(currentMode === "light");

  return (
    <ToggleColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ToggleColorModeContext.Provider>
  );
}

export default ToggleColorModeProvider;
