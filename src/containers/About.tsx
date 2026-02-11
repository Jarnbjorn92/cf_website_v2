import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  Chip,
  Avatar,
  Grid,
} from "@mui/material";
import profileImage from "../assets/me.jpeg";

const skills = {
  "Programming Languages": ["JavaScript", "TypeScript", "Python", "Java"],
  "Frameworks": [
    "React",
    "Vue.js",
    "React Native",
    "Node.js",
    "Express",
    "Fastify",
    "Django",
    "Bootstrap",
    "Flutter",
    "Spring Boot",
  ],
  "Cloud and Deployment": [
    "AWS",
    "Azure",
    "Docker",
    "Kubernetes",
    "Firebase",
    "Balena",
  ],
  "Databases & ORM": ["MySQL", "PostgreSQL", "MongoDB", "Prisma"],
  "Data & Visualisation": [
    "Highcharts",
    "Chart.js",
    "Apex Charts",
    "Real-time Dashboards",
  ],
  "Testing & API": [
    "Jest",
    "Unittest",
    "React Testing Library",
    "Cypress",
    "Postman",
    "REST APIs",
    "WebSockets",
  ],
  "Development Tools": [
    "Git",
    "Agile/Scrum",
    "CI/CD",
    "Jira",
    "Figma",
    "IoT Integration",
  ],
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
        pt: 0,
        pb: isMobile ? 4 : 8,
        px: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 1200,
          mb: 4,
          background: "linear-gradient(315deg, #6366F1, #06B6D4)",
          borderRadius: "17px",
          p: "1px",
        }}
      >
        <Card
          sx={{
            borderRadius: "16px",
            px: { xs: 3, md: 6 },
            py: { xs: 3, md: 5 },
          }}
        >
          <CardContent>
            <Grid
              container
              spacing={3}
              alignItems="center"
              direction={isMobile ? "column" : "row"}
            >
              {isMobile && (
                <Grid
                  size={{ xs: 12 }}
                  sx={{ display: "flex", justifyContent: "center", mb: 2 }}
                >
                  <Avatar
                    alt="Connor"
                    src={profileImage}
                    sx={{
                      width: 200,
                      height: 200,
                      outline: "3px solid #6366F1",
                      outlineOffset: "3px",
                    }}
                  />
                </Grid>
              )}
              <Grid size={{ xs: 12, md: 8 }}>
                <Typography variant={isMobile ? "h5" : "h4"} gutterBottom>
                  About Me
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Hello! I'm a Full-Stack Software Developer based in Scotland
                  with a journey from art and design to building production
                  systems for a wide range of platforms. I've developed
                  applications serving real-time management data, created
                  sophisticated KPI and CRM dashboards, and integrated
                  cloud-based systems using a wide variety of programming
                  languages and modern frameworks.
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  My design background influences how I approach development - I
                  believe the best applications balance technical robustness
                  with genuine usability. Currently I'm expanding my knowledge
                  into AI/ML, while sharpening my current skill with personal
                  projects that combine my full-stack expertise with popular and
                  emerging technologies.
                </Typography>
              </Grid>
              {!isMobile && (
                <Grid
                  size={{ md: 4 }}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Avatar
                    alt="Connor"
                    src={profileImage}
                    sx={{
                      width: 250,
                      height: 250,
                      outline: "3px solid #6366F1",
                      outlineOffset: "3px",
                    }}
                  />
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
      </Box>

      <Box
        sx={{
          width: "100%",
          maxWidth: 1200,
          background: "linear-gradient(135deg, #6366F1, #06B6D4)",
          borderRadius: "17px",
          p: "1px",
        }}
      >
        <Card
          sx={{
            borderRadius: "16px",
            px: { xs: 2, md: 4 },
            py: { xs: 3, md: 4 },
          }}
        >
          <CardContent>
            <Typography
              variant={isMobile ? "h5" : "h4"}
              gutterBottom
              align="center"
              sx={{ mb: 3 }}
            >
              My Skills
            </Typography>
            <Grid container spacing={3}>
              {Object.entries(skills).map(
                ([category, categorySkills], index, arr) => {
                  const isLastAlone =
                    index === arr.length - 1 && arr.length % 3 === 1;
                  return (
                    <Grid
                      size={{ xs: 12, sm: 6, md: 4 }}
                      key={category}
                      {...(isLastAlone ? { offset: { sm: 3, md: 4 } } : {})}
                    >
                      <Card
                        variant="outlined"
                        sx={{
                          "height": "100%",
                          "display": "flex",
                          "transition": "transform 0.3s ease-in-out, border-color 0.3s ease-in-out",
                          "&:hover": {
                            transform: "translateY(-4px)",
                            borderColor: "#6366F1",
                          },
                        }}
                      >
                        <CardContent
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            width: "100%",
                            flex: 1,
                          }}
                        >
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
                              alignContent: "center",
                              flex: 1,
                            }}
                          >
                            {categorySkills.map((skill) => (
                              <Chip
                                key={skill}
                                label={skill}
                                size={isMobile ? "small" : "medium"}
                              />
                            ))}
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                },
              )}
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default About;
