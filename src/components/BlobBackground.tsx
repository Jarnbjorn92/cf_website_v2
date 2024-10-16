import React, { useEffect } from "react";
import "../styles/BlobBackground.css";

interface BlobBackgroundProps {
  darkMode: boolean;
}

const BlobBackground: React.FC<BlobBackgroundProps> = ({ darkMode }) => {
  useEffect(() => {
    const createBlob = () => {
      const blob = document.createElement("div");
      blob.className = "blob";
      const size = 50 + Math.random() * 250; // Random size between 50px and 150px
      blob.style.width = `${size}px`;
      blob.style.height = `${size}px`;
      blob.style.left = `${Math.random() * 100}%`;
      blob.style.background = darkMode
        ? "rgba(144, 202, 249, 0.6)"
        : "rgba(255, 165, 0, 0.6)"; // Change color based on dark mode
      blob.style.animationDuration = `${10 + Math.random() * 10}s`; // Random duration for varied animation speeds
      document.body.appendChild(blob);

      setTimeout(() => {
        blob.remove();
      }, 15000); // Remove blob after 15 seconds
    };

    const interval = setInterval(createBlob, 1000); // Create a blob every second

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [darkMode]);

  return null; // This component does not render anything directly
};

export default BlobBackground;
