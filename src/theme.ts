import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypeBackground {
    card?: string;
  }
}

// ─── Light theme — soft indigo ────────────────────────────────────────────────
// The whole palette lives in the same indigo/violet family as the brand accents.
// Background has a faint periwinkle tint so surfaces feel considered, not blank.
// Text uses indigo-950 so even the prose feels on-palette.
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
      default: "#EEEDF8",   // periwinkle-tinted base — barely lavender, clearly not grey
      paper: "#F5F4FC",     // slightly lighter for elevated surfaces
      card: "#E6E4F4",      // a touch more saturated for card insets
    },
    text: {
      primary: "#1E1B4B",   // indigo-950 — dark with a genuine purple cast
      secondary: "#6B6890", // muted lavender-slate — warm but not grey
    },
    divider: "rgba(79, 70, 229, 0.09)",
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
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          // Subtle grain texture — same feTurbulence trick as Home
          "&::before": {
            content: '""',
            position: "fixed",
            inset: 0,
            zIndex: -1,
            pointerEvents: "none",
            opacity: 0.03,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
          },
        },
      },
    },
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
          background: "rgba(245,244,252,0.88)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(79,70,229,0.09)",
          boxShadow: "0 1px 2px rgba(79,70,229,0.05), 0 4px 24px rgba(79,70,229,0.08)",
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
            boxShadow: "0 4px 16px rgba(99, 102, 241, 0.35)",
            background: "linear-gradient(135deg, #818CF8, #6366F1)",
            transform: "translateY(-1px)",
          },
          "&:active": {
            transform: "translateY(0px)",
          },
        },
        outlined: {
          borderColor: "rgba(79, 70, 229, 0.18)",
          "&:hover": {
            borderColor: "#4F46E5",
            backgroundColor: "rgba(79, 70, 229, 0.06)",
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
          backgroundColor: "rgba(79, 70, 229, 0.10)",
          color: "#4F46E5",
          border: "1px solid rgba(79, 70, 229, 0.16)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 10,
            "& fieldset": {
              borderColor: "rgba(79, 70, 229, 0.15)",
              transition: "border-color 0.2s ease",
            },
            "&:hover fieldset": {
              borderColor: "rgba(79, 70, 229, 0.30)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#4F46E5",
              boxShadow: "0 0 0 3px rgba(79, 70, 229, 0.12)",
            },
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
          border: "1px solid rgba(79, 70, 229, 0.09)",
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
