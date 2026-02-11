import React from "react";
import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
import About from "./About";
import Portfolio from "./Portfolio";
import Contact from "./Contact";
import Footer from "../components/Footer";
import ParticleBackground from "../components/ParticleBackground";
import Transition from "../components/Transition";
import * as THREE from "three";
import { motion } from "framer-motion";

const GradientDivider = () => (
  <Box
    sx={{
      height: "3px",
      width: "100%",
      maxWidth: "80vw",
      mx: "auto",
      my: { xs: 6, md: 10 },
      background:
        "linear-gradient(90deg, transparent, #6366F1, #06B6D4, transparent)",
    }}
  />
);

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const LandingPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const color = new THREE.Color(0x6366f1);

  return (
    <Transition>
      <ParticleBackground color={color} />
      <Container
        maxWidth="lg"
        sx={{
          py: isMobile ? 4 : 8,
          px: isMobile ? 2 : 4,
        }}
      >
        <motion.div
          id="about"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
          style={{ marginTop: isMobile ? "4rem" : "6rem" }}
        >
          <About />
        </motion.div>
        <GradientDivider />
        <motion.div
          id="portfolio"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
        >
          <Portfolio />
        </motion.div>
        <GradientDivider />
        <motion.div
          id="contact"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
        >
          <Contact />
        </motion.div>
        <Footer />
      </Container>
    </Transition>
  );
};

export default LandingPage;
