import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import LandingPage from "./containers/LandingPage";
import About from "./containers/About";
import Portfolio from "./containers/Portfolio";
import Contact from "./containers/Contact";
import "./App.css";

const appTheme = createTheme({
  palette: {
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

const App: React.FC = () => {
  return (
    <ThemeProvider theme={appTheme}>
      <Router>
        <div className="App">
          <header className="App-header"></header>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
