import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Switch, FormControlLabel } from "@mui/material";
import LandingPage from "./containers/LandingPage";
import About from "./containers/About";
import Portfolio from "./containers/Portfolio";
import Contact from "./containers/Contact";
import Home from "./containers/Home";
import "./App.css";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

const App: React.FC = () => {
  // STATE
  const [darkMode, setDarkMode] = useState<boolean>(true);

  // FUNCTIONS
  const handleThemeChange = (): void => {
    setDarkMode(!darkMode);
  };

  // COMPONENT RENDER ---------------------------------------
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <FormControlLabel
        control={<Switch checked={darkMode} onChange={handleThemeChange} />}
        label="Dark Mode"
      />
      <Router>
        <Routes>
          <Route path="/" element={<Home darkMode={darkMode} />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
