import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypeBackground {
    card?: string;
  }
}

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#4F46E5",
      light: "#6366F1",
      dark: "#4338CA",
    },
    secondary: {
      main: "#0891B2",
      light: "#06B6D4",
    },
    background: {
      default: "#FAFAFA",
      paper: "#FFFFFF",
      card: "#F4F4F5",
    },
    text: {
      primary: "#09090B",
      secondary: "#71717A",
    },
    divider: "rgba(0, 0, 0, 0.08)",
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    h1: {
      fontSize: "clamp(2.5rem, 5vw, 4rem)",
      fontWeight: 800,
      letterSpacing: "-0.03em",
      lineHeight: 1.1,
    },
    h2: {
      fontSize: "clamp(2rem, 4vw, 3rem)",
      fontWeight: 700,
      letterSpacing: "-0.02em",
      lineHeight: 1.2,
    },
    h3: {
      fontSize: "clamp(1.5rem, 3vw, 2rem)",
      fontWeight: 700,
      letterSpacing: "-0.01em",
      lineHeight: 1.3,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
      letterSpacing: "-0.01em",
      lineHeight: 1.4,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: "1.0625rem",
      lineHeight: 1.75,
      letterSpacing: "-0.01em",
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.7,
      letterSpacing: "-0.005em",
    },
    caption: {
      fontSize: "0.75rem",
      fontWeight: 500,
      letterSpacing: "0.05em",
      textTransform: "uppercase" as const,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          borderRadius: 16,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(0, 0, 0, 0.06)",
          boxShadow: "0 0 0 1px rgba(0,0,0,0.03), 0 4px 24px rgba(0,0,0,0.06)",
          transition: "border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: "none" as const,
          fontWeight: 600,
          padding: "10px 20px",
          fontSize: "0.875rem",
          transition: "all 0.15s ease",
        },
        contained: {
          boxShadow: "none",
          background: "linear-gradient(135deg, #6366F1, #4F46E5)",
          color: "#FFFFFF",
          "&:hover": {
            boxShadow: "0 4px 16px rgba(99, 102, 241, 0.4)",
            background: "linear-gradient(135deg, #818CF8, #6366F1)",
            transform: "translateY(-1px)",
          },
          "&:active": {
            transform: "translateY(0px)",
          },
        },
        outlined: {
          borderColor: "rgba(0, 0, 0, 0.15)",
          "&:hover": {
            borderColor: "#4F46E5",
            backgroundColor: "rgba(79, 70, 229, 0.08)",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
          fontSize: "0.8125rem",
        },
        filled: {
          backgroundColor: "rgba(79, 70, 229, 0.1)",
          color: "#4F46E5",
          border: "1px solid rgba(79, 70, 229, 0.15)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 10,
            "& fieldset": {
              borderColor: "rgba(0, 0, 0, 0.1)",
              transition: "border-color 0.2s ease",
            },
            "&:hover fieldset": {
              borderColor: "rgba(0, 0, 0, 0.2)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#4F46E5",
              boxShadow: "0 0 0 3px rgba(79, 70, 229, 0.15)",
            },
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
          border: "1px solid rgba(0, 0, 0, 0.06)",
          backgroundImage: "none",
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#6366F1",
      light: "#818CF8",
      dark: "#4F46E5",
    },
    secondary: {
      main: "#06B6D4",
      light: "#22D3EE",
    },
    background: {
      default: "#09090B",
      paper: "#18181B",
      card: "#27272A",
    },
    text: {
      primary: "#FAFAFA",
      secondary: "#A1A1AA",
    },
    divider: "rgba(255, 255, 255, 0.08)",
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    h1: {
      fontSize: "clamp(2.5rem, 5vw, 4rem)",
      fontWeight: 800,
      letterSpacing: "-0.03em",
      lineHeight: 1.1,
    },
    h2: {
      fontSize: "clamp(2rem, 4vw, 3rem)",
      fontWeight: 700,
      letterSpacing: "-0.02em",
      lineHeight: 1.2,
    },
    h3: {
      fontSize: "clamp(1.5rem, 3vw, 2rem)",
      fontWeight: 700,
      letterSpacing: "-0.01em",
      lineHeight: 1.3,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
      letterSpacing: "-0.01em",
      lineHeight: 1.4,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: "1.0625rem",
      lineHeight: 1.75,
      letterSpacing: "-0.01em",
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.7,
      letterSpacing: "-0.005em",
    },
    caption: {
      fontSize: "0.75rem",
      fontWeight: 500,
      letterSpacing: "0.05em",
      textTransform: "uppercase" as const,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          borderRadius: 16,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          background: "rgba(24, 24, 27, 0.9)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.06)",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.03), 0 4px 24px rgba(0,0,0,0.4)",
          transition: "border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: "none" as const,
          fontWeight: 600,
          padding: "10px 20px",
          fontSize: "0.875rem",
          transition: "all 0.15s ease",
        },
        contained: {
          boxShadow: "none",
          background: "linear-gradient(135deg, #6366F1, #4F46E5)",
          color: "#FFFFFF",
          "&:hover": {
            boxShadow: "0 4px 16px rgba(99, 102, 241, 0.4)",
            background: "linear-gradient(135deg, #818CF8, #6366F1)",
            transform: "translateY(-1px)",
          },
          "&:active": {
            transform: "translateY(0px)",
          },
        },
        outlined: {
          borderColor: "rgba(255, 255, 255, 0.15)",
          "&:hover": {
            borderColor: "#6366F1",
            backgroundColor: "rgba(99, 102, 241, 0.08)",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
          fontSize: "0.8125rem",
        },
        filled: {
          backgroundColor: "rgba(99, 102, 241, 0.15)",
          color: "#818CF8",
          border: "1px solid rgba(99, 102, 241, 0.2)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 10,
            "& fieldset": {
              borderColor: "rgba(255, 255, 255, 0.1)",
              transition: "border-color 0.2s ease",
            },
            "&:hover fieldset": {
              borderColor: "rgba(255, 255, 255, 0.2)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#6366F1",
              boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.15)",
            },
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
          border: "1px solid rgba(255, 255, 255, 0.06)",
          backgroundImage: "none",
        },
      },
    },
  },
});
