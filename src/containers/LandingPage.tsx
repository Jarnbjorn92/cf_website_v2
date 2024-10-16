import React, { useState, useEffect } from "react";
import { Container, useMediaQuery, useTheme } from "@mui/material";
import About from "./About";
import Portfolio from "./Portfolio";
import Contact from "./Contact";
import Footer from "../components/Footer";
import ParticleBackground from "../components/ParticleBackground";
import Transition from "../components/Transition";
import * as THREE from "three";

const LandingPage: React.FC = () => {
  const [scrollColor, setScrollColor] = useState(new THREE.Color(0x0077ff)); // Darker neon blue
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = scrollPosition / maxScroll;

      // Define three colors for the gradient (darker variants)
      const color1 = new THREE.Color(0x0077ff); // Dark Neon blue
      const color2 = new THREE.Color(0xff1493); // Dark Neon pink
      const color3 = new THREE.Color(0x8a2be2); // Darke Neon purple

      let finalColor;

      if (scrollPercentage < 0.5) {
        // Interpolate between color1 and color2 for the first half of the scroll
        finalColor = color1.lerp(color2, scrollPercentage * 2);
      } else {
        // Interpolate between color2 and color3 for the second half of the scroll
        finalColor = color2.lerp(color3, (scrollPercentage - 0.5) * 2);
      }
      setScrollColor(finalColor);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Transition>
      <ParticleBackground color={scrollColor} />
      <Container
        maxWidth={isMobile ? "sm" : "lg"}
        sx={{ py: isMobile ? 4 : 8 }}
      >
        <About />
        <Portfolio />
        <Contact />
        <Footer />
      </Container>
    </Transition>
  );
};

export default LandingPage;
