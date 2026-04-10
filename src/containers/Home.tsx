import React, { useEffect, useState, useRef } from "react";
import { Stack, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UseAnimations from "react-useanimations";
import github from "react-useanimations/lib/github";
import linkedin from "react-useanimations/lib/linkedin";
import { useTheme } from "@mui/material/styles";
import ParticleBackground from "../components/ParticleBackground";
import * as THREE from "three";
import Transition from "../components/Transition";
import {
  motion,
  useSpring,
  useReducedMotion,
} from "framer-motion";

interface HomeProps {
  darkMode: boolean;
}

// ─── Magnetic social button ───────────────────────────────────────────────────
interface MagneticButtonProps {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onMouseDown?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseUp?: React.MouseEventHandler<HTMLButtonElement>;
  onTouchStart?: React.TouchEventHandler<HTMLButtonElement>;
  onTouchEnd?: React.TouchEventHandler<HTMLButtonElement>;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  onMouseDown,
  onMouseUp,
  onTouchStart,
  onTouchEnd,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 300, damping: 22 });
  const y = useSpring(0, { stiffness: 300, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (shouldReduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.28);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.28);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Button
        sx={{
          borderRadius: "50%",
          minWidth: 0,
          width: 72,
          height: 72,
          border: "1px solid rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(8px)",
          "&:hover": {
            backgroundColor: "rgba(99, 102, 241, 0.1)",
            borderColor: "#6366F1",
            boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)",
          },
        }}
        onClick={onClick}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {children}
      </Button>
    </motion.div>
  );
};

// ─── Home ─────────────────────────────────────────────────────────────────────
const NAME_WORDS = ["Connor", "Fleming"];
const ROLE_TEXT = "Full-Stack Software Developer";

