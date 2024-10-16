import { Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import About from "./About";
import Portfolio from "./Portfolio";
import Contact from "./Contact";
import Footer from "../components/Footer";
import ParticleBackground from "../components/ParticleBackground";
import Transition from "../components/Transition";
import * as THREE from 'three';

const LandingPage: React.FC = () => {
  const [scrollColor, setScrollColor] = useState(new THREE.Color(0x00ffff)); // Light neon blue

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = scrollPosition / maxScroll;

      // Interpolate between light neon blue and neon purple based on scroll position
      const r = 0 + scrollPercentage * 0.5;
      const g = 1 - scrollPercentage * 1;
      const b = 1;
      setScrollColor(new THREE.Color(r, g, b));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Transition>
      <ParticleBackground color={scrollColor} />
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
    </Transition>
  );
};

export default LandingPage;
