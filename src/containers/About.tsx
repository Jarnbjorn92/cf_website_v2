import React, { useRef, useCallback } from "react";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Avatar,
} from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import CloudIcon from "@mui/icons-material/Cloud";
import StorageIcon from "@mui/icons-material/Storage";
import BuildIcon from "@mui/icons-material/Build";
import { motion, useReducedMotion } from "framer-motion";
import Transition from "../components/Transition";
import profileImage from "../assets/me.jpeg";

const TIMELINE = [
  { year: "2023", label: "CodeClan Graduate", detail: "Intensive software dev bootcamp, Glasgow" },
  { year: "2023", label: "First Dev Role", detail: "Systems software developer building enterprise systems and mobile applications" },
  { year: "2025", label: "Jnr Full-Stack Developer", detail: "Cloud team full-stack development with IoT devices and ML data pipelines" },
  { year: "2026+", label: "Full-Stack Developer", detail: "Building and expanding on existing full-stack applications for network and IoT platforms" },
];

const SKILL_CATEGORIES = [
  {
    label: "Languages",
    icon: <CodeIcon fontSize="small" />,
    accent: "#6366F1",
    skills: ["TypeScript", "JavaScript", "Python", "Java"],
  },
  {
    label: "Frameworks",
    icon: <AccountTreeIcon fontSize="small" />,
    accent: "#06B6D4",
    skills: ["React", "Vue.js", "React Native", "Node.js", "Express", "Fastify", "Django", "Flutter", "Spring Boot", "Prisma"],
  },
  {
    label: "Cloud & DevOps",
    icon: <CloudIcon fontSize="small" />,
    accent: "#7C3AED",
    skills: ["AWS", "Azure", "Docker", "Kubernetes", "Firebase", "Balena"],
  },
  {
    label: "Data",
    icon: <StorageIcon fontSize="small" />,
    accent: "#0891B2",
    skills: ["MySQL", "PostgreSQL", "MongoDB", "MariaDB", "Redis", "Kafka"],
  },
  {
    label: "Tools",
    icon: <BuildIcon fontSize="small" />,
    accent: "#818CF8",
    skills: ["Git", "CI/CD", "Agile/Scrum", "Jira", "Figma", "Jest", "Cypress", "REST APIs", "WebSockets"],
  },
];

const ALL_SKILLS = SKILL_CATEGORIES.flatMap((c) => c.skills);
const MARQUEE_A = [...ALL_SKILLS, ...ALL_SKILLS];
const MARQUEE_B = [...ALL_SKILLS].reverse().concat([...ALL_SKILLS].reverse());

const BIO_PARAS = [
  "Hello! I'm a Full-Stack Software Developer based in Scotland with a journey from art and design to building production systems for a wide range of platforms. I've developed applications serving real-time management data, created sophisticated KPI and CRM dashboards, and integrated cloud-based systems using a wide variety of programming languages and modern frameworks.",
  "My design background influences how I approach development — I believe the best applications balance technical robustness with genuine usability. Currently I'm expanding my knowledge into AI/ML, while sharpening my current skill with personal projects that combine my full-stack expertise with popular and emerging technologies.",
];

const SkillPill: React.FC<{ label: string; accent: string }> = ({ label, accent }) => (
  <Box
    component="span"
    sx={{
      display: "inline-block",
      px: 1.25,
      py: 0.4,
      borderRadius: 99,
      fontSize: "0.775rem",
      fontWeight: 500,
      letterSpacing: "0.01em",
      background: `${accent}18`,
      border: `1px solid ${accent}45`,
      color: accent,
      lineHeight: 1.6,
      whiteSpace: "nowrap",
    }}
  >
    {label}
  </Box>
);

