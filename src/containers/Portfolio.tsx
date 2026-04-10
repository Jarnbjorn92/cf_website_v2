import React, { useState, useRef, useCallback } from "react";
import {
  Box,
  Typography,
  Chip,
  Stack,
  Button,
  Link,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import CloseIcon from "@mui/icons-material/Close";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import onaImage from "../assets/Oot'N'Aboot-logo.jpeg";
import bhImage from "../assets/blackhole.png";
import ccImage from "../assets/codeclanzo.png";
import Transition from "../components/Transition";

// ─── Data ─────────────────────────────────────────────────────────────────────

const THIS_SITE_TECHS = [
  "React", "TypeScript", "MUI v7", "Framer Motion", "Three.js",
  "Notistack", "Docker", "Kubernetes", "AWS",
];

const projects = [
  {
    id: "ona",
    title: "Oot'N'Aboot",
    description: "Tinder for gigs!",
    image: onaImage,
    longDescription:
      "An event finder mobile app. The user can find events happening in a location, favourite events to a list, buy tickets, and even find other users to go with!",
    githubLink: "https://github.com/Jarnbjorn92/Capstone_OotAndAboot",
    technologies: ["JavaScript", "React Native", "Java", "Spring Boot", "PostgreSQL"],
    accent: "#6366F1",
  },
  {
    id: "blackhole",
    title: "The Blackhole",
    description: "Snakes and ladders... in space!",
    image: bhImage,
    longDescription:
      "Portal themed web game based off of the classic boardgame 'snakes and ladders'. 2-Player game that tracks users scores and provides feedback with a scoreboard.",
    githubLink: "https://github.com/Jarnbjorn92/Portals",
    technologies: ["JavaScript", "React", "Express", "MongoDB", "Docker"],
    accent: "#06B6D4",
  },
  {
    id: "cclanzo",
    title: "CodeClanzo_",
    description: "Simple spending tracker",
    image: ccImage,
    longDescription:
      "Spending tracker app that can create a user, add/display/delete transactions, and provide a total spend for each user.",
    githubLink: "https://github.com/Jarnbjorn92/CodeClanzo_",
    technologies: ["Python", "Django", "Flask", "SQL"],
    accent: "#7C3AED",
  },
];

// ─── Spotlight card ────────────────────────────────────────────────────────────

const SpotlightCard: React.FC<{
  children: React.ReactNode;
  accent?: string;
  onClick?: () => void;
  layoutId?: string;
  style?: React.CSSProperties;
}> = ({ children, accent = "#6366F1", onClick, layoutId, style }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty("--mouse-x", "50%");
    cardRef.current.style.setProperty("--mouse-y", "50%");
  }, []);

  return (
    <motion.div
      layoutId={layoutId}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={onClick ? { y: -4, transition: { duration: 0.2 } } : {}}
      style={{
        position: "relative",
        borderRadius: 16,
        overflow: "hidden",
        cursor: onClick ? "pointer" : "default",
        background:
          theme.palette.mode === "dark"
            ? "rgba(24,24,27,0.9)"
            : "rgba(255,255,255,0.9)",
        border: `1px solid ${
          theme.palette.mode === "dark"
            ? "rgba(255,255,255,0.06)"
            : "rgba(0,0,0,0.06)"
        }`,
        backdropFilter: "blur(12px)",
        ...style,
      }}
    >
      {/* Spotlight layer */}
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0,
          transition: "opacity 300ms ease",
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${accent}14, transparent 40%)`,
          ".MuiBox-root:hover &, motion.div:hover &": { opacity: 1 },
          "[data-spotlight]:hover &": { opacity: 1 },
        }}
      />
      {/* Gradient border on hover */}
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0,
          transition: "opacity 300ms ease",
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${accent}30, transparent 40%)`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />
      <Box sx={{ position: "relative", zIndex: 1 }}>{children}</Box>
    </motion.div>
  );
};

// ─── Terminal animation for featured card ─────────────────────────────────────

const TERMINAL_LINES = [
  { text: "$ npm run build", delay: 0 },
  { text: "✓ Compiled successfully", delay: 0.8, color: "#22c55e" },
  { text: "$ aws s3 sync build/ s3://connorfleming.io", delay: 1.6 },
  { text: "✓ Deployed to production", delay: 2.6, color: "#22c55e" },
  { text: "$ _", delay: 3.2, blink: true },
];

