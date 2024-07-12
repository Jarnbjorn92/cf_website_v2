import { Stack, Card, Box } from "@mui/material";
import React from "react";

const About: React.FC = () => {
  return (
    <Box>
      <Stack
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card>
          <Stack direction="row"></Stack>
        </Card>

        <div>About</div>
      </Stack>
    </Box>
  );
};

export default About;
