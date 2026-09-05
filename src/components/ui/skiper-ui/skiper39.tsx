import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";

interface CrowdCanvasProps {
  src?: string;
  rows?: number;
  cols?: number;
  className?: string;
  count?: number;
}

interface BubbleState {
  opacity: number;
  scale: number;
  text: string;
}

const CrowdCanvas = ({
  src = "/images/peeps/all-peeps.png",
  rows = 15,
  cols = 7,
  className = "",
  count = 18,
}: CrowdCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let isDisposed = false;
    let isVisible = true;

    // UTILS
    const randomRange = (min: number, max: number) =>
      min + Math.random() * (max - min);
    const randomIndex = (array: any[]) => (randomRange(0, array.length) | 0);
    const removeFromArray = (array: any[], i: number) => array.splice(i, 1)[0];
    const removeItemFromArray = (array: any[], item: any) =>
      removeFromArray(array, array.indexOf(item));
    const removeRandomFromArray = (array: any[]) =>
      removeFromArray(array, randomIndex(array));

    // STAGE & POOL
    const stage = {
      width: 0,
      height: 0,
    };

    type Peep = {
      image: HTMLImageElement;
      rect: number[];
      width: number;
      height: number;
      drawArgs: any[];
      x: number;
      y: number;
      anchorY: number;
      scale: number;
      scaleX: number;
      rotation: number;
      walk: gsap.core.Timeline | null;
      depthLayer: number;
      bubble: BubbleState;
      setRect: (rect: number[]) => void;
      render: (ctx: CanvasRenderingContext2D) => void;
    };

    const allPeeps: Peep[] = [];
    const availablePeeps: Peep[] = [];
    const crowd: Peep[] = [];

    // FACTORY FUNCTIONS
    const createPeep = ({
      image,
      rect,
    }: {
      image: HTMLImageElement;
      rect: number[];
    }): Peep => {
      const peep: Peep = {
        image,
        rect: [],
        width: 0,
        height: 0,
        drawArgs: [],
        x: 0,
        y: 0,
        anchorY: 0,
        scale: 0.44,
        scaleX: 1,
        rotation: 0,
        walk: null,
        depthLayer: 1,
        bubble: { opacity: 0, scale: 0, text: "Wow!" },
        setRect: (rect: number[]) => {
          peep.rect = rect;
          peep.width = rect[2];
          peep.height = rect[3];
          peep.drawArgs = [peep.image, ...rect, 0, 0, peep.width, peep.height];
        },
        render: (ctx: CanvasRenderingContext2D) => {
          ctx.save();
          ctx.translate(peep.x, peep.y);
          ctx.rotate((peep.rotation * Math.PI) / 180);
          ctx.scale(peep.scaleX * peep.scale, peep.scale);

          ctx.drawImage(
            peep.image,
            peep.rect[0],
            peep.rect[1],
            peep.rect[2],
            peep.rect[3],
            -peep.width / 2,
            -peep.height,
            peep.width,
            peep.height
          );
          ctx.restore();
        },
      };

      peep.setRect(rect);
      return peep;
    };

    const resetPeep = ({ peep }: { peep: Peep }) => {
      const direction = Math.random() > 0.5 ? 1 : -1;

      // Perfectly scaled so avatars frame the bottom horizon without covering central typography
      const layerRoll = Math.random();
      let depthLayer = 1;
      let scale = 0.42;
      let offsetY = -4;
      let speed = 52;

      if (layerRoll < 0.33) {
        // Back tier
        depthLayer = 0;
        scale = randomRange(0.34, 0.39);
        offsetY = randomRange(-22, -14);
        speed = randomRange(42, 50);
      } else if (layerRoll < 0.68) {
        // Mid tier
        depthLayer = 1;
        scale = randomRange(0.41, 0.47);
        offsetY = randomRange(-14, -6);
        speed = randomRange(48, 58);
      } else {
        // Front tier
        depthLayer = 2;
        scale = randomRange(0.48, 0.54);
        offsetY = randomRange(-6, 0);
        speed = randomRange(54, 66);
      }

      peep.depthLayer = depthLayer;
      peep.scale = scale;
      peep.bubble.opacity = 0;
      peep.bubble.scale = 0;
      peep.rotation = 0;

      const startY = stage.height + offsetY;
      const spawnBuffer = peep.width * scale + 80;

      let startX: number;
      let endX: number;

      if (direction === 1) {
        startX = -spawnBuffer;
        endX = stage.width + spawnBuffer;
        peep.scaleX = 1;
      } else {
        startX = stage.width + spawnBuffer;
        endX = -spawnBuffer;
        peep.scaleX = -1;
      }

      peep.x = startX;
      peep.y = startY;
      peep.anchorY = startY;

      // Decide if this walker will stop, look up at the logo, and say "Wow!"
      const willLookUp = Math.random() < 0.6;
      const lookUpX = randomRange(stage.width * 0.36, stage.width * 0.64);
      const lookUpDuration = randomRange(1.8, 2.4);

      return {
        startX,
        startY,
        endX,
        speed,
        willLookUp,
        lookUpX,
        lookUpDuration,
      };
    };

    const buildWalkTimeline = ({ peep, props }: { peep: Peep; props: any }) => {
      const { startX, startY, endX, speed, willLookUp, lookUpX, lookUpDuration } = props;
      const tl = gsap.timeline();

      const stepDuration = 0.28 * (52 / speed);
      const bobAmount = randomRange(2.5, 4.2);
      const swayTilt = randomRange(0.7, 1.4);

      if (!willLookUp) {
        // Continuous walk from start to end
        const totalDistance = Math.abs(endX - startX);
        const xDuration = totalDistance / speed;

        tl.to(peep, { x: endX, duration: xDuration, ease: "none" }, 0);
        tl.to(
          peep,
          {
            y: startY - bobAmount,
            duration: stepDuration,
            repeat: Math.ceil(xDuration / stepDuration),
            yoyo: true,
            ease: "sine.inOut",
          },
          0
        );
        tl.to(
          peep,
          {
            rotation: swayTilt * (peep.scaleX > 0 ? 1 : -1),
            duration: stepDuration * 2,
            repeat: Math.ceil(xDuration / (stepDuration * 2)),
            yoyo: true,
            ease: "sine.inOut",
          },
          0
        );
      } else {
        // Walk phase 1: from start to lookUpX
        const dist1 = Math.abs(lookUpX - startX);
        const dur1 = dist1 / speed;

        tl.to(peep, { x: lookUpX, duration: dur1, ease: "none" }, 0);
        tl.to(
          peep,
          {
            y: startY - bobAmount,
            duration: stepDuration,
            repeat: Math.max(1, Math.ceil(dur1 / stepDuration)),
            yoyo: true,
            ease: "sine.inOut",
          },
          0
        );

        // Pause phase: Stop, Look Up, Show "Wow!" Bubble, Idle Breathe
        const pauseTime = dur1;
        tl.set(peep, { y: startY, rotation: -5 }, pauseTime);

        // Pop speech bubble in
        tl.to(
          peep.bubble,
          {
            opacity: 1,
            scale: 1,
            duration: 0.35,
            ease: "back.out(2.2)",
          },
          pauseTime + 0.15
        );

        // Idle gentle breathing while looking up
        tl.to(
          peep,
          {
            y: startY - 3,
            rotation: -8,
            duration: lookUpDuration * 0.5,
            repeat: 1,
            yoyo: true,
            ease: "sine.inOut",
          },
          pauseTime + 0.1
        );

        // Pop speech bubble out before resuming walk
        tl.to(
          peep.bubble,
          {
            opacity: 0,
            scale: 0.7,
            duration: 0.25,
            ease: "power2.in",
          },
          pauseTime + lookUpDuration - 0.25
        );

        // Walk phase 2: from lookUpX to endX
        const resumeTime = pauseTime + lookUpDuration;
        const dist2 = Math.abs(endX - lookUpX);
        const dur2 = dist2 / speed;

        tl.set(peep, { rotation: 0 }, resumeTime);
        tl.to(peep, { x: endX, duration: dur2, ease: "none" }, resumeTime);
        tl.to(
          peep,
          {
            y: startY - bobAmount,
            duration: stepDuration,
            repeat: Math.max(1, Math.ceil(dur2 / stepDuration)),
            yoyo: true,
            ease: "sine.inOut",
          },
          resumeTime
        );
      }

      return tl;
    };

    const createPeeps = () => {
      const { naturalWidth: width, naturalHeight: height } = img;
      if (!width || !height) return;
      const total = rows * cols;
      const rectWidth = width / rows;
      const rectHeight = height / cols;

      allPeeps.length = 0;
      for (let i = 0; i < total; i++) {
        allPeeps.push(
          createPeep({
            image: img,
            rect: [
              (i % rows) * rectWidth,
              ((i / rows) | 0) * rectHeight,
              rectWidth,
              rectHeight,
            ],
          })
        );
      }
    };

    const spawnWalker = () => {
      if (isDisposed || !allPeeps.length) return null;
      if (!availablePeeps.length) {
        availablePeeps.push(...allPeeps);
      }
      const peep = removeRandomFromArray(availablePeeps) || allPeeps[randomIndex(allPeeps)];
      if (!peep) return null;

      const walkProps = resetPeep({ peep });
      const walk = buildWalkTimeline({
        peep,
        props: walkProps,
      }).eventCallback("onComplete", () => {
        if (isDisposed) return;
        removeItemFromArray(crowd, peep);
        availablePeeps.push(peep);
        // Seamlessly spawn replacement immediately in loop
        spawnWalker();
      });

      peep.walk = walk;
      crowd.push(peep);
      crowd.sort((a, b) => a.anchorY - b.anchorY);

      return peep;
    };

    const initCrowd = () => {
      if (!allPeeps.length) return;
      const targetCount = Math.max(5, Math.min(24, count));

      for (let i = 0; i < targetCount; i++) {
        const peep = spawnWalker();
        if (peep && peep.walk) {
          // Stagger progress across initial loop
          peep.walk.progress((i + 0.1 + Math.random() * 0.8) / targetCount);
        }
      }
    };

    const drawSpeechBubble = (
      ctx: CanvasRenderingContext2D,
      targetX: number,
      targetY: number,
      bubble: BubbleState
    ) => {
      if (bubble.opacity <= 0.01 || bubble.scale <= 0.01) return;

      const bw = 58;
      const bh = 24;
      const x = targetX - (bw * bubble.scale) / 2;
      const y = targetY - (bh * bubble.scale) - 10;
      const r = 6;

      ctx.save();
      ctx.globalAlpha = Math.min(1, Math.max(0, bubble.opacity));
      ctx.translate(targetX, targetY);
      ctx.scale(bubble.scale, bubble.scale);
      ctx.translate(-targetX, -targetY);

      // Drop shadow for crisp contrast in both dark and light modes
      ctx.shadowColor = "rgba(124, 58, 237, 0.45)";
      ctx.shadowBlur = 8;
      ctx.shadowOffsetY = 2;

      // Speech bubble body (Vibrant Violet-600)
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + bw - r, y);
      ctx.quadraticCurveTo(x + bw, y, x + bw, y + r);
      ctx.lineTo(x + bw, y + bh - r);
      ctx.quadraticCurveTo(x + bw, y + bh, x + bw - r, y + bh);
      // Downward pointer arrow
      ctx.lineTo(x + bw / 2 + 4, y + bh);
      ctx.lineTo(targetX, targetY - 2);
      ctx.lineTo(x + bw / 2 - 4, y + bh);
      ctx.lineTo(x + r, y + bh);
      ctx.quadraticCurveTo(x, y + bh, x, y + bh - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();

      ctx.fillStyle = "#7C3AED"; // Violet-600
      ctx.fill();

      // Delicate subtle border
      ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Text "Wow!"
      ctx.shadowColor = "transparent";
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 11px 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(bubble.text, x + bw / 2, y + bh / 2 - 0.5);

      ctx.restore();
    };

    const render = () => {
      if (!canvas || isDisposed || !isVisible) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // 1. Render all walking avatars
      for (let i = 0; i < crowd.length; i++) {
        const peep = crowd[i];
        peep.render(ctx);

        // 2. Draw speech bubble if currently looking up
        if (peep.bubble.opacity > 0) {
          const headTopX = peep.x + (peep.scaleX > 0 ? 3 : -3);
          const headTopY = peep.y - peep.height * peep.scale;
          drawSpeechBubble(ctx, headTopX, headTopY, peep.bubble);
        }
      }

      ctx.restore();
    };

    const resize = () => {
      if (!canvas || isDisposed) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      stage.width = rect.width || window.innerWidth;
      stage.height = rect.height || 260;

      canvas.width = Math.round(stage.width * dpr);
      canvas.height = Math.round(stage.height * dpr);

      crowd.forEach((peep) => {
        if (peep.walk) peep.walk.kill();
      });

      crowd.length = 0;
      availablePeeps.length = 0;
      availablePeeps.push(...allPeeps);

      initCrowd();
    };

    // IntersectionObserver to pause rendering when offscreen & smoothly resume on scroll-back
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          crowd.forEach((peep) => peep.walk?.resume());
        } else {
          crowd.forEach((peep) => peep.walk?.pause());
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const img = document.createElement("img");
    const init = () => {
      if (isDisposed) return;
      createPeeps();
      resize();
      render();
      gsap.ticker.add(render);
    };

    img.onload = init;
    img.onerror = (e) => {
      console.warn("Failed to load crowd avatar spritesheet:", e);
    };
    img.src = src;
    if (img.complete && img.naturalWidth) {
      init();
    }

    const handleResize = () => resize();
    window.addEventListener("resize", handleResize);

    return () => {
      isDisposed = true;
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      gsap.ticker.remove(render);
      crowd.forEach((peep) => {
        if (peep.walk) peep.walk.kill();
      });
    };
  }, [src, rows, cols, count]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute bottom-0 left-0 w-full h-[180px] sm:h-[220px] md:h-[260px] pointer-events-none will-change-transform ${className}`}
    />
  );
};

const Skiper39 = ({
  src = "/images/peeps/all-peeps.png",
  className = "",
  count = 7,
}: {
  src?: string;
  className?: string;
  count?: number;
}) => {
  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <CrowdCanvas src={src} count={count} />
    </div>
  );
};

export { CrowdCanvas, Skiper39 };
export default Skiper39;