const TerminalLine: React.FC<{
  text: string;
  delay: number;
  color?: string;
  blink?: boolean;
  shouldReduce: boolean;
}> = ({ text, delay, color, blink, shouldReduce }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: shouldReduce ? 0 : delay, duration: 0.3 }}
  >
    <Typography
      sx={{
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        fontSize: "0.78rem",
        color: color ?? "text.secondary",
        lineHeight: 1.8,
        ...(blink && {
          "& span": {
            animation: "cursor-blink 1s step-end infinite",
            "@keyframes cursor-blink": {
              "0%, 100%": { opacity: 1 },
              "50%": { opacity: 0 },
            },
          },
        }),
      }}
    >
      {blink ? (
        <>
          {"$ "}
          <Box component="span" sx={{ display: "inline-block", ml: "2px" }}>
            ▌
          </Box>
        </>
      ) : (
        text
      )}
    </Typography>
  </motion.div>
);

// ─── Portfolio ────────────────────────────────────────────────────────────────

const Portfolio: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [selected, setSelected] = useState<(typeof projects)[0] | null>(null);
  const shouldReduce = useReducedMotion();

  return (
    <Transition>
      <Box
        sx={{
          minHeight: "100vh",
          py: { xs: 10, md: 6 },
          px: { xs: 2, md: 4 },
          maxWidth: 1200,
          mx: "auto",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h2"
            align="center"
            sx={{ mb: 1 }}
          >
            Portfolio
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            align="center"
            sx={{ mb: 5 }}
          >
            A selection of things I've built
          </Typography>
        </motion.div>

        {/* ── Bento grid ─────────────────────────────────────────────────── */}
        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gridTemplateRows: "auto",
          }}
        >
          {/* Featured — this website (full width) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            style={{ gridColumn: isMobile ? "1" : "1 / -1" }}
          >
            <SpotlightCard accent="#6366F1">
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: 3,
                  p: { xs: 2.5, md: 3.5 },
                }}
              >
                {/* Left: text */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                    <Typography variant="caption" color="primary">
                      FEATURED
                    </Typography>
                  </Box>
                  <Typography variant="h4" gutterBottom>
                    This Website
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                    This portfolio showcases modern web development. Built with
                    a focus on responsiveness, smooth animations, and an
                    engaging UI. Deployed to AWS S3 and experimented with
                    Docker and Minikube Kubernetes clusters.
                  </Typography>
                  <Stack direction="row" flexWrap="wrap" gap={0.75} sx={{ mb: 2 }}>
                    {THIS_SITE_TECHS.map((t) => (
                      <Chip key={t} label={t} size="small" />
                    ))}
                  </Stack>
                  <Link
                    href="https://github.com/Jarnbjorn92/cf_website_v2"
                    target="_blank"
                    rel="noopener noreferrer"
                    color="inherit"
                    sx={{ textDecoration: "none" }}
                  >
                    <Button
                      startIcon={<GitHubIcon />}
                      variant="outlined"
                      size="small"
                      sx={{ minWidth: 44, minHeight: 44 }}
                    >
                      View on GitHub
                    </Button>
                  </Link>
                </Box>

                {/* Right: terminal */}
                <Box
                  sx={{
                    flex: "0 0 auto",
                    width: { xs: "100%", md: 320 },
                    borderRadius: 2,
                    overflow: "hidden",
                    background:
                      theme.palette.mode === "dark" ? "#09090B" : "#1e1e2e",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {/* Terminal titlebar */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.75,
                      px: 1.5,
                      py: 1,
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    {["#ef4444", "#f59e0b", "#22c55e"].map((c) => (
                      <Box
                        key={c}
                        sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: c }}
                      />
                    ))}
                    <Typography
                      sx={{
                        ml: 1,
                        fontSize: "0.7rem",
                        color: "rgba(255,255,255,0.3)",
                        fontFamily: "monospace",
                      }}
                    >
                      terminal
                    </Typography>
                  </Box>
                  <Box sx={{ p: 1.5 }}>
                    {TERMINAL_LINES.map((line) => (
                      <TerminalLine
                        key={line.text}
                        shouldReduce={!!shouldReduce}
                        {...line}
                      />
                    ))}
                  </Box>
                </Box>
              </Box>
            </SpotlightCard>
          </motion.div>

          {/* Project cards */}
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
            >
              <SpotlightCard
                accent={project.accent}
                onClick={() => setSelected(project)}
                layoutId={`card-${project.id}`}
              >
                {/* Image */}
                <Box
                  sx={{
                    height: isMobile ? 140 : 160,
                    overflow: "hidden",
                    borderRadius: "16px 16px 0 0",
                  }}
                >
                  <Box
                    component="img"
                    src={project.image}
                    alt={project.title}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 400ms ease",
                      "&:hover": { transform: "scale(1.04)" },
                    }}
                  />
                </Box>

                {/* Content */}
                <Box sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    {project.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                    {project.description}
                  </Typography>

                  {/* Tech chips — stagger on hover via whileInView */}
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-30px" }}
                    variants={{
                      hidden: {},
                      visible: { transition: { staggerChildren: 0.06 } },
                    }}
                  >
                    <Stack direction="row" flexWrap="wrap" gap={0.5}>
                      {project.technologies.map((t) => (
                        <motion.div
                          key={t}
                          variants={
                            shouldReduce
                              ? {}
                              : {
                                  hidden: { opacity: 0, scale: 0.8 },
                                  visible: { opacity: 1, scale: 1 },
                                }
                          }
                        >
                          <Chip label={t} size="small" />
                        </motion.div>
                      ))}
                    </Stack>
                  </motion.div>
                </Box>
              </SpotlightCard>
            </motion.div>
          ))}
        </Box>
      </Box>

      {/* ── Modal overlay (shared layoutId expand) ───────────────────────── */}
      <AnimatePresence>
        {selected && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelected(null)}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 1500,
                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(8px)",
              }}
            />

            {/* Expanded card */}
            <Box
              sx={{
                position: "fixed",
                inset: 0,
                zIndex: 1600,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 2,
                pointerEvents: "none",
              }}
            >
              <motion.div
                key="modal"
                layoutId={`card-${selected.id}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{
                  pointerEvents: "auto",
                  width: "100%",
                  maxWidth: 540,
                  borderRadius: 16,
                  overflow: "hidden",
                  background:
                    theme.palette.mode === "dark"
                      ? "rgba(24,24,27,0.98)"
                      : "rgba(255,255,255,0.98)",
                  border: `1px solid ${
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.08)"
                      : "rgba(0,0,0,0.08)"
                  }`,
                  boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
                }}
              >
                {/* Close button */}
                <Box sx={{ position: "relative" }}>
                  <Box
                    component="img"
                    src={selected.image}
                    alt={selected.title}
                    sx={{
                      width: "100%",
                      height: 220,
                      objectFit: "contain",
                      bgcolor: "background.paper",
                    }}
                  />
                  <Box
                    component="button"
                    onClick={() => setSelected(null)}
                    aria-label="Close"
                    sx={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      width: 44,
                      height: 44,
                      border: "none",
                      borderRadius: "50%",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(0,0,0,0.5)",
                      color: "#fff",
                      backdropFilter: "blur(8px)",
                      "&:focus-visible": {
                        outline: "2px solid #6366F1",
                        outlineOffset: "2px",
                      },
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </Box>
                </Box>

                <Box sx={{ p: 3 }}>
                  <Typography id="modal-title" variant="h5" gutterBottom>
                    {selected.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {selected.longDescription}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: "block" }}>
                    TECHNOLOGIES
                  </Typography>
                  <Stack direction="row" flexWrap="wrap" gap={0.75} sx={{ mb: 2.5 }}>
                    {selected.technologies.map((t) => (
                      <Chip key={t} label={t} size="small" />
                    ))}
                  </Stack>
                  <Link
                    href={selected.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="inherit"
                    sx={{ textDecoration: "none" }}
                  >
                    <Button
                      startIcon={<GitHubIcon />}
                      endIcon={<OpenInNewIcon fontSize="inherit" />}
                      variant="outlined"
                      size="small"
                      sx={{ minWidth: 44, minHeight: 44 }}
                    >
                      View on GitHub
                    </Button>
                  </Link>
                </Box>
              </motion.div>
            </Box>
          </>
        )}
      </AnimatePresence>
    </Transition>
  );
};

export default Portfolio;
