"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

type ThreadAnchor = {
  y: number;
  lane: number;
  label: string;
  synthetic?: boolean;
};

type ThreadPoint = { x: number; y: number };
type Puncture = { documentY: number; started: number; direction: number };

const SIGNAL = "#c5162a";

export function ScrollNeedle() {
  const pathname = usePathname();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const needleRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const needle = needleRef.current;
    if (!canvas || !needle) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let scale = Math.min(window.devicePixelRatio || 1, 2);
    let anchors: ThreadAnchor[] = [];
    let punctures: Puncture[] = [];
    let frame = 0;
    let targetScroll = window.scrollY;
    let renderedScroll = targetScroll;
    let velocity = 0;
    let previousTarget = targetScroll;
    let previousNeedleDocumentY = targetScroll + height * 0.53;
    let pointerX = width * 0.5;
    let pointerY = height * 0.5;
    let pointerActive = false;
    let idleUntil = performance.now() + 900;

    function labelFor(element: HTMLElement, index: number) {
      const explicit = element.dataset.threadLabel;
      if (explicit) return explicit;
      const heading = element.querySelector("h1, h2");
      return heading?.textContent?.trim().slice(0, 38) || `Chapter ${index + 1}`;
    }

    function refreshAnchors() {
      const mobile = width < 720;
      const lanes = mobile ? [0.9, 0.82, 0.92] : [0.1, 0.86, 0.19, 0.79, 0.31, 0.9];
      const elements = Array.from(
        document.querySelectorAll<HTMLElement>(
          ".route-stage > section, .route-stage > article, .route-stage > div[id]",
        ),
      ).filter((element) => element.getBoundingClientRect().height > 150);

      anchors = elements.map((element, index) => {
        const bounds = element.getBoundingClientRect();
        return {
          y: bounds.top + window.scrollY + bounds.height * 0.5,
          lane: lanes[index % lanes.length],
          label: labelFor(element, index),
        };
      });

      const documentHeight = document.documentElement.scrollHeight;
      if (!anchors.length) anchors = [{ y: height * 0.5, lane: mobile ? 0.9 : 0.14, label: "Orientation" }];
      anchors.unshift({ y: 0, lane: anchors[0].lane, label: "Orientation", synthetic: true });
      anchors.push({ y: documentHeight, lane: anchors.at(-1)!.lane, label: "The next move", synthetic: true });
    }

    function smootherstep(value: number) {
      const clamped = Math.min(1, Math.max(0, value));
      return clamped * clamped * clamped * (clamped * (clamped * 6 - 15) + 10);
    }

    function segmentAt(documentY: number) {
      let previous = anchors[0];
      let next = anchors[1] ?? anchors[0];
      let index = 0;
      for (let candidate = 0; candidate < anchors.length - 1; candidate += 1) {
        if (documentY >= anchors[candidate].y && documentY <= anchors[candidate + 1].y) {
          previous = anchors[candidate];
          next = anchors[candidate + 1];
          index = candidate;
          break;
        }
      }
      return { previous, next, index };
    }

    function threadX(documentY: number, screenY: number) {
      const { previous, next, index } = segmentAt(documentY);
      const range = Math.max(1, next.y - previous.y);
      const rawProgress = (documentY - previous.y) / range;
      const progress = smootherstep(rawProgress);
      const lane = previous.lane + (next.lane - previous.lane) * progress;
      const amplitude = Math.min(17, width * 0.014);
      const coutureWave = Math.sin(documentY * 0.0034 + index * 1.13) * amplitude;
      const fineFibre = Math.sin(documentY * 0.012 + index * 2.1) * 1.15;
      const pointerDistance = Math.abs(screenY - pointerY);
      const pointerInfluence = pointerActive ? Math.max(0, 1 - pointerDistance / Math.max(190, height * 0.36)) : 0;
      const pointerPull = (pointerX - lane * width) * pointerInfluence * 0.046;
      const motion = Math.max(-1, Math.min(1, velocity / 42));
      const needleDistance = Math.abs(screenY - height * 0.53);
      const tensionWhip = motion * Math.max(0, 1 - needleDistance / 250) * 24;
      return lane * width + coutureWave + fineFibre + pointerPull + tensionWhip;
    }

    function collectPoints(scrollPosition: number) {
      const points: ThreadPoint[] = [];
      for (let y = -48; y <= height + 48; y += 6) points.push({ x: threadX(scrollPosition + y, y), y });
      return points;
    }

    function trace(points: ThreadPoint[], fromY: number, toY: number) {
      const visible = points.filter((point) => point.y >= fromY - 12 && point.y <= toY + 12);
      if (visible.length < 2) return;
      context!.beginPath();
      context!.moveTo(visible[0].x, visible[0].y);
      for (let index = 1; index < visible.length - 1; index += 1) {
        const midpointX = (visible[index].x + visible[index + 1].x) * 0.5;
        const midpointY = (visible[index].y + visible[index + 1].y) * 0.5;
        context!.quadraticCurveTo(visible[index].x, visible[index].y, midpointX, midpointY);
      }
      context!.lineTo(visible.at(-1)!.x, visible.at(-1)!.y);
    }

    function strokeThread(points: ThreadPoint[], needleY: number, now: number) {
      context!.save();
      context!.lineCap = "round";
      context!.lineJoin = "round";

      // The unstitched route appears as a moving couture notation, not a generic dotted line.
      trace(points, needleY, height + 48);
      const ghost = context!.createLinearGradient(0, needleY, 0, height);
      ghost.addColorStop(0, "rgba(197,22,42,.38)");
      ghost.addColorStop(.45, "rgba(197,22,42,.12)");
      ghost.addColorStop(1, "rgba(197,22,42,0)");
      context!.setLineDash([1.5, 10]);
      context!.lineDashOffset = -(now * 0.016);
      context!.strokeStyle = ghost;
      context!.lineWidth = 1.25;
      context!.stroke();
      context!.setLineDash([]);

      // A soft indentation creates the illusion that the stitched thread presses into the page.
      trace(points, -48, needleY + 4);
      context!.shadowColor = "rgba(10,10,10,.26)";
      context!.shadowBlur = 5;
      context!.shadowOffsetX = 2.5;
      context!.shadowOffsetY = 3;
      context!.strokeStyle = "rgba(10,10,10,.17)";
      context!.lineWidth = 7;
      context!.stroke();

      trace(points, -48, needleY + 3);
      context!.shadowColor = "transparent";
      context!.strokeStyle = "rgba(246,240,232,.82)";
      context!.lineWidth = 5.2;
      context!.stroke();

      trace(points, -48, needleY + 2);
      context!.shadowColor = "rgba(197,22,42,.55)";
      context!.shadowBlur = 9;
      context!.strokeStyle = SIGNAL;
      context!.lineWidth = 3.15;
      context!.stroke();

      // Offset micro-fibres keep the thread tactile at retina resolution.
      context!.save();
      context!.translate(-.72, -.25);
      trace(points, -48, needleY + 1);
      context!.shadowColor = "transparent";
      context!.strokeStyle = "rgba(255,150,158,.9)";
      context!.lineWidth = .62;
      context!.stroke();
      context!.restore();

      context!.save();
      context!.translate(.72, .4);
      trace(points, -48, needleY + 1);
      context!.setLineDash([15, 2, 4, 2]);
      context!.lineDashOffset = now * .006;
      context!.strokeStyle = "rgba(91,0,12,.55)";
      context!.lineWidth = .5;
      context!.stroke();
      context!.restore();
      context!.restore();
    }

    function drawLockStitch(anchor: ThreadAnchor, needleY: number, now: number) {
      const screenY = anchor.y - renderedScroll;
      if (screenY < -40 || screenY > height + 40) return;
      const x = threadX(anchor.y, screenY);
      const complete = screenY <= needleY;
      const activeDistance = Math.abs(screenY - needleY);
      const active = activeDistance < 90;

      context!.save();
      context!.translate(x, screenY);
      context!.rotate(-0.12);
      context!.globalAlpha = complete ? 1 : .28;

      context!.beginPath();
      context!.ellipse(-7, 0, 2.8, 1.9, 0, 0, Math.PI * 2);
      context!.ellipse(7, 0, 2.8, 1.9, 0, 0, Math.PI * 2);
      context!.fillStyle = "rgba(10,10,10,.72)";
      context!.fill();

      context!.beginPath();
      context!.moveTo(-7, 0);
      context!.bezierCurveTo(-2, -11, 3, 11, 7, 0);
      context!.strokeStyle = complete ? SIGNAL : "rgba(197,22,42,.38)";
      context!.lineWidth = 2;
      context!.shadowColor = complete ? "rgba(197,22,42,.5)" : "transparent";
      context!.shadowBlur = 7;
      context!.stroke();

      if (active) {
        const pulse = (now * .0018) % 1;
        context!.beginPath();
        context!.arc(0, 0, 13 + pulse * 17, 0, Math.PI * 2);
        context!.strokeStyle = `rgba(197,22,42,${(1 - pulse) * .48})`;
        context!.lineWidth = 1;
        context!.stroke();
      }
      context!.restore();
    }

    function drawPunctures(now: number) {
      punctures = punctures.filter((puncture) => now - puncture.started < 1450);
      punctures.forEach((puncture) => {
        const age = (now - puncture.started) / 1450;
        const y = puncture.documentY - renderedScroll;
        const x = threadX(puncture.documentY, y);
        const fade = Math.pow(1 - age, 2);
        context!.save();
        const seamLight = context!.createLinearGradient(0, 0, width, 0);
        seamLight.addColorStop(0, "rgba(197,22,42,0)");
        seamLight.addColorStop(Math.max(0, x / width - .08), "rgba(197,22,42,0)");
        seamLight.addColorStop(x / width, `rgba(255,104,121,${fade * .28})`);
        seamLight.addColorStop(Math.min(1, x / width + .08), "rgba(197,22,42,0)");
        seamLight.addColorStop(1, "rgba(197,22,42,0)");
        context!.fillStyle = seamLight;
        context!.fillRect(0, y - .65, width, 1.3);
        context!.translate(x, y);
        context!.globalCompositeOperation = "screen";
        for (let ring = 0; ring < 3; ring += 1) {
          const delayed = Math.max(0, age - ring * .09);
          const radius = 9 + delayed * (54 + ring * 13);
          context!.beginPath();
          context!.arc(0, 0, radius, 0, Math.PI * 2);
          context!.strokeStyle = `rgba(255,54,78,${fade * (.42 - ring * .1)})`;
          context!.lineWidth = 1.2;
          context!.stroke();
        }
        for (let particle = 0; particle < 10; particle += 1) {
          const angle = particle * Math.PI * .2 + puncture.direction * .35;
          const distance = 12 + age * (24 + (particle % 3) * 8);
          context!.beginPath();
          context!.arc(Math.cos(angle) * distance, Math.sin(angle) * distance, Math.max(.5, 1.5 * fade), 0, Math.PI * 2);
          context!.fillStyle = `rgba(255,104,121,${fade * .7})`;
          context!.fill();
        }
        context!.restore();
      });
    }

    function draw(now = performance.now()) {
      context!.clearRect(0, 0, width, height);
      const totalDistance = Math.max(1, document.documentElement.scrollHeight - height);
      const globalProgress = Math.min(1, Math.max(0, renderedScroll / totalDistance));
      const motion = Math.max(-1, Math.min(1, velocity / 42));
      const needleY = height * (0.53 + motion * .035);
      const needleDocumentY = renderedScroll + needleY;
      const points = collectPoints(renderedScroll);
      const needleX = threadX(needleDocumentY, needleY);
      const beforeX = threadX(needleDocumentY - 12, needleY - 12);
      const afterX = threadX(needleDocumentY + 12, needleY + 12);
      const angle = Math.atan2(24, afterX - beforeX) * (180 / Math.PI);

      strokeThread(points, needleY, now);
      context!.save();
      context!.globalCompositeOperation = "screen";
      const needleLight = context!.createRadialGradient(needleX, needleY, 0, needleX, needleY, 62 + Math.abs(motion) * 28);
      needleLight.addColorStop(0, `rgba(255,255,255,${.13 + Math.abs(motion) * .14})`);
      needleLight.addColorStop(.18, `rgba(255,104,121,${.1 + Math.abs(motion) * .12})`);
      needleLight.addColorStop(1, "rgba(197,22,42,0)");
      context!.fillStyle = needleLight;
      context!.beginPath();
      context!.arc(needleX, needleY, 90, 0, Math.PI * 2);
      context!.fill();
      context!.restore();
      anchors.filter((anchor) => !anchor.synthetic).forEach((anchor) => drawLockStitch(anchor, needleY, now));
      drawPunctures(now);

      anchors.forEach((anchor) => {
        if (anchor.synthetic) return;
        const crossedForward = previousNeedleDocumentY < anchor.y && needleDocumentY >= anchor.y;
        const crossedBackward = previousNeedleDocumentY > anchor.y && needleDocumentY <= anchor.y;
        if (crossedForward || crossedBackward) {
          punctures.push({ documentY: anchor.y, started: now, direction: crossedForward ? 1 : -1 });
          idleUntil = now + 1500;
        }
      });
      previousNeedleDocumentY = needleDocumentY;

      needle!.style.setProperty("--needle-x", `${needleX}px`);
      needle!.style.setProperty("--needle-y", `${needleY}px`);
      needle!.style.setProperty("--needle-angle", `${angle}deg`);
      needle!.style.setProperty("--needle-progress", globalProgress.toFixed(4));
      needle!.style.setProperty("--needle-speed", Math.abs(motion).toFixed(3));
      needle!.classList.toggle("is-moving", Math.abs(motion) > .055);

      // The first stitch is already present in the hero; it should not wait for the
      // visitor to clear the opening viewport before the visual idea becomes legible.
      const visibility = Math.max(0, Math.min(1, .74 + globalProgress * 9, (1 - globalProgress) * 24));
      needle!.style.opacity = String(visibility);
      canvas!.style.opacity = String(visibility);

      let currentIndex = 0;
      for (let index = 0; index < anchors.length - 1; index += 1) {
        if (needleDocumentY >= anchors[index].y && needleDocumentY < anchors[index + 1].y) {
          currentIndex = index;
          break;
        }
      }
      const realAnchors = anchors.filter((anchor) => !anchor.synthetic);
      const realCount = Math.max(1, realAnchors.length);
      const activeAnchor = anchors[Math.min(currentIndex + 1, anchors.length - 1)];
      const displayIndex = Math.min(realCount, Math.max(1, currentIndex + 1));
      if (statusRef.current) statusRef.current.textContent = `STITCH ${String(displayIndex).padStart(2, "0")} / ${String(realCount).padStart(2, "0")}`;
      if (labelRef.current) labelRef.current.textContent = activeAnchor.label;
    }

    function animate(now: number) {
      frame = 0;
      const delta = targetScroll - renderedScroll;
      renderedScroll += delta * .105;
      velocity += ((targetScroll - previousTarget) - velocity) * .16;
      velocity *= .875;
      previousTarget = targetScroll;
      draw(now);
      if (Math.abs(delta) > .08 || Math.abs(velocity) > .035 || punctures.length || now < idleUntil) {
        frame = window.requestAnimationFrame(animate);
      }
    }

    function requestUpdate(duration = 720) {
      targetScroll = window.scrollY;
      idleUntil = performance.now() + duration;
      if (!frame) frame = window.requestAnimationFrame(animate);
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      scale = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.max(1, Math.round(width * scale));
      canvas!.height = Math.max(1, Math.round(height * scale));
      context!.setTransform(scale, 0, 0, scale, 0, 0);
      refreshAnchors();
      previousNeedleDocumentY = renderedScroll + height * .53;
      requestUpdate(900);
    }

    const pointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      pointerActive = finePointer;
      requestUpdate(260);
    };
    const pointerLeave = () => { pointerActive = false; requestUpdate(260); };
    const scrollUpdate = () => requestUpdate(720);

    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(document.body);
    window.addEventListener("scroll", scrollUpdate, { passive: true });
    window.addEventListener("resize", resize, { passive: true });
    if (finePointer) window.addEventListener("pointermove", pointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", pointerLeave);
    resize();

    if (reduceMotion) {
      canvas.style.display = "none";
      needle.classList.add("is-static");
    }

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", scrollUpdate);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", pointerMove);
      document.documentElement.removeEventListener("pointerleave", pointerLeave);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return (
    <div className="scroll-stitch" aria-hidden="true">
      <canvas className="scroll-stitch-canvas" ref={canvasRef} />
      <div className="scroll-needle" ref={needleRef}>
        <span className="needle-aura"><i /></span>
        <span className="needle-flare" />
        <span className="needle-tool">
          <span className="needle-eye"><i /></span>
          <span className="needle-body"><i /></span>
          <span className="needle-point" />
        </span>
        <span className="needle-status">
          <span ref={statusRef}>STITCH 01 / 01</span>
          <strong ref={labelRef}>Orientation</strong>
          <i><b /></i>
        </span>
      </div>
    </div>
  );
}
