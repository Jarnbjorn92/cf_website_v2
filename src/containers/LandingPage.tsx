import React, { useState, useRef, useEffect } from "react";
import { Container, useMediaQuery, useTheme } from "@mui/material";
import About from "./About";
import Portfolio from "./Portfolio";
import Contact from "./Contact";
import Footer from "../components/Footer";
import ParticleBackground from "../components/ParticleBackground";
import Transition from "../components/Transition";
import * as THREE from "three";

const LandingPage: React.FC = () => {
  const [scrollColor, setScrollColor] = useState(new THREE.Color(0x0077ff));
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const color1 = new THREE.Color(0x0077ff); // Dark Neon blue
    const color2 = new THREE.Color(0xff1493); // Dark Neon pink
    const color3 = new THREE.Color(0x8a2be2); // Dark Neon purple
    
    const handleScroll = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      window.requestAnimationFrame(() => {
        const scrollPosition = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = Math.max(0, Math.min(1, scrollPosition / maxScroll));

        let finalColor = new THREE.Color();
        
        if (scrollPercentage < 0.5) {
          const t = scrollPercentage * 2;
          finalColor.copy(color1).lerp(color2, t);
        } else {
          const t = (scrollPercentage - 0.5) * 2;
          finalColor.copy(color2).lerp(color3, t);
        }

        setScrollColor(finalColor);
      });

      scrollTimeoutRef.current = setTimeout(() => {
      }, 0);
    };

    // Use passive listener for better scroll performance
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []); 

  return (
    <Transition>
      <ParticleBackground color={scrollColor} />
      <Container maxWidth={isMobile ? "sm" : "lg"} sx={{ py: isMobile ? 4 : 8 }}>
        <About />
        <Portfolio />
        <Contact />
        <Footer />
      </Container>
    </Transition>
  );
};

export default LandingPage;