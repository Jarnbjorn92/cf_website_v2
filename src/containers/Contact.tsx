import React, { useState } from "react";
import { Box, Typography, Button, Stack, useTheme, useMediaQuery } from "@mui/material";
import { CloudDownload, Send, Check, LocationOn, Schedule } from "@mui/icons-material";
import UseAnimations from "react-useanimations";
import github from "react-useanimations/lib/github";
import linkedin from "react-useanimations/lib/linkedin";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useSnackbar } from "notistack";
import Transition from "../components/Transition";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

type SubmitState = "idle" | "loading" | "success" | "error";

// ─── Floating label input ─────────────────────────────────────────────────────

const FloatingInput: React.FC<{
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  error?: boolean;
}> = ({ label, name, type = "text", value, onChange, required, multiline, rows = 4, error }) => {
  const [focused, setFocused] = useState(false);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const lifted = focused || value.length > 0;

  const borderColor = error
    ? "#EF4444"
    : focused
      ? "#6366F1"
      : isDark
        ? "rgba(255,255,255,0.10)"
        : "rgba(0,0,0,0.10)";

  const boxShadow = error
    ? "0 0 0 3px rgba(239,68,68,0.15)"
    : focused
      ? "0 0 0 3px rgba(99,102,241,0.15)"
      : "none";

  return (
    <Box sx={{ position: "relative" }}>
      <Typography
        component="label"
        htmlFor={name}
        sx={{
          position: "absolute",
          left: 14,
          top: lifted ? -10 : multiline ? 16 : "50%",
          transform: lifted ? "none" : multiline ? "none" : "translateY(-50%)",
          fontSize: lifted ? "0.72rem" : "0.9rem",
          fontWeight: lifted ? 500 : 400,
          color: error ? "#EF4444" : focused ? "primary.main" : "text.secondary",
          background: lifted ? (isDark ? "rgba(18,18,22,1)" : "#fff") : "transparent",
          px: lifted ? 0.5 : 0,
          transition: "all 150ms ease",
          pointerEvents: "none",
          zIndex: 1,
          lineHeight: 1,
        }}
      >
        {label}
        {required && (
          <Box component="span" sx={{ color: "error.main", ml: 0.25 }}>
            *
          </Box>
        )}
      </Typography>

      <Box
        id={name}
        component={multiline ? "textarea" : "input"}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        rows={multiline ? rows : undefined}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        sx={{
          width: "100%",
          px: 1.75,
          pt: multiline ? 2 : 0,
          pb: multiline ? 1.5 : 0,
          height: multiline ? "auto" : 52,
          minHeight: multiline ? 130 : 52,
          borderRadius: 2,
          border: `1.5px solid ${borderColor}`,
          boxShadow,
          background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
          color: "text.primary",
          fontFamily: "inherit",
          fontSize: "0.9rem",
          lineHeight: 1.6,
          resize: multiline ? "vertical" : "none",
          outline: "none",
          boxSizing: "border-box",
          transition: "border-color 150ms ease, box-shadow 150ms ease",
          "&::placeholder": { color: "transparent" },
          "&:focus-visible": { outline: "none" },
        }}
      />

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <Typography
              sx={{
                fontSize: "0.72rem",
                color: "error.main",
                mt: 0.5,
                ml: 0.5,
              }}
            >
              This field is required
            </Typography>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

// ─── Submit button ────────────────────────────────────────────────────────────

const SubmitButton: React.FC<{ state: SubmitState; shouldReduce: boolean }> = ({
  state,
  shouldReduce,
}) => {
  const configs: Record<SubmitState, { label: string; icon: React.ReactNode; bg: string }> = {
    idle: {
      label: "Send Message",
      icon: <Send fontSize="small" />,
      bg: "#6366F1",
    },
    loading: { label: "Sending…", icon: null, bg: "#4F46E5" },
    success: {
      label: "Sent!",
      icon: <Check fontSize="small" />,
      bg: "#22c55e",
    },
    error: {
      label: "Try Again",
      icon: <Send fontSize="small" />,
      bg: "#EF4444",
    },
  };
  const cfg = configs[state];

  return (
    <motion.button
      type="submit"
      disabled={state === "loading" || state === "success"}
      animate={state === "error" && !shouldReduce ? { x: [0, -8, 8, -6, 6, -4, 4, 0] } : { x: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        width: "100%",
        minHeight: 52,
        border: "none",
        borderRadius: 10,
        cursor: state === "loading" || state === "success" ? "not-allowed" : "pointer",
        background: cfg.bg,
        color: "#fff",
        fontFamily: "inherit",
        fontSize: "0.9rem",
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        transition: "background 300ms ease, transform 150ms ease, box-shadow 150ms ease",
        opacity: state === "loading" ? 0.8 : 1,
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={state}
          initial={shouldReduce ? { opacity: 1 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
          style={{ display: "flex", alignItems: "center", gap: 6 }}
        >
          {state === "loading" ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                border: "2px solid rgba(255,255,255,0.3)",
                borderTopColor: "#fff",
              }}
            />
          ) : (
            cfg.icon
          )}
          {cfg.label}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
};

// ─── Contact ──────────────────────────────────────────────────────────────────

const SOCIAL_LINKS = [
  { url: "https://github.com/Jarnbjorn92", anim: github, label: "GitHub" },
  {
    url: "https://www.linkedin.com/in/connor-j-fleming/",
    anim: linkedin,
    label: "LinkedIn",
  },
];

const Contact: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { enqueueSnackbar } = useSnackbar();
  const shouldReduce = useReducedMotion();
  const isDark = theme.palette.mode === "dark";

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};
    if (!formData.name.trim()) newErrors.name = "required";
    if (!formData.email.trim()) newErrors.email = "required";
    if (!formData.message.trim()) newErrors.message = "required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setSubmitState("error");
      setTimeout(() => setSubmitState("idle"), 1500);
      return;
    }
    setSubmitState("loading");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.REACT_APP_WEB3FORMS_ACCESS_KEY,
          ...formData,
        }),
      });
      if (response.ok) {
        setSubmitState("success");
        setFormData({ name: "", email: "", message: "" });
        enqueueSnackbar("Thank you! Your message has been sent.", {
          variant: "success",
        });
        setTimeout(() => setSubmitState("idle"), 3000);
      } else {
        throw new Error("Failed");
      }
    } catch {
      setSubmitState("error");
      enqueueSnackbar("Oops! Something went wrong. Please try again.", {
        variant: "error",
      });
      setTimeout(() => setSubmitState("idle"), 1500);
    }
  };

  return (
    <Transition>
      {/* Aurora background */}
      <Box
        aria-hidden="true"
        sx={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background: isDark
            ? `radial-gradient(ellipse at 15% 65%, rgba(99,102,241,0.18) 0%, transparent 50%),
               radial-gradient(ellipse at 85% 25%, rgba(6,182,212,0.12) 0%, transparent 48%),
               radial-gradient(ellipse at 55% 95%, rgba(124,58,237,0.10) 0%, transparent 45%)`
            : `radial-gradient(ellipse at 15% 65%, rgba(99,102,241,0.09) 0%, transparent 50%),
               radial-gradient(ellipse at 85% 25%, rgba(6,182,212,0.07) 0%, transparent 48%)`,
          animation: shouldReduce ? "none" : "aurora-drift 20s ease-in-out infinite alternate",
          "@keyframes aurora-drift": {
            "0%": { transform: "scale(1)", opacity: 0.8 },
            "50%": { transform: "scale(1.05)", opacity: 1 },
            "100%": { transform: "scale(0.97)", opacity: 0.9 },
          },
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: { xs: 10, md: 6 },
          px: { xs: 2, md: 4 },
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 1040,
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1.4fr",
            gap: { xs: 6, md: 8 },
            alignItems: "start",
          }}
        >
          {/* ── Left panel ─────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Box>
              {/* Availability badge */}
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  px: 1.75,
                  py: 0.75,
                  borderRadius: 99,
                  mb: 3,
                  background: isDark ? "rgba(34,197,94,0.1)" : "rgba(34,197,94,0.08)",
                  border: "1px solid rgba(34,197,94,0.25)",
                }}
              >
                <motion.div
                  animate={shouldReduce ? {} : { scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Box
                    sx={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      bgcolor: "#22c55e",
                      boxShadow: "0 0 6px #22c55e88",
                    }}
                  />
                </motion.div>
                <Typography
                  sx={{
                    fontSize: "0.78rem",
                    fontWeight: 500,
                    color: "#22c55e",
                  }}
                >
                  Open to opportunities
                </Typography>
              </Box>

              <Typography variant="h2" sx={{ mb: 2, lineHeight: 1.15 }}>
                Let's work
                <br />
                together
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 4, lineHeight: 1.8, maxWidth: 360 }}
              >
                Whether it's a full-time role, a freelance project, or just a conversation - I'd
                love to hear from you.
              </Typography>

              {/* Info rows */}
              <Stack spacing={2} sx={{ mb: 5 }}>
                {[
                  {
                    icon: <LocationOn fontSize="small" />,
                    text: "Scotland, UK",
                  },
                  {
                    icon: <Schedule fontSize="small" />,
                    text: "GMT / BST - flexible for remote",
                  },
                ].map(({ icon, text }) => (
                  <Box key={text} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 36,
                        height: 36,
                        borderRadius: 2,
                        background: isDark ? "rgba(99,102,241,0.12)" : "rgba(99,102,241,0.08)",
                        color: "primary.main",
                        flexShrink: 0,
                      }}
                    >
                      {icon}
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {text}
                    </Typography>
                  </Box>
                ))}
              </Stack>

              {/* Divider */}
              <Box
                sx={{
                  height: "1px",
                  bgcolor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
                  mb: 4,
                }}
              />

              {/* Social icons */}
              <Typography
                sx={{
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "text.disabled",
                  mb: 2,
                }}
              >
                Find me on
              </Typography>
              <Stack direction="row" spacing={2}>
                {SOCIAL_LINKS.map(({ url, anim, label }) => (
                  <motion.div
                    key={label}
                    whileHover={shouldReduce ? {} : { y: -3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <Button
                      component="a"
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      sx={{
                        borderRadius: 3,
                        minWidth: 0,
                        width: 72,
                        height: 72,
                        flexDirection: "column",
                        gap: 0.5,
                        border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
                        background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
                        backdropFilter: "blur(8px)",
                        transition:
                          "border-color 200ms ease, box-shadow 200ms ease, background 200ms ease",
                        "&:hover": {
                          borderColor: "#6366F1",
                          background: isDark ? "rgba(99,102,241,0.08)" : "rgba(99,102,241,0.05)",
                          boxShadow: "0 0 20px rgba(99,102,241,0.25)",
                        },
                      }}
                    >
                      <UseAnimations
                        animation={anim}
                        size={44}
                        strokeColor={theme.palette.primary.main}
                        autoplay
                        loop
                      />
                      <Typography
                        sx={{
                          fontSize: "0.65rem",
                          fontWeight: 500,
                          color: "text.secondary",
                          lineHeight: 1,
                        }}
                      >
                        {label}
                      </Typography>
                    </Button>
                  </motion.div>
                ))}
              </Stack>

              {/* CV download */}
              <Box sx={{ mt: 4 }}>
                <Button
                  variant="outlined"
                  startIcon={<CloudDownload />}
                  onClick={() => window.open("/connor_fleming_fullstack_cv.pdf", "_blank")}
                  sx={{
                    minHeight: 44,
                    px: 2.5,
                    borderRadius: 2,
                    borderColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)",
                    color: "text.secondary",
                    "&:hover": {
                      borderColor: "primary.main",
                      color: "primary.main",
                      background: "rgba(99,102,241,0.05)",
                    },
                  }}
                >
                  Download CV
                </Button>
              </Box>
            </Box>
          </motion.div>

          {/* ── Right panel — form ──────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.55,
              delay: 0.1,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {/* Gradient border wrapper */}
            <Box
              sx={{
                position: "relative",
                borderRadius: 3,
                p: "1.5px",
                background: isDark
                  ? "linear-gradient(135deg, rgba(99,102,241,0.4) 0%, rgba(6,182,212,0.2) 50%, rgba(124,58,237,0.3) 100%)"
                  : "linear-gradient(135deg, rgba(99,102,241,0.25) 0%, rgba(6,182,212,0.15) 50%, rgba(124,58,237,0.2) 100%)",
              }}
            >
              <Box
                sx={{
                  borderRadius: "calc(12px - 1.5px)",
                  p: { xs: 3, md: 4 },
                  background: isDark ? "rgba(12,12,16,0.95)" : "rgba(255,255,255,0.96)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <Typography variant="h5" sx={{ mb: 0.5, fontWeight: 700 }}>
                  Send a message
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3.5 }}>
                  I typically reply within 24 hours.
                </Typography>

                <form onSubmit={handleSubmit} noValidate>
                  <Stack spacing={3}>
                    <FloatingInput
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      error={!!errors.name}
                    />
                    <FloatingInput
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      error={!!errors.email}
                    />
                    <FloatingInput
                      label="Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      multiline
                      rows={5}
                      error={!!errors.message}
                    />
                    <SubmitButton state={submitState} shouldReduce={!!shouldReduce} />
                  </Stack>
                </form>
              </Box>
            </Box>
          </motion.div>
        </Box>
      </Box>
    </Transition>
  );
};

export default Contact;
