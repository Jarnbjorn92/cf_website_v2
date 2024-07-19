import React from "react";
import { Stack, Button, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import UseAnimations from "react-useanimations";
import github from "react-useanimations/lib/github";
import linkedin from "react-useanimations/lib/linkedin";
import { useTheme } from "@mui/material/styles";
import BlobBackground from "../components/BlobBackground";

interface HomeProps {
  darkMode: boolean;
}

const Home: React.FC<HomeProps> = ({ darkMode }) => {
  const theme = useTheme();

  return (
    <>
      {/* <BlobBackground darkMode={darkMode} /> */}
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
