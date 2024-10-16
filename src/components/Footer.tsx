import React from "react";
import { Box, Typography, IconButton, Stack } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 1,
        px: 0,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Stack direction="row" justifyContent="center" spacing={2} mb={2}>
        <IconButton color="primary" aria-label="GitHub">
          <GitHubIcon />
        </IconButton>
        <IconButton color="primary" aria-label="LinkedIn">
          <LinkedInIcon />
        </IconButton>
        <IconButton color="primary" aria-label="Twitter">
          <TwitterIcon />
        </IconButton>
      </Stack>
      <Typography variant="body2" color="text.secondary" align="center">
        © {new Date().getFullYear()} Connor Fleming. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
