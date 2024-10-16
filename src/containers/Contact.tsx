import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
  useTheme,
} from "@mui/material";

const Contact: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: 600,
          width: "100%",
          m: 2,
          p: 4,
          backgroundColor: theme.palette.mode === 'light'
            ? 'rgba(255, 255, 255, 1)'
            : 'rgba(0, 0, 0, 1)',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Contact Me
        </Typography>
        <form>
          <Stack spacing={2}>
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
              rows={4}
              required
            />
            <Button variant="contained" color="primary" type="submit">
              Send Message
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default Contact;
