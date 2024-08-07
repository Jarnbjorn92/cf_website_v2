import { Stack } from "@mui/material";
import React from "react";
import About from "./About";
import Portfolio from "./Portfolio";
import Contact from "./Contact";
import Footer from "../components/Footer";

const LandingPage: React.FC = () => {
  return (
    <Stack
      sx={{
        minHeight: "100vh",
        padding: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <About />
      <Portfolio />
      <Contact />
      <Footer />
    </Stack>
  );
};

export default LandingPage;
