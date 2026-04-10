import React from "react";
import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
import About from "./About";
import Portfolio from "./Portfolio";
import Contact from "./Contact";
import Footer from "../components/Footer";
import ParticleBackground from "../components/ParticleBackground";
import * as THREE from "three";

const GradientDivider = () => (
  <Box
    sx={{
      height: "3px",
      width: "100%",
      maxWidth: "80vw",
      mx: "auto",
      my: { xs: 6, md: 10 },
      background: "linear-gradient(90deg, transparent, #6366F1, #06B6D4, transparent)",
    }}
  />
);

const LandingPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const color = new THREE.Color(0x6366f1);
  const secondaryColor = new THREE.Color(0x06b6d4);

  return (
    <>
      <ParticleBackground color={color} secondaryColor={secondaryColor} />
      <Container
        maxWidth="lg"
        sx={{
          py: isMobile ? 4 : 8,
          px: isMobile ? 2 : 4,
        }}
      >
        <div id="about" style={{ marginTop: isMobile ? "4rem" : "2rem" }}>
          <About />
        </div>
        <GradientDivider />
        <div id="portfolio">
          <Portfolio />
        </div>
        <GradientDivider />
        <div id="contact">
          <Contact />
        </div>
        <Footer />
      </Container>
    </>
  );
};

export default LandingPage;
