import React, { useEffect, useState, useRef } from "react";
import { Stack, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UseAnimations from "react-useanimations";
import github from "react-useanimations/lib/github";
import linkedin from "react-useanimations/lib/linkedin";
import { useTheme } from "@mui/material/styles";
import ParticleBackground from "../components/ParticleBackground";
import * as THREE from "three";
import Transition from "../components/Transition";

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
  const color = new THREE.Color(0x0077ff);
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
        <Typography variant="h2">{nameText}</Typography>
        <Typography variant="h5">{roleText}</Typography>
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
              borderRadius: 15,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
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
              borderRadius: 15,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
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
        <Typography variant="body2" color="textSecondary">
          Click anywhere or scroll to enter
        </Typography>
      </Stack>
    </Transition>
  );
};

export default Home;