const Home: React.FC<HomeProps> = ({ darkMode }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const color = new THREE.Color(0x6366f1);
  const secondaryColor = new THREE.Color(0x06b6d4);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const socialButtonsRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // ── Framer Motion variants (defined inside so shouldReduceMotion is in scope)
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] as const },
    },
  };

  // ── Wheel / touch / click → navigate to /landing ──────────────────────────
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (
        socialButtonsRef.current &&
        !socialButtonsRef.current.contains(event.target as Node) &&
        Math.abs(event.deltaY) > 30
      ) {
        navigate("/landing");
      }
    };
    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [navigate]);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      if (
        socialButtonsRef.current &&
        !socialButtonsRef.current.contains(event.target as Node)
      ) {
        setTouchStart(Date.now());
      }
    };
    const handleMouseUp = (event: MouseEvent) => {
      if (
        socialButtonsRef.current &&
        !socialButtonsRef.current.contains(event.target as Node) &&
        touchStart &&
        Date.now() - touchStart < 200
      ) {
        navigate("/landing");
      }
      setTouchStart(null);
    };
    const handleTouchStart = (event: TouchEvent) => {
      if (
        socialButtonsRef.current &&
        !socialButtonsRef.current.contains(event.target as Node)
      ) {
        setTouchStart(Date.now());
      }
    };
    const handleTouchEnd = (event: TouchEvent) => {
      if (
        socialButtonsRef.current &&
        !socialButtonsRef.current.contains(event.target as Node) &&
        touchStart &&
        Date.now() - touchStart < 200
      ) {
        navigate("/landing");
      }
      setTouchStart(null);
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [navigate, touchStart]);

  const handleSocialClick = (url: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Transition>
      <ParticleBackground color={color} secondaryColor={secondaryColor} />

      {/* ── Grain / noise overlay ─────────────────────────────────────────── */}
      <Box
        aria-hidden="true"
        sx={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
          opacity: 0.045,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      <Stack
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
          overflow: "hidden",
          cursor: "pointer",
          position: "relative",
          zIndex: 2,
        }}
        spacing={3}
      >
        {/* ── Status badge ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              px: 2,
              py: 0.75,
              borderRadius: 99,
              backdropFilter: "blur(12px)",
              background:
                theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.06)"
                  : "rgba(0,0,0,0.04)",
              border:
                theme.palette.mode === "dark"
                  ? "1px solid rgba(255,255,255,0.1)"
                  : "1px solid rgba(0,0,0,0.08)",
            }}
          >
            {/* Pulsing dot */}
            <motion.div
              animate={
                shouldReduceMotion
                  ? {}
                  : { scale: [1, 1.6, 1], opacity: [1, 0.35, 1] }
              }
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ display: "flex" }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor: "#22c55e",
                  boxShadow: "0 0 6px #22c55e88",
                }}
              />
            </motion.div>
            <Typography
              sx={{
                fontSize: "0.8rem",
                fontWeight: 500,
                letterSpacing: "0.02em",
                color: "text.secondary",
              }}
            >
              Open to opportunities
            </Typography>
          </Box>
        </motion.div>

        {/* ── Name — word-by-word stagger ───────────────────────────────── */}
        <motion.div variants={containerVariants} initial="hidden" animate="show">
          <Box
            sx={{
              display: "flex",
              gap: { xs: 1.5, md: 2.5 },
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {NAME_WORDS.map((word) => (
              <motion.div key={word} variants={wordVariants}>
                <Typography variant="h1" color="text.primary">
                  {word}
                </Typography>
              </motion.div>
            ))}
          </Box>
        </motion.div>

        {/* ── Role — gradient shimmer ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
        >
          <Typography
            variant="h5"
            sx={{
              background:
                "linear-gradient(90deg, #6366F1 0%, #06B6D4 35%, #818CF8 65%, #6366F1 100%)",
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: shouldReduceMotion
                ? "none"
                : "shimmer 3.5s linear infinite",
              "@keyframes shimmer": {
                "0%": { backgroundPosition: "200% center" },
                "100%": { backgroundPosition: "-200% center" },
              },
            }}
          >
            {ROLE_TEXT}
          </Typography>
        </motion.div>

        {/* ── Social buttons — magnetic ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
        >
          <Stack
            ref={socialButtonsRef}
            direction="row"
            spacing={3}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onMouseUp={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
            sx={{ cursor: "default", padding: 1, borderRadius: 2 }}
          >
            <MagneticButton
              onClick={(e) => handleSocialClick("https://github.com/Jarnbjorn92", e)}
              onMouseDown={(e) => e.stopPropagation()}
              onMouseUp={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
            >
              <UseAnimations
                animation={github}
                size={56}
                strokeColor={theme.palette.primary.main}
                autoplay={true}
                loop={true}
              />
            </MagneticButton>

            <MagneticButton
              onClick={(e) =>
                handleSocialClick(
                  "https://www.linkedin.com/in/connor-j-fleming/",
                  e
                )
              }
              onMouseDown={(e) => e.stopPropagation()}
              onMouseUp={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
            >
              <UseAnimations
                animation={linkedin}
                size={56}
                strokeColor={theme.palette.primary.main}
                autoplay={true}
                loop={true}
              />
            </MagneticButton>
          </Stack>
        </motion.div>

        {/* ── Scroll indicator — animated SVG ──────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            <motion.svg
              width="24"
              height="38"
              viewBox="0 0 24 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              animate={shouldReduceMotion ? {} : { y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Mouse outline — draws itself in */}
              <motion.rect
                x="1.5"
                y="1.5"
                width="21"
                height="35"
                rx="10.5"
                stroke={theme.palette.text.secondary}
                strokeOpacity="0.4"
                strokeWidth="1.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  pathLength: { delay: 1.5, duration: 1.4, ease: "easeInOut" },
                  opacity: { delay: 1.5, duration: 0.3 },
                }}
              />
              {/* Scroll dot — bounces inside */}
              <motion.circle
                cx="12"
                cy="10"
                r="3"
                fill={theme.palette.primary.main}
                initial={{ opacity: 0 }}
                animate={
                  shouldReduceMotion
                    ? { opacity: 0.7 }
                    : { cy: [10, 24, 10], opacity: [0.7, 0.15, 0.7] }
                }
                transition={{
                  cy: {
                    delay: 2.2,
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  opacity: {
                    delay: 2.2,
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              />
            </motion.svg>
            <Typography variant="caption" color="text.secondary">
              Click anywhere or scroll to enter
            </Typography>
          </Box>
        </motion.div>
      </Stack>
    </Transition>
  );
};

export default Home;
