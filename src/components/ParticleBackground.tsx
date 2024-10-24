import React, { useRef, useEffect, useCallback } from "react";
import * as THREE from "three";
import { useTheme } from "@mui/material";

interface ParticleBackgroundProps {
  color: THREE.Color;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ color }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const pointsRef = useRef<THREE.Points | null>(null);
  const materialRef = useRef<THREE.PointsMaterial | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const velocitiesRef = useRef<Float32Array | null>(null);
  const theme = useTheme();

  const createParticleTexture = useCallback((isDark: boolean) => {
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(
        0,
        isDark ? "rgba(255,255,255,1)" : "rgba(0,0,0,1)"
      );
      gradient.addColorStop(
        1,
        isDark ? "rgba(255,255,255,0)" : "rgba(0,0,0,0)"
      );
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
    }
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  const animate = useCallback((time: number) => {
    const deltaTime = Math.min(time - lastTimeRef.current, 50);
    lastTimeRef.current = time;

    if (pointsRef.current && velocitiesRef.current) {
      const positions = pointsRef.current.geometry.attributes.position
        .array as Float32Array;
      const velocities = velocitiesRef.current;

      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += velocities[i] * deltaTime * 0.06;
        positions[i + 1] += velocities[i + 1] * deltaTime * 0.06;
        positions[i + 2] += velocities[i + 2] * deltaTime * 0.06;

        if (positions[i] < -5) positions[i] = 5;
        if (positions[i] > 5) positions[i] = -5;
        if (positions[i + 1] < -5) positions[i + 1] = 5;
        if (positions[i + 1] > 5) positions[i + 1] = -5;
        if (positions[i + 2] < -5) positions[i + 2] = 5;
        if (positions[i + 2] > 5) positions[i + 2] = -5;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }

    if (rendererRef.current && sceneRef.current && cameraRef.current) {
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }

    animationFrameId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;

    const mountNode = mountRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      powerPreference: "high-performance",
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountNode.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const particles = 3000;
    const positions = new Float32Array(particles * 3);
    const velocities = new Float32Array(particles * 3);

    for (let i = 0; i < particles * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 10;

      velocities[i] = (Math.random() - 0.5) * 0.01;
      velocities[i + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i + 2] = (Math.random() - 0.5) * 0.01;
    }

    velocitiesRef.current = velocities;
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const isDark = theme.palette.mode === "dark";
    const texture = createParticleTexture(isDark);

    const material = new THREE.PointsMaterial({
      color,
      size: isDark ? 0.1 : 0.15, // Increased light mode size from 0.08 to 0.15
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: isDark ? 1 : 0.5, // Reduced light mode opacity to compensate for larger size
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    camera.position.z = 5;

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;
    pointsRef.current = points;
    materialRef.current = material;

    animate(0);

    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      mountNode.removeChild(renderer.domElement);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (materialRef.current && rendererRef.current) {
      const isDark = theme.palette.mode === "dark";

      materialRef.current.map?.dispose();
      materialRef.current.map = createParticleTexture(isDark);

      // Updated size and opacity values
      materialRef.current.size = isDark ? 0.1 : 0.15; // Increased light mode size
      materialRef.current.opacity = isDark ? 1 : 0.5; // Adjusted light mode opacity
      materialRef.current.color = color;

      rendererRef.current.setClearColor(isDark ? 0x000000 : 0xffffff, 0);
    }
  }, [theme.palette.mode, color, createParticleTexture]);

  return (
    <div
      ref={mountRef}
      style={{ position: "fixed", top: 0, left: 0, zIndex: -1 }}
    />
  );
};

export default ParticleBackground;
