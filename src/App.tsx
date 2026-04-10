import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Box } from "@mui/material";
import Home from "./containers/Home";
import Menu from "./components/Menu";
import "./App.css";
import { AnimatePresence } from "framer-motion";
import { darkTheme } from "./theme";
import { SnackbarProvider } from "notistack";
import { useLocation } from "react-router-dom";

const LandingPage = lazy(() => import("./containers/LandingPage"));
const About = lazy(() => import("./containers/About"));
const Portfolio = lazy(() => import("./containers/Portfolio"));
const Contact = lazy(() => import("./containers/Contact"));

const PageSkeleton: React.FC = () => (
  <Box sx={{ height: "100vh", bgcolor: "background.default" }} />
);

const AnimatedRoutes: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const location = useLocation();
  return (
    <Suspense fallback={<PageSkeleton />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home darkMode={darkMode} />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
};

const AppShell: React.FC<{
  darkMode: boolean;
  onThemeToggle: () => void;
}> = ({ darkMode, onThemeToggle }) => {
  const location = useLocation();
  const showNav = location.pathname === "/landing";

  const handleNavigation = (section: string): void => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {showNav && (
        <Menu darkMode={darkMode} onThemeToggle={onThemeToggle} onNavigate={handleNavigation} />
      )}
      <AnimatedRoutes darkMode={darkMode} />
    </>
  );
};

const App: React.FC = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Router>
          <AppShell darkMode={true} onThemeToggle={() => {}} />
        </Router>
      </ThemeProvider>
    </SnackbarProvider>
  );
};

export default App;
