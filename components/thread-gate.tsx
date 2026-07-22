"use client";

import { useEffect, useRef } from "react";

type ThreadGateProps = {
  index: string;
  from: string;
  to: string;
  reverse?: boolean;
  tone?: "paper" | "ink" | "blush";
};

export function ThreadGate({ index, from, to, reverse = false, tone = "paper" }: ThreadGateProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let scale = 1;
    let frame = 0;
    let visible = true;
    let idleUntil = performance.now() + 900;
    let targetX = 0;
    let knotX = 0;
    let knotY = 0;
    let velocityX = 0;
    let velocityY = 0;
    let pointerActive = false;
    let pointerX = 0;
    let pointerY = 0;

    const clamp = (value: number, minimum = 0, maximum = 1) => Math.min(maximum, Math.max(minimum, value));

    function updateTarget() {
      const bounds = section!.getBoundingClientRect();
      const progress = clamp((window.innerHeight - bounds.top) / (window.innerHeight + bounds.height));
      const travel = width * .88;
      targetX = reverse ? width * .94 - progress * travel : width * .06 + progress * travel;
    }

    function traceCord(x: number, y: number, offsetY = 0) {
      const baseY = height * .5 + offsetY;
      const sway = clamp(velocityX * .18, -18, 18);
      context!.beginPath();
      context!.moveTo(-8, baseY);
      context!.bezierCurveTo(
        x * .3,
        baseY + (y - baseY) * .12 - sway * .16,
        x * .72,
        y - sway * .35,
        x,
        y,
      );
      context!.bezierCurveTo(
        x + (width - x) * .28,
        y + sway * .35,
        x + (width - x) * .7,
        baseY + (y - baseY) * .12 + sway * .16,
        width + 8,
        baseY,
      );
    }

    function traceKnot(size: number) {
      context!.beginPath();
      context!.moveTo(0, 0);
      context!.bezierCurveTo(-size * .35, -size * .8, -size * 1.15, -size * .58, -size * .92, 0);
      context!.bezierCurveTo(-size * .7, size * .58, size * .05, size * .62, size * .22, 0);
      context!.bezierCurveTo(size * .4, -size * .65, size * 1.18, -size * .55, size, .05);
      context!.bezierCurveTo(size * .78, size * .68, size * .14, size * .68, 0, 0);
    }

    function drawKnot(now: number) {
      const speed = Math.abs(velocityX);
      const size = Math.min(18, Math.max(12, width * .012)) + Math.min(5, speed * .08);
      const rotation = clamp(velocityX * .012, -.5, .5);
      context!.save();
      context!.translate(knotX, knotY);
      context!.rotate(rotation);
      context!.lineCap = "round";
      context!.lineJoin = "round";

      context!.save();
      context!.translate(2, 3);
      traceKnot(size);
      context!.strokeStyle = "rgba(10,10,10,.2)";
      context!.shadowColor = "rgba(10,10,10,.24)";
      context!.shadowBlur = 5;
      context!.lineWidth = 6;
      context!.stroke();
      context!.restore();

      traceKnot(size);
      context!.strokeStyle = tone === "ink" ? "rgba(10,10,10,.92)" : "rgba(246,240,232,.9)";
      context!.lineWidth = 4.8;
      context!.stroke();
      traceKnot(size);
      context!.strokeStyle = "#c5162a";
      context!.shadowColor = "rgba(197,22,42,.5)";
      context!.shadowBlur = 8;
      context!.lineWidth = 2.4;
      context!.stroke();
      traceKnot(size);
      context!.strokeStyle = "rgba(255,139,151,.92)";
      context!.shadowColor = "transparent";
      context!.lineWidth = .55;
      context!.stroke();

      context!.beginPath();
      context!.arc(0, 0, 4.4, 0, Math.PI * 2);
      const bead = context!.createRadialGradient(-1.5, -1.5, .4, 0, 0, 5);
      bead.addColorStop(0, "#ff9aa5");
      bead.addColorStop(.26, "#e03245");
      bead.addColorStop(.72, "#c5162a");
      bead.addColorStop(1, "#6f000c");
      context!.fillStyle = bead;
      context!.shadowColor = "rgba(197,22,42,.62)";
      context!.shadowBlur = 12;
      context!.fill();

      const pulse = .5 + Math.sin(now * .0024) * .5;
      context!.beginPath();
      context!.ellipse(0, 0, size * (1.25 + pulse * .13), size * (.62 + pulse * .06), 0, 0, Math.PI * 2);
      context!.strokeStyle = `rgba(197,22,42,${.08 + pulse * .08})`;
      context!.lineWidth = .7;
      context!.stroke();
      context!.restore();
    }

    function draw(now = performance.now()) {
      context!.clearRect(0, 0, width, height);
      const baseY = height * .5;
      const normalizedX = clamp(knotX / Math.max(1, width));
      const gravitySag = Math.sin(normalizedX * Math.PI) * Math.min(28, height * .1);
      const motionSag = Math.min(16, Math.abs(velocityX) * .32);
      let targetY = baseY + gravitySag + motionSag;

      if (pointerActive) {
        const distance = Math.abs(pointerX - knotX);
        const influence = Math.max(0, 1 - distance / Math.max(170, width * .18));
        targetY += (pointerY - targetY) * influence * .22;
      }

      velocityX = (velocityX + (targetX - knotX) * .055) * .835;
      knotX += velocityX;
      velocityY = (velocityY + (targetY - knotY) * .072) * .82;
      knotY += velocityY;

      context!.save();
      context!.lineCap = "round";
      context!.lineJoin = "round";
      traceCord(knotX + 2, knotY + 3, 2);
      context!.strokeStyle = "rgba(10,10,10,.18)";
      context!.shadowColor = "rgba(10,10,10,.22)";
      context!.shadowBlur = 5;
      context!.lineWidth = 7;
      context!.stroke();

      traceCord(knotX, knotY);
      context!.shadowColor = "transparent";
      context!.strokeStyle = tone === "ink" ? "rgba(10,10,10,.9)" : "rgba(246,240,232,.9)";
      context!.lineWidth = 5.2;
      context!.stroke();

      traceCord(knotX, knotY);
      const thread = context!.createLinearGradient(0, 0, width, 0);
      thread.addColorStop(0, "#8f0717");
      thread.addColorStop(.18, "#c5162a");
      thread.addColorStop(.52, "#ef4154");
      thread.addColorStop(.78, "#bd1023");
      thread.addColorStop(1, "#800511");
      context!.strokeStyle = thread;
      context!.shadowColor = "rgba(197,22,42,.44)";
      context!.shadowBlur = 8;
      context!.lineWidth = 2.5;
      context!.stroke();

      traceCord(knotX - .6, knotY - .35);
      context!.shadowColor = "transparent";
      context!.strokeStyle = "rgba(255,151,161,.88)";
      context!.lineWidth = .55;
      context!.stroke();

      traceCord(knotX + .65, knotY + .45);
      context!.setLineDash([13, 2, 4, 2]);
      context!.lineDashOffset = now * .006;
      context!.strokeStyle = "rgba(91,0,11,.5)";
      context!.lineWidth = .45;
      context!.stroke();
      context!.restore();
      drawKnot(now);
    }

    function animate(now: number) {
      frame = 0;
      draw(now);
      if (
        visible &&
        (Math.abs(targetX - knotX) > .08 || Math.abs(velocityX) > .025 || Math.abs(velocityY) > .025 || now < idleUntil)
      ) {
        frame = window.requestAnimationFrame(animate);
      }
    }

    function requestUpdate(duration = 760) {
      updateTarget();
      idleUntil = performance.now() + duration;
      if (visible && !frame && !reduceMotion) frame = window.requestAnimationFrame(animate);
    }

    function resize() {
      const bounds = section!.getBoundingClientRect();
      scale = Math.min(window.devicePixelRatio || 1, 2);
      width = bounds.width;
      height = bounds.height;
      canvas!.width = Math.max(1, Math.round(width * scale));
      canvas!.height = Math.max(1, Math.round(height * scale));
      context!.setTransform(scale, 0, 0, scale, 0, 0);
      updateTarget();
      if (!knotX) knotX = targetX;
      if (!knotY) knotY = height * .5;
      if (reduceMotion) draw();
      else requestUpdate(900);
    }

    const pointerMove = (event: PointerEvent) => {
      const bounds = section!.getBoundingClientRect();
      pointerX = event.clientX - bounds.left;
      pointerY = event.clientY - bounds.top;
      pointerActive = true;
      requestUpdate(380);
    };
    const pointerLeave = () => {
      pointerActive = false;
      requestUpdate(480);
    };
    const resizeObserver = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) requestUpdate(900);
      else if (frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
    }, { rootMargin: "30% 0px" });
    const scrollUpdate = () => requestUpdate(820);

    resizeObserver.observe(section);
    visibilityObserver.observe(section);
    section.addEventListener("pointermove", pointerMove);
    section.addEventListener("pointerleave", pointerLeave);
    window.addEventListener("scroll", scrollUpdate, { passive: true });
    window.addEventListener("resize", resize, { passive: true });
    resize();

    return () => {
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      section.removeEventListener("pointermove", pointerMove);
      section.removeEventListener("pointerleave", pointerLeave);
      window.removeEventListener("scroll", scrollUpdate);
      window.removeEventListener("resize", resize);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reverse, tone]);

  return (
    <aside
      className={`thread-gate thread-gate-${tone}${reverse ? " is-reverse" : ""}`}
      aria-label={`From ${from} to ${to}`}
      data-reveal
      ref={sectionRef}
    >
      <span className="thread-gate-folio">THE RED THREAD / {index}</span>
      <canvas className="thread-gate-canvas" ref={canvasRef} aria-hidden="true" />
      <p>
        <span><small>From</small>{from}</span>
        <i>→</i>
        <strong><small>To</small>{to}</strong>
      </p>
    </aside>
  );
}
