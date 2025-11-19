"use client";

import { useEffect, useRef, useState } from "react";

type Star = {
  x: number;
  y: number;
  baseRadius: number;
  twinkleSpeed: number;
  phase: number;
};

type ShootingStar = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  length: number;
};

const STAR_DENSITY = 0.00012;
const MIN_STARS = 60;

export default function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const starsRef = useRef<Star[]>([]);
  const meteorsRef = useRef<ShootingStar[]>([]);
  const sizeRef = useRef({ width: 0, height: 0 });
  const lastFrameRef = useRef(0);
  const meteorTimerRef = useRef(0);
  const meteorIntervalRef = useRef(3);
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
      meteorsRef.current = [];
      meteorTimerRef.current = 0;
      meteorIntervalRef.current = 3;
      lastFrameRef.current = 0;
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

    const spawnMeteor = () => {
      const { width } = sizeRef.current;
      const startX = width * 0.4 + Math.random() * width * 0.4;
      const speed = 600 + Math.random() * 300;
      const angle = (35 + Math.random() * 8) * (Math.PI / 180);
      meteorsRef.current.push({
        x: startX,
        y: -40,
        vx: -Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 1.8 + Math.random() * 1.2,
        length: 120 + Math.random() * 80,
      });
      meteorIntervalRef.current = 2 + Math.random() * 3;
      meteorTimerRef.current = 0;
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
      const delta =
        lastFrameRef.current === 0
          ? 0
          : (timestamp - lastFrameRef.current) / 1000;
      lastFrameRef.current = timestamp;

      meteorTimerRef.current += delta;
      if (meteorTimerRef.current > meteorIntervalRef.current) {
        spawnMeteor();
      }

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

      ctx.globalCompositeOperation = "lighter";
      meteorsRef.current = meteorsRef.current.filter((meteor) => {
        meteor.life += delta;
        meteor.x += meteor.vx * delta;
        meteor.y += meteor.vy * delta;

        const angle = Math.atan2(meteor.vy, meteor.vx);
        const tailX = meteor.x - Math.cos(angle) * meteor.length;
        const tailY = meteor.y - Math.sin(angle) * meteor.length;

        const gradient = ctx.createLinearGradient(
          meteor.x,
          meteor.y,
          tailX,
          tailY
        );
        gradient.addColorStop(0, "rgba(255,255,255,0.9)");
        gradient.addColorStop(1, "rgba(255,255,255,0)");

        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = gradient;
        ctx.moveTo(meteor.x, meteor.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        return (
          meteor.life < meteor.maxLife &&
          meteor.x < width + meteor.length &&
          meteor.y < height + meteor.length
        );
      });
      ctx.globalCompositeOperation = "source-over";

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
