import React from "react";
import { Stack, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const LandingPage: React.FC = () => {
  return (
    <Stack
      sx={{
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
      spacing={2}
    >
      <div>Home Page</div>
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

export default LandingPage;
