import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";

const Contact: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
      <Paper
        elevation={3}
        sx={{
          maxWidth: isMobile ? "100%" : 600,
          width: "100%",
          m: isMobile ? 0 : 2,
          p: isMobile ? 2 : 4,
          backgroundColor:
            theme.palette.mode === "light"
              ? "rgba(255, 255, 255, 1)"
              : "rgba(0, 0, 0, 1)",
        }}
      >
        <Typography
          variant={isMobile ? "h5" : "h4"}
          align="center"
          gutterBottom
        >
          Contact Me
        </Typography>
        <form>
          <Stack spacing={isMobile ? 1 : 2}>
            <TextField fullWidth label="Name" variant="outlined" required />
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              required
            />
            <TextField
              fullWidth
              label="Message"
              variant="outlined"
              multiline
              rows={isMobile ? 3 : 4}
              required
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth={isMobile}
            >
              Send Message
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default Contact;
