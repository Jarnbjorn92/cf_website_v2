import React from "react";
import { Box, Typography, Card, CardContent, Stack } from "@mui/material";

const About: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card sx={{ maxWidth: 600, m: 2 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            About Me
          </Typography>
          <Typography variant="body1" paragraph>
            Hello! I'm a Full-Stack Software Developer passionate about creating
            efficient and user-friendly applications. With expertise in both
            front-end and back-end technologies, I strive to build comprehensive
            solutions that meet modern web development standards.
          </Typography>
          <Typography variant="body1" paragraph>
            My skills include:
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
            {["JavaScript", "React", "Node.js", "Python", "SQL", "AWS"].map(
              (skill) => (
                <Typography
                  key={skill}
                  variant="body2"
                  sx={{
                    bgcolor: "primary.main",
                    color: "white",
                    p: 1,
                    borderRadius: 1,
                  }}
                >
                  {skill}
                </Typography>
              )
            )}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default About;
