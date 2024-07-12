import React from "react";
import { Stack, Button, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import UseAnimations from "react-useanimations";
import github from "react-useanimations/lib/github";
import linkedin from "react-useanimations/lib/linkedin";
import { useTheme } from "@mui/material/styles";

const Home: React.FC = () => {
  const theme = useTheme();

  return (
    <Stack
      sx={{
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
      spacing={2}
    >
      <Typography>Connor Fleming</Typography>
      <Typography>Full-Stack Software Developer</Typography>
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
  );
};

export default Home;
