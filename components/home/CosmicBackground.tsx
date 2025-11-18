"use client";

import { useEffect, useRef, useState } from "react";

type Star = {
  x: number;
  y: number;
  baseRadius: number;
  twinkleSpeed: number;
  phase: number;
};

const STAR_DENSITY = 0.00012;
const MIN_STARS = 60;

export default function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const starsRef = useRef<Star[]>([]);
  const sizeRef = useRef({ width: 0, height: 0 });
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof document === "undefined") return false;
    return document.documentElement.classList.contains("dark");
  });

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;

    const updateMode = () => {
      setIsDarkMode(root.classList.contains("dark"));
    };

    const observer = new MutationObserver(() => updateMode());
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    updateMode();

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cleanup = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    if (!isDarkMode) {
      cleanup();
      return;
    }

    const createStars = () => {
      const { width, height } = sizeRef.current;
      const area = width * height;
      const count = Math.max(MIN_STARS, Math.floor(area * STAR_DENSITY));
      starsRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        baseRadius: 0.5 + Math.random() * 1.5,
        twinkleSpeed: 1.8 + Math.random() * 2.2,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = "100vw";
      canvas.style.height = "100vh";

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      sizeRef.current = { width, height };
      createStars();
    };

    const draw = (timestamp: number) => {
      const { width, height } = sizeRef.current;
      ctx.clearRect(0, 0, width, height);
      const time = timestamp / 600;

      for (const star of starsRef.current) {
        const twinkle = (Math.sin(time * star.twinkleSpeed + star.phase) + 1) / 2;
        const radius = star.baseRadius * (0.75 + twinkle * 0.5);
        const opacity = 0.4 + twinkle * 0.6;

        ctx.globalAlpha = opacity;
        ctx.beginPath();
        ctx.arc(star.x, star.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(draw);
    };

    resize();
    animationRef.current = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    return () => {
      cleanup();
      window.removeEventListener("resize", resize);
    };
  }, [isDarkMode]);

  return (
    <div
      className={`pointer-events-none fixed left-0 top-0 w-screen h-screen overflow-hidden transition-opacity duration-500 -z-10 ${
        isDarkMode ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