const SkillCard: React.FC<{
  category: (typeof SKILL_CATEGORIES)[0];
  index: number;
  shouldReduce: boolean;
  isDark: boolean;
}> = ({ category, index, shouldReduce, isDark }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    cardRef.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    cardRef.current?.style.setProperty("--mx", "50%");
    cardRef.current?.style.setProperty("--my", "50%");
  }, []);

  return (
    <motion.div
      initial={shouldReduce ? { opacity: 1 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ height: "100%" }}
    >
      <Box
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        sx={{
          position: "relative",
          height: "100%",
          p: 2.5,
          borderRadius: 2.5,
          overflow: "hidden",
          background: isDark ? "rgba(24,24,27,0.8)" : "rgba(255,255,255,0.8)",
          backdropFilter: "blur(12px)",
          border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
          transition: "border-color 250ms ease, box-shadow 250ms ease",
          "&:hover": {
            borderColor: `${category.accent}50`,
            boxShadow: `0 0 32px ${category.accent}18`,
          },
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            pointerEvents: "none",
            background: `radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), ${category.accent}12, transparent 60%)`,
            opacity: 0,
            transition: "opacity 300ms ease",
          },
          "&:hover::before": { opacity: 1 },
          "&:hover .accent-bar": { opacity: 1 },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              borderRadius: 1.5,
              background: `${category.accent}20`,
              color: category.accent,
              flexShrink: 0,
            }}
          >
            {category.icon}
          </Box>
          <Typography
            sx={{
              fontSize: "0.78rem",
              fontWeight: 600,
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              color: category.accent,
            }}
          >
            {category.label}
          </Typography>
        </Box>

        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
        >
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
            {category.skills.map((skill) => (
              <motion.div
                key={skill}
                variants={
                  shouldReduce
                    ? {}
                    : { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }
                }
              >
                <SkillPill label={skill} accent={category.accent} />
              </motion.div>
            ))}
          </Box>
        </motion.div>

        <Box
          aria-hidden="true"
          className="accent-bar"
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 2,
            background: `linear-gradient(90deg, ${category.accent}00, ${category.accent}80, ${category.accent}00)`,
            opacity: 0,
            transition: "opacity 250ms ease",
          }}
        />
      </Box>
    </motion.div>
  );
};

const MarqueeRow: React.FC<{
  items: string[];
  reverse?: boolean;
  shouldReduce: boolean;
  isDark: boolean;
}> = ({ items, reverse = false, shouldReduce, isDark }) => (
  <Box
    sx={{
      overflow: "hidden",
      maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
      WebkitMaskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
    }}
  >
    <Box
      sx={{
        display: "flex",
        gap: 1.5,
        width: "max-content",
        animation: shouldReduce
          ? "none"
          : `${reverse ? "marquee-right" : "marquee-left"} 40s linear infinite`,
        "&:hover": { animationPlayState: "paused" },
        "@keyframes marquee-left": {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(-50%)" },
        },
        "@keyframes marquee-right": {
          from: { transform: "translateX(-50%)" },
          to:   { transform: "translateX(0)" },
        },
      }}
    >
      {items.map((skill, i) => (
        <Box
          key={`${skill}-${i}`}
          component="span"
          sx={{
            px: 1.75,
            py: 0.6,
            borderRadius: 99,
            fontSize: "0.8rem",
            fontWeight: 500,
            whiteSpace: "nowrap",
            background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
            border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
            color: "text.secondary",
          }}
        >
          {skill}
        </Box>
      ))}
    </Box>
  </Box>
);

