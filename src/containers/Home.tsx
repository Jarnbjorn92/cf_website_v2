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
  const color = new THREE.Color(0x0077ff);

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
        spacing={3}
      >
        <Typography variant="h2">Connor Fleming</Typography>
        <Typography variant="h5">Full-Stack Software Developer</Typography>
        <Stack direction="row" spacing={3}>
          <Button sx={{ borderRadius: 15 }}>
            <UseAnimations
              animation={github}
              size={56}
              strokeColor={theme.palette.primary.main}
              autoplay={true}
              loop={true}
            />
          </Button>
          <Button sx={{ borderRadius: 15 }}>
            <UseAnimations
              animation={linkedin}
              size={56}
              strokeColor={theme.palette.primary.main}
              autoplay={true}
              loop={true}
            />
          </Button>
        </Stack>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/landing"
        >
          Enter
        </Button>
      </Stack>
    </Transition>
  );
};

export default Home;
