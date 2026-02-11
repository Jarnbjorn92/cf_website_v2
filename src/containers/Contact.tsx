import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
  useTheme,
  useMediaQuery,
  Grid,
} from "@mui/material";
import { CloudDownload } from "@mui/icons-material";
import { useSnackbar } from "notistack";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { enqueueSnackbar } = useSnackbar();

  // Form state
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });

  const handleDownloadCV = () => {
    const cvPath = "/connor_fleming_fullstack_cv.pdf";
    window.open(cvPath, "_blank");
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.REACT_APP_WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        enqueueSnackbar("Thank you! Your message has been sent.", {
          variant: "success",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error("Failed to submit");
      }
    } catch (error) {
      enqueueSnackbar("Oops! Something went wrong. Please try again.", {
        variant: "error",
      });
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid
        container
        spacing={3}
        justifyContent="center"
        sx={{ width: "100%" }}
      >
        {/* Contact Form Section */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              background: "linear-gradient(315deg, #6366F1, #06B6D4)",
              borderRadius: "17px",
              p: "1px",
              height: "100%",
            }}
          >
          <Paper
            elevation={3}
            sx={{
              width: "100%",
              p: isMobile ? 3 : 4,
              backgroundColor: theme.palette.background.paper,
              borderRadius: "16px",
              height: "100%",
              boxSizing: "border-box",
            }}
          >
            <Typography
              variant={isMobile ? "h5" : "h4"}
              align="center"
              gutterBottom
              sx={{ mb: 3 }}
            >
              Contact Me
            </Typography>

            <form onSubmit={handleSubmit}>
              <Stack spacing={2.5}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  variant="outlined"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  variant="outlined"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Message"
                  name="message"
                  variant="outlined"
                  multiline
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  size="large"
                  sx={{ py: 1.5 }}
                >
                  Send Message
                </Button>
              </Stack>
            </form>
          </Paper>
          </Box>
        </Grid>

        {/* CV Download Section */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              background: "linear-gradient(315deg, #6366F1, #06B6D4)",
              borderRadius: "17px",
              p: "1px",
              height: "100%",
            }}
          >
          <Paper
            elevation={3}
            sx={{
              width: "100%",
              p: isMobile ? 3 : 4,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: theme.palette.background.paper,
              borderRadius: "16px",
              boxSizing: "border-box",
            }}
          >
            <Typography
              variant={isMobile ? "h5" : "h4"}
              align="center"
              gutterBottom
              sx={{ mb: 3 }}
            >
              Download CV
            </Typography>
            <Typography
              variant="body1"
              align="center"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: "500px" }}
            >
              Get a copy of my latest curriculum vitae to learn more about my
              experience and skills.
            </Typography>
            <Button
              variant="outlined"
              size="large"
              startIcon={<CloudDownload />}
              onClick={handleDownloadCV}
              fullWidth={isMobile}
              sx={{
                py: 1.5,
                px: 4,
              }}
            >
              Download CV
            </Button>
          </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Contact;
