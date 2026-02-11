import React, { useEffect, useState, useRef } from "react";
import { Stack, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UseAnimations from "react-useanimations";
import github from "react-useanimations/lib/github";
import linkedin from "react-useanimations/lib/linkedin";
import { useTheme } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ParticleBackground from "../components/ParticleBackground";
import * as THREE from "three";
import Transition from "../components/Transition";
import { motion } from "framer-motion";

interface HomeProps {
  darkMode: boolean;
}

// Custom hook for typewriter effect
const useTypewriter = (text: any, delay = 100, startDelay = 0) => {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout: any;

    if (startDelay > 0) {
      timeout = setTimeout(() => {
        setIsTyping(true);
      }, startDelay);
      return () => clearTimeout(timeout);
    }

    if (isTyping && displayText.length < text.length) {
      timeout = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length + 1));
      }, delay);
    } else if (displayText.length === text.length) {
      setIsTyping(false);
    }

    return () => clearTimeout(timeout);
  }, [displayText, delay, text, isTyping, startDelay]);

  return displayText;
};

const Home: React.FC<HomeProps> = ({ darkMode }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const color = new THREE.Color(0x6366f1);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const socialButtonsRef = useRef<HTMLDivElement>(null);
  const nameText = useTypewriter("Connor Fleming", 100, 0);
  const roleText = useTypewriter("Full-Stack Software Developer", 100, 0);

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
      <ParticleBackground color={color} />
      <Stack
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
          overflow: "hidden",
          cursor: "pointer",
        }}
        spacing={3}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
        >
          <Typography
            variant="h1"
            color="text.primary"
          >
            {nameText}
          </Typography>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
        >
          <Typography variant="h5" color="text.primary">
            {roleText}
          </Typography>
        </motion.div>
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
            sx={{
              cursor: "default",
              padding: 1,
              borderRadius: 2,
            }}
          >
            <Button
              sx={{
                borderRadius: "50%",
                minWidth: 0,
                width: 64,
                height: 64,
                border: "1px solid rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(8px)",
                "&:hover": {
                  backgroundColor: "rgba(99, 102, 241, 0.1)",
                  borderColor: "#6366F1",
                  boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)",
                },
              }}
              onClick={(e) =>
                handleSocialClick("https://github.com/Jarnbjorn92", e)
              }
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
            </Button>
            <Button
              sx={{
                borderRadius: "50%",
                minWidth: 0,
                width: 64,
                height: 64,
                border: "1px solid rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(8px)",
                "&:hover": {
                  backgroundColor: "rgba(99, 102, 241, 0.1)",
                  borderColor: "#6366F1",
                  boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)",
                },
              }}
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
            </Button>
          </Stack>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <KeyboardArrowDownIcon sx={{ color: "text.secondary", fontSize: 28 }} />
            </motion.div>
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
