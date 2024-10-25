import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  useTheme,
  useMediaQuery,
  Chip,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Link,
  CardActionArea,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import onaImage from "../assets/Oot'N'Aboot-logo.jpeg";
import bhImage from "../assets/blackhole.png";
import ccImage from "../assets/codeclanzo.png";

const projects = [
  {
    title: "Oot'N'Aboot",
    description: "Tinder for gigs!",
    image: onaImage,
    longDescription:
      "An event finder mobile app. The user can find events happening in a location, favourite events to a list, buy tickets, and even find other users to go with!",
    githubLink: "https://github.com/Jarnbjorn92/Capstone_OotAndAboot",
    technologies: [
      "JavaScript",
      "React Native",
      "Java",
      "Spring Boot",
      "PostgreSQL",
    ],
  },
  {
    title: "The Blackhole",
    description: "Snakes and ladders... in space!",
    image: bhImage,
    longDescription:
      "Portal themed web game based off of the classic boardgame 'snakes and ladders'. 2-Player game that tracks users scores and provides feedback with a scoreboard.",
    githubLink: "https://github.com/Jarnbjorn92/Portals",
    technologies: ["JavaScript", "React", "Express", "MongoDB", "Docker"],
  },
  {
    title: "CodeClanzo_",
    description: "Simple Spending tracker",
    image: ccImage,
    longDescription:
      "Spending tracker app that can create a user, add/display/delete transactions, and provide a total spend for each user.",
    githubLink: "https://github.com/Jarnbjorn92/CodeClanzo_",
    technologies: ["Python", "Django", "Flask", "SQL"],
  },
];

const ProjectCard: React.FC<{
  project: (typeof projects)[0];
  onClick: () => void;
}> = ({ project, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isCardCentered, setIsCardCentered] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const checkIfCardCentered = () => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const cardCenterY = rect.top + rect.height / 2;
        const windowCenterY = windowHeight / 2;
        setIsCardCentered(
          Math.abs(cardCenterY - windowCenterY) < rect.height / 2
        );
      }
    };

    window.addEventListener("scroll", checkIfCardCentered);
    checkIfCardCentered();

    return () => window.removeEventListener("scroll", checkIfCardCentered);
  }, []);

  return (
    <Card
      ref={cardRef}
      sx={{
        transition: "all 0.3s ease-in-out",
        transform: isMobile && isCardCentered ? "scale(1.05)" : "scale(1)",
        boxShadow:
          isMobile && isCardCentered ? "0 4px 20px rgba(0,0,0,0.12)" : "none",
        "&:hover": {
          transform: !isMobile ? "scale(1.05)" : "scale(1)",
          boxShadow: !isMobile ? "0 4px 20px rgba(0,0,0,0.12)" : "none",
        },
      }}
    >
      <CardActionArea onClick={onClick}>
        <CardMedia
          component="img"
          height={isMobile ? "120" : "140"}
          image={project.image}
          alt={project.title}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant={isMobile ? "h6" : "h5"}
            component="div"
          >
            {project.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {project.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const Portfolio: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);

  const technologies = [
    "React",
    "TypeScript",
    "Material-UI",
    "Three.js",
    "Framer Motion",
  ];

  const handleClickOpen = (project: (typeof projects)[0]) => {
    setSelectedProject(project);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <Box sx={{ minHeight: isMobile ? "auto" : "auto", py: isMobile ? 4 : 8 }}>
      <Typography variant={isMobile ? "h5" : "h4"} align="center" gutterBottom>
        My Portfolio
      </Typography>
      <Grid container spacing={isMobile ? 2 : 3} justifyContent="center">
        <Grid item xs={12}>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography
                gutterBottom
                variant={isMobile ? "h6" : "h5"}
                component="div"
              >
                This Website
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                This portfolio website showcases my skills in modern web
                development. It's built with a focus on responsiveness, smooth
                animations, and an engaging user interface.
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Technologies used:
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {technologies.map((tech, index) => (
                  <Chip
                    key={index}
                    label={tech}
                    size={isMobile ? "small" : "medium"}
                  />
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        {projects.map((project, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ProjectCard
              project={project}
              onClick={() => handleClickOpen(project)}
            />
          </Grid>
        ))}
      </Grid>
      <Dialog open={openDialog} onClose={handleClose} maxWidth="sm" fullWidth>
        {selectedProject && (
          <>
            <DialogTitle>{selectedProject.title}</DialogTitle>
            <DialogContent>
              <Typography variant="body2" paragraph>
                {selectedProject.longDescription}
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                Technologies used:
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
                useFlexGap
                mb={2}
              >
                {selectedProject.technologies.map((tech, index) => (
                  <Chip key={index} label={tech} size="small" />
                ))}
              </Stack>
              <Link
                href={selectedProject.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
              >
                <Button
                  startIcon={<GitHubIcon />}
                  variant="outlined"
                  size="small"
                >
                  View on GitHub
                </Button>
              </Link>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} size="small">
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Portfolio;
