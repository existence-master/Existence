"use client";
import React, { useEffect, useRef, useState } from "react";

const DotBackground = () => {
  const canvasRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const ratio = window.devicePixelRatio || 1;
    const dots = [];
    const wide = 50;
    const high = 50;
    const padding = 10;
    let mouse = { x: -1000, y: -1000 };

    const setCanvasSize = () => {
      canvas.width = canvas.parentElement.clientWidth * ratio;
      canvas.height = canvas.parentElement.clientHeight * ratio;
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    function create() {
      for (let i = 0; i < wide; i++) {
        const x =
          Math.floor(
            ((canvas.width - padding * 2) / (wide - 1)) * i + padding
          ) * ratio;
        for (let j = 0; j < high; j++) {
          const y =
            Math.floor(
              ((canvas.height - padding * 2) / (high - 1)) * j + padding
            ) * ratio;
          dots.push({ x, y, ox: x, oy: y, size: 2 });
        }
      }
    }

    function getV(s) {
      const dx = s.x - mouse.x;
      const dy = s.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 100; // Maximum distance for effect
      const force = Math.max(0, (maxDist - dist) / maxDist);
      return { x: dx * force * 0.1, y: dy * force * 0.1 };
    }

    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(255, 255, 255, 0.25)"; // Adjust opacity

      dots.forEach((s) => {
        const v = getV(s);
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x + v.x, s.y + v.y);
        ctx.strokeStyle = "rgba(51, 51, 51, 0.25)"; // Adjust opacity
        ctx.lineWidth = 1 * ratio;
        ctx.stroke();
        ctx.closePath();
      });

      dots.forEach((s) => {
        const v = getV(s);
        ctx.beginPath();
        ctx.arc(s.x + v.x, s.y + v.y, s.size * ratio, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.closePath();
      });

      requestAnimationFrame(render);
    }

    function handleMouseMove(event) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (event.clientX - rect.left) * ratio;
      mouse.y = (event.clientY - rect.top) * ratio;
    }

    create();
    render();

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", setCanvasSize);
    };
  }, [isClient]);

  if (!isClient) return null;

  return (
    <canvas
      ref={canvasRef}
      className="dot-background"
      style={{ position: "absolute", top: 0, left: 0 }}
    />
  );
};

export default DotBackground;
