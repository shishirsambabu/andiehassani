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
    const pointer = { x: .62, y: .42, targetX: .62, targetY: .42 };

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

    function trace(offsetX = 0, offsetY = 0) {
      const breathe = Math.sin(phase) * height * .012;
      const pullX = (pointer.x - .62) * width * .1;
      const pullY = (pointer.y - .42) * height * .14;
      context!.beginPath();
      context!.moveTo(-30, height * .56 + breathe + offsetY);
      context!.bezierCurveTo(
        width * .16, height * .45 + offsetY,
        width * .32, height * .62 + breathe + offsetY,
        width * .5 + offsetX, height * .5 + offsetY,
      );
      context!.bezierCurveTo(
        width * .62 + pullX, height * .34 + pullY + offsetY,
        width * .82 + pullX, height * .3 + pullY + offsetY,
        width * .77 + pullX, height * .5 + offsetY,
      );
      context!.bezierCurveTo(
        width * .73 + pullX, height * .68 + pullY + offsetY,
        width * .54 + pullX, height * .66 + pullY + offsetY,
        width * .59 + pullX, height * .49 + offsetY,
      );
      context!.bezierCurveTo(
        width * .65 + pullX, height * .3 + pullY + offsetY,
        width * .88, height * .42 + breathe + offsetY,
        width + 30, height * .55 + offsetY,
      );
    }

    function draw() {
      context!.clearRect(0, 0, width, height);
      pointer.x += (pointer.targetX - pointer.x) * .045;
      pointer.y += (pointer.targetY - pointer.y) * .045;

      context!.save();
      context!.lineCap = "round";
      context!.lineJoin = "round";

      trace(2, 3);
      context!.strokeStyle = "rgba(10,10,10,.13)";
      context!.shadowColor = "rgba(10,10,10,.16)";
      context!.shadowBlur = 8;
      context!.lineWidth = 7;
      context!.stroke();

      trace();
      context!.shadowColor = "transparent";
      context!.strokeStyle = "rgba(246,240,232,.8)";
      context!.lineWidth = 5;
      context!.stroke();

      trace();
      context!.strokeStyle = "#c5162a";
      context!.shadowColor = "rgba(197,22,42,.38)";
      context!.shadowBlur = 8;
      context!.lineWidth = 2.35;
      context!.stroke();

      trace(-.65, -.35);
      context!.shadowColor = "transparent";
      context!.strokeStyle = "rgba(255,139,151,.9)";
      context!.lineWidth = .55;
      context!.stroke();

      const knotX = width * .59 + (pointer.x - .62) * width * .1;
      const knotY = height * .49;
      context!.beginPath();
      context!.arc(knotX, knotY, 4.2, 0, Math.PI * 2);
      context!.fillStyle = "#c5162a";
      context!.shadowColor = "rgba(197,22,42,.65)";
      context!.shadowBlur = 14;
      context!.fill();
      context!.beginPath();
      context!.arc(knotX, knotY, 10 + Math.sin(phase * 1.4) * 1.5, 0, Math.PI * 2);
      context!.strokeStyle = "rgba(197,22,42,.22)";
      context!.lineWidth = 1;
      context!.stroke();
      context!.restore();
    }

    function animate() {
      if (!visible) return;
      phase += .008;
      draw();
      frame = window.requestAnimationFrame(animate);
    }

    const move = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.targetX = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
      pointer.targetY = Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height));
    };
    const leave = () => {
      pointer.targetX = .62;
      pointer.targetY = .42;
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
