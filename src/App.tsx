import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { alpha, CssBaseline, IconButton } from "@mui/material";
import LandingPage from "./containers/LandingPage";
import About from "./containers/About";
import Portfolio from "./containers/Portfolio";
import Contact from "./containers/Contact";
import Home from "./containers/Home";
import Menu from "./components/Menu";
import "./App.css";
import { AnimatePresence } from "framer-motion";
import { darkTheme, lightTheme } from "./theme";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const ConditionalMenu: React.FC<{
  darkMode: boolean;
  onThemeToggle: () => void;
  onNavigate: (section: string) => void;
}> = ({ darkMode, onThemeToggle, onNavigate }) => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  if (isHome) {
    return (
      <IconButton
        onClick={onThemeToggle}
        sx={{
          position: "fixed",
          top: "30px",
          right: "30px",
          zIndex: 1000,
          color: (theme) => theme.palette.text.primary,
          background: (theme) => alpha(theme.palette.background.paper, 0.1),
          backdropFilter: "blur(10px)",
          "&:hover": {
            background: (theme) => alpha(theme.palette.background.paper, 0.2),
          },
        }}
      >
        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    );
  }

  return (
    <Menu
      darkMode={darkMode}
      onThemeToggle={onThemeToggle}
      onNavigate={onNavigate}
    />
  );
};

const AnimatedRoutes: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home darkMode={darkMode} />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  const handleThemeChange = (): void => {
    setDarkMode(!darkMode);
  };

  const handleNavigation = (section: string): void => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <ConditionalMenu
          darkMode={darkMode}
          onThemeToggle={handleThemeChange}
          onNavigate={handleNavigation}
        />
        <AnimatedRoutes darkMode={darkMode} />
      </Router>
    </ThemeProvider>
  );
};

export default App;
