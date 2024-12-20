import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  Grid,
  Chip,
  Paper,
  Avatar,
} from "@mui/material";
import profileImage from "../assets/me.jpeg";

const skills = {
  "Programming Languages": ["JavaScript", "TypeScript", "Python", "Java"],
  Frameworks: [
    "React",
    "React Native",
    "Node.js",
    "Express",
    "Django",
    "Flutter",
    "Spring Boot",
  ],
  "Cloud and Deployment": ["AWS", "Azure", "Docker", "Kubernetes", "Firebase"],
  Databases: ["MySQL", "PostgreSQL", "MongoDB"],
  "Testing & API": [
    "Jest",
    "Unittest",
    "React Testing Library",
    "Cypress",
    "Postman",
  ],
  Miscellaneous: ["Git", "Agile/Scrum", "CI/CD", "Jira", "REST"],
};

const About: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        minHeight: isMobile ? "auto" : "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: isMobile ? 4 : 8,
        px: 2,
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 1200, mb: 4, px: 5 }}>
        <CardContent>
          <Grid
            container
            spacing={3}
            alignItems="center"
            direction={isMobile ? "column" : "row"}
          >
            {isMobile && (
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center", mb: 2 }}
              >
                <Avatar
                  alt="Connor"
                  src={profileImage}
                  sx={{
                    width: 200,
                    height: 200,
                    boxShadow: theme.shadows[3],
                  }}
                />
              </Grid>
            )}
            <Grid item xs={12} md={8}>
              <Typography variant={isMobile ? "h5" : "h4"} gutterBottom>
                About Me
              </Typography>
              <Typography variant="body1" paragraph>
                Hello! I'm a Full-Stack Software Developer passionate about
                creating efficient and user-friendly applications. With
                expertise in both front-end and back-end technologies, I strive
                to build comprehensive solutions for modern web development.
              </Typography>
              <Typography variant="body1" paragraph>
                Whether working on a dynamic web app, integrating APIs, or
                optimising existing systems, I am committed to delivering code
                that is clean, maintainable, and scalable. I enjoy collaborating
                with teams to bring ideas to life, and I believe that the best
                solutions come from a balance of creativity, technical
                expertise, and a focus on user experience.
              </Typography>
            </Grid>
            {!isMobile && (
              <Grid
                item
                md={4}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Avatar
                  alt="Your Name"
                  src={profileImage}
                  sx={{
                    width: 250,
                    height: 250,
                    boxShadow: theme.shadows[3],
                  }}
                />
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>

      <Paper elevation={3} sx={{ width: "100%", maxWidth: 1200, p: 3 }}>
        <Typography
          variant={isMobile ? "h5" : "h4"}
          gutterBottom
          align="center"
        >
          My Skills
        </Typography>
        <Grid container spacing={3}>
          {Object.entries(skills).map(([category, categorySkills]) => (
            <Grid item xs={12} sm={6} md={4} key={category}>
              <Card
                variant="outlined"
                sx={{
                  height: "100%",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: theme.shadows[4],
                  },
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    align="center"
                    color="primary"
                  >
                    {category}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 1,
                      justifyContent: "center",
                    }}
                  >
                    {categorySkills.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        size={isMobile ? "small" : "medium"}
                        sx={{
                          bgcolor: theme.palette.primary.main,
                          color: "white",
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default About;
