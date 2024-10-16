import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";

const projects = [
  {
    title: "Project 1",
    description: "A brief description of Project 1 and its key features.",
    image: "https://via.placeholder.com/300x200",
  },
  {
    title: "Project 2",
    description:
      "An overview of Project 2, highlighting its main functionalities.",
    image: "https://via.placeholder.com/300x200",
  },
  {
    title: "Project 3",
    description:
      "Details about Project 3, including technologies used and problems solved.",
    image: "https://via.placeholder.com/300x200",
  },
];

const Portfolio: React.FC = () => {
  return (
    <Box sx={{ minHeight: "100vh", py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        My Portfolio
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {projects.map((project, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={project.image}
                alt={project.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {project.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {project.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Portfolio;
