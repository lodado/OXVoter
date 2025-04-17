"use client";

import { useEffect, useRef } from "react";

/* ────────────────────────────────
   타입 정의
───────────────────────────────── */
interface Comet {
  x: number;
  y: number;
  speed: number;
  color: string;
  radius: number;
  tailLength: number;
  history: { x: number; y: number }[];
}

interface Particle {
  x: number;
  y: number;
  dx: number;
  dy: number;
  life: number;
  maxLife: number;
  color: string;
  radius: number;
}

export default function FireworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cometsRef = useRef<Comet[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);

  /* ───── 랜덤 팔레트 ───── */
  const randomColor = () => {
    const list = ["#FF5252", "#4CAF50", "#2196F3", "#FFEB3B", "#9C27B0", "#00BCD4", "#FF9800", "#607D8B"];
    return list[Math.floor(Math.random() * list.length)];
  };

  /* ───── 새 혜성 객체 반환 ───── */
  const createComet = (canvas: HTMLCanvasElement): Comet => {
    const radius = 3 + Math.random() * 5;
    return {
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 300,
      speed: 1 + Math.random() * 3,
      color: randomColor(),
      radius,
      tailLength: 10 + Math.floor(Math.random() * 15),
      history: [],
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /* 사이즈 대응 */
    const resize = () => {
      canvas.width = innerWidth;
      canvas.height = innerHeight;
    };
    addEventListener("resize", resize);
    resize();

    /* 초기 혜성 50개 */
    const cometCount = window.innerWidth <= 700 ? 15 : 50;
    cometsRef.current = Array.from({ length: cometCount }, () => createComet(canvas));

    /* 폭발 시 파티클 생성 */
    const explode = (x: number, y: number, baseColor: string) => {
      const count = 25 + Math.floor(Math.random() * 25);
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.3;
        const speed = 2 + Math.random() * 3;
        particlesRef.current.push({
          x,
          y,
          dx: Math.cos(angle) * speed,
          dy: Math.sin(angle) * speed,
          life: 60 + Math.floor(Math.random() * 30),
          maxLife: 90,
          color: baseColor,
          radius: 1.5 + Math.random() * 2.5,
        });
      }
    };

    /* 메인 루프 */
    const animate = () => {
      /* 배경 트레일 */
      ctx.fillStyle = "rgb(30 41 59 / 0.5)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      /* === Comet === */
      cometsRef.current = cometsRef.current.flatMap((c) => {
        const newY = c.y - c.speed;
        const newHist = [...c.history, { x: c.x, y: c.y }];
        if (newHist.length > c.tailLength) newHist.shift();

        /* 꼬리 */
        newHist.forEach((p, idx) => {
          const alpha = idx / c.tailLength;
          const r = c.radius * (0.5 + idx / c.tailLength / 2);
          ctx.beginPath();
          ctx.fillStyle = `${c.color}${Math.floor(alpha * 255)
            .toString(16)
            .padStart(2, "0")}`;
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.fill();
        });

        /* 머리 */
        ctx.beginPath();
        ctx.fillStyle = c.color;
        ctx.arc(c.x, newY, c.radius, 0, Math.PI * 2);
        ctx.fill();

        /* 폭발 조건 */
        const explodeNow = newY < canvas.height * 0.2 || Math.random() < 0.01;

        if (explodeNow) {
          explode(c.x, newY, c.color);
          /* 기존 자리 → 새 혜성 교체 반환 */
          return [createComet(canvas)];
        }

        /* 화면 위로 사라짐 → 새 혜성 */
        if (newY < -c.radius * 2) {
          return [createComet(canvas)];
        }

        /* 그대로 유지 */
        return [{ ...c, y: newY, history: newHist }];
      });

      /* === Particle === */
      particlesRef.current = particlesRef.current.flatMap((p) => {
        const prog = 1 - p.life / p.maxLife;
        const alpha = Math.max(0, 1 - prog);
        const radius = Math.max(0, p.radius * (1 - prog));

        const nx = p.x + p.dx;
        const ny = p.y + p.dy + prog * 0.5;

        ctx.beginPath();
        ctx.fillStyle = `${p.color}${Math.floor(alpha * 255)
          .toString(16)
          .padStart(2, "0")}`;
        ctx.arc(nx, ny, radius, 0, Math.PI * 2);
        ctx.fill();

        if (p.life <= 1 || radius <= 0) return [];
        return [{ ...p, x: nx, y: ny, life: p.life - 1 }];
      });

      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);

    /* 클린업 */
    return () => {
      cancelAnimationFrame(animRef.current);
      removeEventListener("resize", resize);
    };
  }, []);

  /* ───── JSX ───── */
  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden ">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
