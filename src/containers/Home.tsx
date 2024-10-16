import React from "react";
import { Stack, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import UseAnimations from "react-useanimations";
import github from "react-useanimations/lib/github";
import linkedin from "react-useanimations/lib/linkedin";
import { useTheme } from "@mui/material/styles";
import ParticleBackground from "../components/ParticleBackground";
import * as THREE from "three";
import Transition from "../components/Transition";

interface HomeProps {
  darkMode: boolean;
}

const Home: React.FC<HomeProps> = ({ darkMode }) => {
  const theme = useTheme();
  const color = new THREE.Color(0x00ffff);

  return (
    <Transition>
      <ParticleBackground color={color} />
      <Stack
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
          overflow: "hidden",
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
          component={Link}
          to="/landing"
        >
          Go to Landing
        </Button>
      </Stack>
    </Transition>
  );
};

export default Home;
