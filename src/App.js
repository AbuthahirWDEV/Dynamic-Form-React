// App.js
import React, { useState } from "react";
import { ThemeProvider, CssBaseline, Button, Box } from "@mui/material";
import { lightTheme, darkTheme } from "./theme";
import ArrayTextFields from "./ArrayTextFields";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
        <Button variant="contained" onClick={toggleTheme}>
          {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </Button>
      </Box>
      <ArrayTextFields />
    </ThemeProvider>
  );
};

export default App;
