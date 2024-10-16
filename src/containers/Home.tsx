import React, { useState, useEffect } from "react";
import { Stack, Button, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import UseAnimations from "react-useanimations";
import github from "react-useanimations/lib/github";
import linkedin from "react-useanimations/lib/linkedin";
import { useTheme } from "@mui/material/styles";
import ParticleBackground from "../components/ParticleBackground";
import * as THREE from 'three';

interface HomeProps {
  darkMode: boolean;
}

const Home: React.FC<HomeProps> = ({ darkMode }) => {
  const theme = useTheme();
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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
        }}
        spacing={2}
      >
        <Typography variant="h3">Connor Fleming</Typography>
        <Typography variant="h6">Full-Stack Software Developer</Typography>
        <Stack direction="row" spacing={2}>
          <UseAnimations
            animation={github}
            size={56}
            strokeColor={theme.palette.primary.main}
            autoplay={true}
            loop={true}
          />
          <UseAnimations
            animation={linkedin}
            size={56}
            strokeColor={theme.palette.primary.main}
            autoplay={true}
            loop={true}
          />
        </Stack>
        <Button
          variant="contained"
          color="primary"
          component={RouterLink}
          to="/landing"
        >
          Go to Landing
        </Button>
      </Stack>
    </>
  );
};

export default Home;
