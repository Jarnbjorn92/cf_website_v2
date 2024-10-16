import { Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import About from "./About";
import Portfolio from "./Portfolio";
import Contact from "./Contact";
import Footer from "../components/Footer";
import ParticleBackground from "../components/ParticleBackground";
import * as THREE from 'three';

const LandingPage: React.FC = () => {
  const [scrollColor, setScrollColor] = useState(new THREE.Color(0x0000ff));

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = scrollPosition / maxScroll;

      // Interpolate between blue and red based on scroll position
      const r = Math.min(scrollPercentage * 2, 1);
      const b = Math.max(1 - scrollPercentage * 2, 0);
      setScrollColor(new THREE.Color(r, 0, b));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
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
    </>
  );
};

export default LandingPage;
