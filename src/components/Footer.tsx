import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSocialClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Box
      component="footer"
      sx={{
        py: { xs: 3, md: 4 },
        px: isMobile ? 1 : 2,
        mt: "auto",
      }}
    >
      <Stack
        direction={isMobile ? "column" : "row"}
        justifyContent="space-between"
        alignItems="center"
        spacing={isMobile ? 2 : 0}
      >
        <Stack direction="row" spacing={2}>
          <IconButton
            sx={{ color: "#06B6D4" }}
            aria-label="GitHub"
            size={isMobile ? "small" : "large"}
            onClick={() => handleSocialClick("https://github.com/Jarnbjorn92")}
          >
            <GitHubIcon />
          </IconButton>
          <IconButton
            sx={{ color: "#06B6D4" }}
            aria-label="LinkedIn"
            size={isMobile ? "small" : "large"}
            onClick={() =>
              handleSocialClick("https://www.linkedin.com/in/connor-j-fleming/")
            }
          >
            <LinkedInIcon />
          </IconButton>
        </Stack>
        <Typography
          variant={isMobile ? "body2" : "body1"}
          color="text.secondary"
          align="center"
        >
          © {new Date().getFullYear()} Connor Fleming. All rights reserved.
        </Typography>
      </Stack>
    </Box>
  );
};

export default Footer;
