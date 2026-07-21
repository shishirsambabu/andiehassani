"use client";

import { useEffect, useRef } from "react";

export function ThreadField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let phase = 0;
    let frame = 0;
    let visible = true;
    const pointer = { x: 0.68, y: 0.34, targetX: 0.68, targetY: 0.34 };

    function resize() {
      const bounds = canvas!.getBoundingClientRect();
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      width = bounds.width;
      height = bounds.height;
      canvas!.width = Math.max(1, Math.round(width * scale));
      canvas!.height = Math.max(1, Math.round(height * scale));
      context!.setTransform(scale, 0, 0, scale, 0, 0);
      if (reduceMotion) draw();
    }

    function draw() {
      context!.clearRect(0, 0, width, height);
      pointer.x += (pointer.targetX - pointer.x) * 0.055;
      pointer.y += (pointer.targetY - pointer.y) * 0.055;

      const nodes = Array.from({ length: 8 }, (_, index) => {
        const ratio = index / 7;
        const distance = Math.abs(ratio - pointer.x);
        const influence = Math.max(0, 1 - distance * 3.4);
        const wave = Math.sin(phase + index * 1.18) * height * 0.045;
        const editorialStep = index % 2 === 0 ? -height * 0.035 : height * 0.022;
        const pointerPull = (pointer.y * height - height * 0.47) * influence * 0.42;
        return { x: ratio * width, y: height * 0.48 + wave + editorialStep + pointerPull };
      });

      const trace = () => {
        context!.beginPath();
        context!.moveTo(nodes[0].x - 20, nodes[0].y);
        for (let index = 0; index < nodes.length - 1; index += 1) {
          const current = nodes[index];
          const next = nodes[index + 1];
          context!.quadraticCurveTo(current.x, current.y, (current.x + next.x) / 2, (current.y + next.y) / 2);
        }
        context!.lineTo(width + 20, nodes.at(-1)!.y);
      };

      context!.save();
      context!.lineCap = "round";
      context!.lineJoin = "round";
      trace();
      context!.strokeStyle = "rgba(197, 22, 42, 0.08)";
      context!.lineWidth = 30;
      context!.stroke();
      trace();
      context!.strokeStyle = "rgba(197, 22, 42, 0.22)";
      context!.lineWidth = 9;
      context!.stroke();
      trace();
      context!.strokeStyle = "#c5162a";
      context!.lineWidth = 2.2;
      context!.stroke();

      nodes.slice(1, -1).forEach((node, index) => {
        const pulse = 3.2 + Math.sin(phase * 1.8 + index) * 1.2;
        context!.beginPath();
        context!.arc(node.x, node.y, pulse, 0, Math.PI * 2);
        context!.fillStyle = index === 4 ? "#0a0a0a" : "#c5162a";
        context!.fill();
        context!.beginPath();
        context!.arc(node.x, node.y, pulse + 7, 0, Math.PI * 2);
        context!.strokeStyle = "rgba(197, 22, 42, 0.22)";
        context!.lineWidth = 1;
        context!.stroke();
      });
      context!.restore();
    }

    function animate() {
      if (!visible) return;
      phase += 0.012;
      draw();
      frame = window.requestAnimationFrame(animate);
    }

    const move = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.targetX = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
      pointer.targetY = Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height));
    };

    const leave = () => {
      pointer.targetX = 0.68;
      pointer.targetY = 0.34;
    };

    const resizeObserver = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !reduceMotion && !frame) animate();
      if (!visible && frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
    });

    resizeObserver.observe(canvas);
    visibilityObserver.observe(canvas);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerleave", leave);
    resize();
    if (!reduceMotion) animate();
    else draw();

    return () => {
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerleave", leave);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas className="thread-field" ref={canvasRef} aria-hidden="true" />;
}
