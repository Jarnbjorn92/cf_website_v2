import React from "react";
import { Container, useMediaQuery, useTheme } from "@mui/material";
import About from "./About";
import Portfolio from "./Portfolio";
import Contact from "./Contact";
import Footer from "../components/Footer";
import ParticleBackground from "../components/ParticleBackground";
import Transition from "../components/Transition";
import * as THREE from "three";

const LandingPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const color = new THREE.Color(0x6e44ff); // Deep purple

  return (
    <Transition>
      <ParticleBackground color={color} />
      <Container
        maxWidth="lg"
        sx={{
          py: isMobile ? 4 : 8,
          px: isMobile ? 2 : 4,
        }}
      >
        <div id="about" style={{ marginTop: "3rem" }}>
          <About />
        </div>
        <div id="portfolio" style={{ marginTop: "3rem" }}>
          <Portfolio />
        </div>
        <div id="contact" style={{ marginTop: "4rem" }}>
          <Contact />
        </div>
        <Footer />
      </Container>
    </Transition>
  );
};

export default LandingPage;
