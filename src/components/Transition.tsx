import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface TransitionProps {
  children: React.ReactNode;
}

const Transition: React.FC<TransitionProps> = ({ children }) => {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduce ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 8% 0)" }}
      animate={shouldReduce ? { opacity: 1 } : { opacity: 1, clipPath: "inset(0 0 0% 0)" }}
      exit={shouldReduce ? { opacity: 0 } : { opacity: 0, clipPath: "inset(8% 0 0 0)" }}
      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default Transition;
