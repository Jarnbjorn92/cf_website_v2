import React from "react";
import { motion } from "framer-motion";

interface TransitionProps {
  children: React.ReactNode;
}

const Transition: React.FC<TransitionProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }}
    >
      {children}
    </motion.div>
  );
};

export default Transition;
