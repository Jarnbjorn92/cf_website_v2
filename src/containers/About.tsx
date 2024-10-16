import React from "react";
import { Box, Typography, Card, CardContent, Stack, useTheme, useMediaQuery } from "@mui/material";

const About: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        minHeight: isMobile ? "auto" : "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: isMobile ? 4 : 8,
      }}
    >
      <Card sx={{ maxWidth: isMobile ? "100%" : 600, m: 2 }}>
        <CardContent>
          <Typography variant={isMobile ? "h5" : "h4"} gutterBottom>
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
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
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
                    fontSize: isMobile ? "0.7rem" : "0.875rem",
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
