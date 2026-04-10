import React, { useState, useEffect } from "react";
import { Box, IconButton, Switch, Typography, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import MailIcon from "@mui/icons-material/Mail";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface MenuProps {
  darkMode: boolean;
  onThemeToggle: () => void;
  onNavigate: (section: string) => void;
}

const NAV_ITEMS = [
  { label: "About",     sectionId: "about",     icon: <PersonIcon fontSize="small" /> },
  { label: "Portfolio", sectionId: "portfolio",  icon: <WorkIcon fontSize="small" /> },
  { label: "Contact",   sectionId: "contact",    icon: <MailIcon fontSize="small" /> },
];

const Menu: React.FC<MenuProps> = ({ darkMode, onThemeToggle, onNavigate }) => {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const shouldReduce = useReducedMotion();

  // Track which section is in view
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    NAV_ITEMS.forEach(({ sectionId }) => {
      const el = document.getElementById(sectionId);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(sectionId); },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const glassBg =
    theme.palette.mode === "dark"
      ? "rgba(9,9,11,0.75)"
      : "rgba(250,250,250,0.75)";
  const glassBorder =
    theme.palette.mode === "dark"
      ? "1px solid rgba(255,255,255,0.08)"
      : "1px solid rgba(0,0,0,0.08)";

  const handleNav = (sectionId: string) => {
    onNavigate(sectionId);
    setMobileOpen(false);
  };

  return (
    <>
      {/* ── Desktop floating pill ────────────────────────────────────────── */}
      <Box
        component="nav"
        aria-label="Main navigation"
        sx={{
          display: { xs: "none", sm: "flex" },
          position: "fixed",
          top: 20,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1100,
          alignItems: "center",
          gap: 0.5,
          px: 1.5,
          py: 0.75,
          borderRadius: 99,
          background: glassBg,
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: glassBorder,
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.03)"
              : "0 4px 24px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.03)",
        }}
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.sectionId;
          return (
            <Box key={item.sectionId} sx={{ position: "relative" }}>
              {/* Sliding active indicator */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: 99,
                      background:
                        theme.palette.mode === "dark"
                          ? "rgba(99,102,241,0.18)"
                          : "rgba(79,70,229,0.1)",
                      border: "1px solid rgba(99,102,241,0.3)",
                    }}
                    transition={
                      shouldReduce
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 400, damping: 30 }
                    }
                  />
                )}
              </AnimatePresence>

              <Box
                component="button"
                onClick={() => handleNav(item.sectionId)}
                aria-current={isActive ? "page" : undefined}
                sx={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.75,
                  px: 1.5,
                  py: 0.75,
                  border: "none",
                  background: "transparent",
                  borderRadius: 99,
                  cursor: "pointer",
                  color: isActive
                    ? "primary.main"
                    : "text.secondary",
                  transition: "color 150ms ease",
                  "&:hover": { color: "text.primary" },
                  "&:focus-visible": {
                    outline: "2px solid #6366F1",
                    outlineOffset: "2px",
                  },
                }}
              >
                {item.icon}
                <Typography
                  sx={{
                    fontSize: "0.875rem",
                    fontWeight: isActive ? 600 : 500,
                    lineHeight: 1,
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.label}
                </Typography>
              </Box>
            </Box>
          );
        })}

        {/* Divider */}
        <Box
          sx={{
            width: "1px",
            height: 20,
            mx: 0.5,
            bgcolor: theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.1)"
              : "rgba(0,0,0,0.1)",
          }}
        />

        {/* Theme toggle */}
        <IconButton
          onClick={onThemeToggle}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          size="small"
          sx={{
            color: "text.secondary",
            "&:hover": { color: "text.primary", bgcolor: "transparent" },
            "&:focus-visible": {
              outline: "2px solid #6366F1",
              outlineOffset: "2px",
            },
          }}
        >
          {darkMode ? (
            <LightModeIcon fontSize="small" />
          ) : (
            <DarkModeIcon fontSize="small" />
          )}
        </IconButton>
      </Box>

      {/* ── Mobile hamburger ─────────────────────────────────────────────── */}
      <Box sx={{ display: { xs: "block", sm: "none" } }}>
        <IconButton
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={mobileOpen}
          sx={{
            position: "fixed",
            top: 20,
            right: 20,
            zIndex: 1200,
            color: "text.primary",
            background: glassBg,
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: glassBorder,
            width: 44,
            height: 44,
            "&:focus-visible": {
              outline: "2px solid #6366F1",
              outlineOffset: "2px",
            },
          }}
        >
          <MenuIcon />
        </IconButton>

        {/* Mobile bottom sheet */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setMobileOpen(false)}
                style={{
                  position: "fixed",
                  inset: 0,
                  zIndex: 1300,
                  background: "rgba(0,0,0,0.5)",
                  backdropFilter: "blur(4px)",
                }}
              />

              {/* Sheet */}
              <motion.div
                key="sheet"
                role="dialog"
                aria-modal="true"
                aria-label="Navigation menu"
                initial={shouldReduce ? { opacity: 0 } : { y: "100%" }}
                animate={shouldReduce ? { opacity: 1 } : { y: 0 }}
                exit={shouldReduce ? { opacity: 0 } : { y: "100%" }}
                transition={
                  shouldReduce
                    ? { duration: 0.15 }
                    : { type: "spring", stiffness: 300, damping: 30 }
                }
                style={{
                  position: "fixed",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  zIndex: 1400,
                  background:
                    theme.palette.mode === "dark"
                      ? "rgba(18,18,20,0.97)"
                      : "rgba(255,255,255,0.97)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  borderTop:
                    theme.palette.mode === "dark"
                      ? "1px solid rgba(255,255,255,0.08)"
                      : "1px solid rgba(0,0,0,0.08)",
                  borderRadius: "20px 20px 0 0",
                  padding: "24px 24px 40px",
                }}
              >
                {/* Handle + close */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 4,
                      borderRadius: 99,
                      bgcolor: "divider",
                      mx: "auto",
                      position: "absolute",
                      left: "50%",
                      transform: "translateX(-50%)",
                      top: 12,
                    }}
                  />
                  <IconButton
                    onClick={() => setMobileOpen(false)}
                    aria-label="Close navigation menu"
                    sx={{
                      ml: "auto",
                      color: "text.secondary",
                      "&:focus-visible": {
                        outline: "2px solid #6366F1",
                        outlineOffset: "2px",
                      },
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>

                {/* Nav items */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {NAV_ITEMS.map((item, i) => {
                    const isActive = activeSection === item.sectionId;
                    return (
                      <motion.div
                        key={item.sectionId}
                        initial={shouldReduce ? {} : { opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06, duration: 0.25 }}
                      >
                        <Box
                          component="button"
                          onClick={() => handleNav(item.sectionId)}
                          aria-current={isActive ? "page" : undefined}
                          sx={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            px: 2,
                            py: 1.5,
                            border: "none",
                            borderRadius: 2,
                            cursor: "pointer",
                            textAlign: "left",
                            background: isActive
                              ? alpha(theme.palette.primary.main, 0.1)
                              : "transparent",
                            borderLeft: isActive
                              ? `3px solid ${theme.palette.primary.main}`
                              : "3px solid transparent",
                            color: isActive ? "primary.main" : "text.primary",
                            transition: "all 150ms ease",
                            "&:hover": {
                              background: alpha(theme.palette.primary.main, 0.06),
                            },
                            "&:focus-visible": {
                              outline: "2px solid #6366F1",
                              outlineOffset: "2px",
                            },
                          }}
                        >
                          {item.icon}
                          <Typography
                            sx={{ fontSize: "1rem", fontWeight: isActive ? 600 : 500 }}
                          >
                            {item.label}
                          </Typography>
                        </Box>
                      </motion.div>
                    );
                  })}
                </Box>

                {/* Theme toggle row */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mt: 3,
                    pt: 3,
                    borderTop: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {darkMode ? (
                      <DarkModeIcon fontSize="small" sx={{ color: "text.secondary" }} />
                    ) : (
                      <LightModeIcon fontSize="small" sx={{ color: "text.secondary" }} />
                    )}
                    <Typography sx={{ fontSize: "0.9rem", color: "text.secondary" }}>
                      {darkMode ? "Dark mode" : "Light mode"}
                    </Typography>
                  </Box>
                  <Switch
                    checked={darkMode}
                    onChange={onThemeToggle}
                    inputProps={{ "aria-label": "Toggle dark mode" }}
                    sx={{
                      "& .MuiSwitch-thumb": { bgcolor: "primary.main" },
                      "& .Mui-checked + .MuiSwitch-track": {
                        bgcolor: alpha(theme.palette.primary.main, 0.4),
                      },
                    }}
                  />
                </Box>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </Box>
    </>
  );
};

export default Menu;
