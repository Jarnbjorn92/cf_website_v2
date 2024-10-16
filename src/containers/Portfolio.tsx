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
import GitHubIcon from '@mui/icons-material/GitHub';

const projects = [
  {
    title: "Project 1",
    description: "A brief description of Project 1 and its key features.",
    image: "https://via.placeholder.com/300x200",
    longDescription: "This is a longer description of Project 1. It goes into more detail about the project's goals, challenges faced, and solutions implemented.",
    githubLink: "https://github.com/yourusername/project1",
    technologies: ["React", "Node.js", "MongoDB"],
  },
  {
    title: "Project 2",
    description: "An overview of Project 2, highlighting its main functionalities.",
    image: "https://via.placeholder.com/300x200",
    longDescription: "Project 2 was a complex endeavor that involved [specific details]. It showcases my ability to [specific skills].",
    githubLink: "https://github.com/yourusername/project2",
    technologies: ["Vue.js", "Express", "PostgreSQL"],
  },
  {
    title: "Project 3",
    description: "Details about Project 3, including technologies used and problems solved.",
    image: "https://via.placeholder.com/300x200",
    longDescription: "Project 3 was focused on [specific goal]. It required innovative solutions for [specific challenges] and resulted in [specific outcomes].",
    githubLink: "https://github.com/yourusername/project3",
    technologies: ["Angular", "Django", "MySQL"],
  },
];

const ProjectCard: React.FC<{ project: typeof projects[0], onClick: () => void }> = ({ project, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isCardCentered, setIsCardCentered] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const checkIfCardCentered = () => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const cardCenterY = rect.top + rect.height / 2;
        const windowCenterY = windowHeight / 2;
        setIsCardCentered(Math.abs(cardCenterY - windowCenterY) < rect.height / 2);
      }
    };

    window.addEventListener('scroll', checkIfCardCentered);
    checkIfCardCentered(); // Check on mount

    return () => window.removeEventListener('scroll', checkIfCardCentered);
  }, []);

  return (
    <Card 
      ref={cardRef}
      sx={{
        transition: 'all 0.3s ease-in-out',
        transform: isMobile && isCardCentered ? 'scale(1.05)' : 'scale(1)',
        boxShadow: isMobile && isCardCentered ? '0 4px 20px rgba(0,0,0,0.12)' : 'none',
        '&:hover': {
          transform: !isMobile ? 'scale(1.05)' : 'scale(1)',
          boxShadow: !isMobile ? '0 4px 20px rgba(0,0,0,0.12)' : 'none',
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
          <Typography gutterBottom variant={isMobile ? "h6" : "h5"} component="div">
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
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const technologies = [
    "React",
    "TypeScript",
    "Material-UI",
    "Three.js",
    "Framer Motion",
  ];

  const handleClickOpen = (project: typeof projects[0]) => {
    setSelectedProject(project);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <Box sx={{ minHeight: isMobile ? "auto" : "100vh", py: isMobile ? 4 : 8 }}>
      <Typography variant={isMobile ? "h5" : "h4"} align="center" gutterBottom>
        My Portfolio
      </Typography>
      <Grid container spacing={isMobile ? 2 : 3} justifyContent="center">
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant={isMobile ? "h6" : "h5"} component="div">
                This Website
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                This portfolio website showcases my skills in modern web development. It's built with a focus on responsiveness, smooth animations, and an engaging user interface.
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Technologies used:
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {technologies.map((tech, index) => (
                  <Chip key={index} label={tech} size={isMobile ? "small" : "medium"} />
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        {projects.map((project, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ProjectCard project={project} onClick={() => handleClickOpen(project)} />
          </Grid>
        ))}
      </Grid>
      <Dialog open={openDialog} onClose={handleClose} maxWidth="sm" fullWidth>
        {selectedProject && (
          <>
            <DialogTitle>{selectedProject.title}</DialogTitle>
            <DialogContent>
              <Typography variant="body2" paragraph>{selectedProject.longDescription}</Typography>
              <Typography variant="subtitle2" gutterBottom>Technologies used:</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap mb={2}>
                {selectedProject.technologies.map((tech, index) => (
                  <Chip key={index} label={tech} size="small" />
                ))}
              </Stack>
              <Link href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer" color="inherit">
                <Button startIcon={<GitHubIcon />} variant="outlined" size="small">
                  View on GitHub
                </Button>
              </Link>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} size="small">Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Portfolio;
