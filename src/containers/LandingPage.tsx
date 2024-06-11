import { Stack } from "@mui/material";
import React from "react";
import About from "./About";
import Portfolio from "./Portfolio";
import Contact from "./Contact";

const LandingPage: React.FC = () => {
  return (
    <Stack>
      <About />
      <Portfolio />
      <Contact />
    </Stack>
  );
};

export default LandingPage;