const About: React.FC = () => {
  const theme = useTheme();
  const isMobile  = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet  = useMediaQuery(theme.breakpoints.down("lg"));
  const shouldReduce = useReducedMotion();
  const isDark = theme.palette.mode === "dark";

  return (
    <Transition>
      <Box
        sx={{
          minHeight: "100vh",
          py: { xs: 10, md: 8 },
          px: { xs: 2, md: 4 },
          maxWidth: 1200,
          mx: "auto",
        }}
      >
        {/* Bio + Avatar */}
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: { xs: 4, md: 6 },
            alignItems: isMobile ? "center" : "flex-start",
            mb: 8,
          }}
        >
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h2" sx={{ mb: 3 }}>About Me</Typography>
            </motion.div>
            {BIO_PARAS.map((para, pi) => (
              <motion.div
                key={pi}
                initial={shouldReduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: pi * 0.15, duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2, lineHeight: 1.8 }}>
                  {para}
                </Typography>
              </motion.div>
            ))}
          </Box>

          <Box sx={{ flexShrink: 0, position: "relative", width: isMobile ? 200 : 260, height: isMobile ? 200 : 260 }}>
            <Box
              aria-hidden="true"
              sx={{
                position: "absolute",
                inset: -6,
                borderRadius: "50%",
                background: "conic-gradient(from 0deg, #6366F1, #7C3AED, #06B6D4, #818CF8, #6366F1)",
                animation: shouldReduce ? "none" : "halo-spin 4s linear infinite",
                "@keyframes halo-spin": { from: { transform: "rotate(0deg)" }, to: { transform: "rotate(360deg)" } },
              }}
            />
            <Box aria-hidden="true" sx={{ position: "absolute", inset: -2, borderRadius: "50%", background: isDark ? "#09090B" : "#FAFAFA" }} />
            <Avatar alt="Connor Fleming" src={profileImage} sx={{ position: "relative", width: "100%", height: "100%" }} />
          </Box>
        </Box>

        {/* Journey */}
        <motion.div
          initial={shouldReduce ? { opacity: 1 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h3" sx={{ mb: 4 }}>Journey</Typography>
        </motion.div>

        <Box sx={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 2, mb: 10 }}>
          {TIMELINE.map((item, i) => (
            <motion.div
              key={item.year}
              initial={shouldReduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: 2,
                  height: "100%",
                  background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
                  border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
                  borderTop: "3px solid #6366F1",
                  transition: "border-color 200ms ease, transform 200ms ease",
                  "&:hover": { borderTopColor: "#06B6D4", transform: "translateY(-2px)" },
                }}
              >
                <Typography variant="caption" sx={{ color: "primary.main", display: "block", mb: 0.5 }}>{item.year}</Typography>
                <Typography variant="h6" sx={{ fontSize: "0.95rem", mb: 0.5 }}>{item.label}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem" }}>{item.detail}</Typography>
              </Box>
            </motion.div>
          ))}
        </Box>

        {/* Skills */}
        <motion.div
          initial={shouldReduce ? { opacity: 1 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h3" sx={{ mb: 0.5 }}>Skills</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>Technologies and tools I work with</Typography>
        </motion.div>

        {/* Dual scrolling marquee */}
        <motion.div
          initial={shouldReduce ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ mb: 4, display: "flex", flexDirection: "column", gap: 1.25 }}>
            <MarqueeRow items={MARQUEE_A} shouldReduce={!!shouldReduce} isDark={isDark} />
            <MarqueeRow items={MARQUEE_B} reverse shouldReduce={!!shouldReduce} isDark={isDark} />
          </Box>
        </motion.div>

        {/* Bento skill grid */}
        <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "1fr 2fr" }}>
          {SKILL_CATEGORIES.slice(0, 2).map((cat, i) => (
            <SkillCard key={cat.label} category={cat} index={i} shouldReduce={!!shouldReduce} isDark={isDark} />
          ))}
          <Box
            sx={{
              gridColumn: isMobile ? "auto" : isTablet ? "auto" : "1 / -1",
              display: "grid",
              gap: 2,
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            }}
          >
            {SKILL_CATEGORIES.slice(2).map((cat, i) => (
              <SkillCard key={cat.label} category={cat} index={i + 2} shouldReduce={!!shouldReduce} isDark={isDark} />
            ))}
          </Box>
        </Box>
      </Box>
    </Transition>
  );
};

export default About;
