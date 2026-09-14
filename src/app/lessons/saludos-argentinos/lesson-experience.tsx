"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type Screen = "welcome" | "calm" | "vocab" | "game" | "reward" | "parent";

const VOCAB = [
  { es: "Hola", en: "Hello", emoji: "👋", color: "var(--purple)" },
  { es: "Chau", en: "Bye", emoji: "🌤️", color: "var(--mint)" },
  { es: "Che", en: "Hey friend", emoji: "🧉", color: "var(--blush)" },
  { es: "Dale", en: "Okay / Sure", emoji: "👍", color: "var(--purple)" },
  { es: "¿Cómo andás?", en: "How are you?", emoji: "💬", color: "var(--mint)" },
] as const;

const ORDER: Screen[] = ["welcome", "calm", "vocab", "game", "reward", "parent"];

export function LessonExperience() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [stars, setStars] = useState(0);

  return (
    <div
        className="min-h-[calc(100vh-8rem)] w-full flex flex-col items-center px-4 py-6"
      style={{
        background: "var(--cream)",
        color: "var(--navy)",
        fontFamily: "var(--font-nunito, system-ui, sans-serif)",
      }}
    >
      <ProgressDots screen={screen} />
      <main className="w-full max-w-2xl flex-1 flex items-center justify-center">
        <div key={screen} className="w-full animate-soft-fade">
          {screen === "welcome" && <Welcome onNext={() => setScreen("calm")} />}
          {screen === "calm" && <Calm onNext={() => setScreen("vocab")} />}
          {screen === "vocab" && <Vocab onNext={() => setScreen("game")} />}
          {screen === "game" && (
            <Game
              onComplete={(s) => {
                setStars(s);
                setScreen("reward");
              }}
            />
          )}
          {screen === "reward" && (
            <Reward stars={stars} onNext={() => setScreen("parent")} />
          )}
          {screen === "parent" && (
            <Parent
              onRestart={() => {
                setStars(0);
                setScreen("welcome");
              }}
            />
          )}
        </div>
      </main>
    </div>
  );
}

function ProgressDots({ screen }: { screen: Screen }) {
  const idx = ORDER.indexOf(screen);
  return (
    <div className="flex items-center gap-2 mb-6 mt-2" aria-label="Lesson progress">
      {ORDER.map((s, i) => (
        <span
          key={s}
          className="h-2 rounded-full transition-all duration-500"
          style={{
            width: i === idx ? 28 : 10,
            background: i <= idx ? "var(--purple)" : "var(--blush)",
          }}
        />
      ))}
    </div>
  );
}

function BigButton({
  children,
  onClick,
  variant = "primary",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "soft";
}) {
  const primary =
    "bg-[var(--purple)] text-white shadow-[0_8px_0_0_var(--purple-dark)] active:translate-y-1 active:shadow-[0_2px_0_0_var(--purple-dark)]";
  const soft =
    "bg-[var(--mint)] text-[var(--navy)] shadow-[0_6px_0_0_var(--mint-dark)] active:translate-y-1 active:shadow-[0_2px_0_0_var(--mint-dark)]";
  return (
    <button
      onClick={onClick}
      className={`px-8 py-5 rounded-3xl text-xl md:text-2xl font-extrabold transition-transform ${
        variant === "primary" ? primary : soft
      }`}
    >
      {children}
    </button>
  );
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white rounded-[2rem] p-6 md:p-10 shadow-[0_10px_40px_-20px_rgba(71,67,80,0.25)] ${className}`}
    >
      {children}
    </div>
  );
}

function Welcome({ onNext }: { onNext: () => void }) {
  return (
    <Card className="text-center">
      <div className="flex justify-center">
        <Image
          src="/valentina.png"
          alt="Valentina, your teacher"
          width={224}
          height={224}
          className="w-44 h-44 md:w-56 md:h-56 animate-float"
          priority
        />
      </div>
      <h1
        className="mt-4 text-3xl md:text-5xl font-black leading-tight"
        style={{ color: "var(--navy)" }}
      >
        ¡Hola! Welcome to Argentina <span aria-hidden>🇦🇷</span>
      </h1>
      <p
        className="mt-5 text-lg md:text-xl max-w-md mx-auto"
        style={{ color: "color-mix(in oklab, var(--navy) 75%, transparent)" }}
      >
        Today we will learn how Argentinians say hello!
      </p>
      <div className="mt-8 flex justify-center">
        <BigButton onClick={onNext}>Start Adventure ✨</BigButton>
      </div>
    </Card>
  );
}

function Calm({ onNext }: { onNext: () => void }) {
  const steps = [
    { icon: "🎒", text: "Put your backpack down" },
    { icon: "💭", text: "Imagine taking out worries and sadness" },
    { icon: "🌬️", text: "Take 3 slow breaths with me" },
    { icon: "💜", text: "Feel calm and ready" },
  ];
  return (
    <Card className="text-center">
      <h2 className="text-2xl md:text-4xl font-black">
        Before we start...
        <br />
        let&apos;s relax together <span aria-hidden>💜</span>
      </h2>

      <div className="my-8 flex items-center justify-center">
        <div className="relative w-56 h-56 flex items-center justify-center">
          <div
            className="absolute inset-0 rounded-full animate-breathe"
            style={{ background: "var(--blush)", opacity: 0.6 }}
          />
          <div
            className="absolute inset-6 rounded-full animate-breathe"
            style={{
              background: "var(--mint)",
              opacity: 0.55,
              animationDelay: "0.4s",
            }}
          />
          <div
            className="absolute inset-12 rounded-full animate-breathe"
            style={{
              background: "var(--purple)",
              opacity: 0.55,
              animationDelay: "0.8s",
            }}
          />
          <span className="relative text-3xl font-extrabold text-white drop-shadow-sm">
            breathe
          </span>
        </div>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto text-left">
        {steps.map((s) => (
          <li
            key={s.text}
            className="flex items-center gap-3 rounded-2xl px-4 py-3"
            style={{ background: "var(--cream)" }}
          >
            <span className="text-2xl" aria-hidden>
              {s.icon}
            </span>
            <span className="text-base font-semibold">{s.text}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex justify-center">
        <BigButton onClick={onNext}>I&apos;m ready!</BigButton>
      </div>
    </Card>
  );
}

function Vocab({ onNext }: { onNext: () => void }) {
  const [spoken, setSpoken] = useState<string | null>(null);

  const speak = (word: string) => {
    setSpoken(word);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        const u = new SpeechSynthesisUtterance(word);
        u.lang = "es-AR";
        u.rate = 0.9;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(u);
      } catch {
        // speech synthesis unsupported — silent fallback
      }
    }
    setTimeout(() => setSpoken(null), 800);
  };

  return (
    <div>
      <h2 className="text-center text-2xl md:text-3xl font-black mb-6">
        Argentinian greetings <span aria-hidden>🧉</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {VOCAB.map((w) => (
          <div
            key={w.es}
            className="bg-white rounded-3xl p-5 shadow-[0_8px_30px_-20px_rgba(71,67,80,0.3)] flex items-center gap-4"
            style={{ borderLeft: `8px solid ${w.color}` }}
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0"
              style={{ background: "var(--cream)" }}
              aria-hidden
            >
              {w.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xl font-extrabold truncate">{w.es}</div>
              <div
                className="text-sm font-semibold"
                style={{
                  color: "color-mix(in oklab, var(--navy) 65%, transparent)",
                }}
              >
                {w.en}
              </div>
            </div>
            <button
              onClick={() => speak(w.es)}
              aria-label={`Hear ${w.es}`}
              className={`w-12 h-12 rounded-full flex items-center justify-center text-xl text-white transition-transform ${
                spoken === w.es ? "scale-110" : "hover:scale-105"
              }`}
              style={{ background: "var(--purple)" }}
            >
              🔊
            </button>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <BigButton onClick={onNext}>Let&apos;s play! 🎈</BigButton>
      </div>
    </div>
  );
}

function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function Game({ onComplete }: { onComplete: (stars: number) => void }) {
  const items = useMemo(() => VOCAB.slice(0, 4), []);
  const [shuffledEn] = useState(() => shuffle(items.map((i) => i.en)));
  const [selectedEs, setSelectedEs] = useState<string | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<"correct" | "gentle" | null>(null);
  const [stars, setStars] = useState(0);
  const completedRef = useRef(false);

  useEffect(() => {
    if (matched.length === items.length && !completedRef.current) {
      completedRef.current = true;
      const t = setTimeout(() => onComplete(stars + items.length), 1200);
      return () => clearTimeout(t);
    }
  }, [matched, items.length, onComplete, stars]);

  const tryMatch = (en: string) => {
    if (!selectedEs) return;
    const target = items.find((i) => i.es === selectedEs);
    if (target?.en === en) {
      setMatched((m) => [...m, selectedEs]);
      setStars((s) => s + 1);
      setFeedback("correct");
    } else {
      setFeedback("gentle");
    }
    setSelectedEs(null);
    setTimeout(() => setFeedback(null), 1200);
  };

  return (
    <div>
      <h2 className="text-center text-2xl md:text-3xl font-black mb-2">
        Match the words 🎯
      </h2>
      <p
        className="text-center font-semibold mb-6"
        style={{ color: "color-mix(in oklab, var(--navy) 65%, transparent)" }}
      >
        Tap a Spanish word, then tap its meaning.
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          {items.map((i) => {
            const done = matched.includes(i.es);
            const active = selectedEs === i.es;
            return (
              <button
                key={i.es}
                disabled={done}
                onClick={() => setSelectedEs(active ? null : i.es)}
                className={`w-full px-4 py-4 rounded-2xl font-extrabold text-lg transition-all ${
                  done
                    ? "bg-[var(--mint)] text-[var(--navy)] opacity-70"
                    : active
                      ? "bg-[var(--purple)] text-white scale-[1.03]"
                      : "bg-white text-[var(--navy)] shadow-[0_4px_0_0_var(--blush)]"
                }`}
              >
                {done ? "✓ " : ""}
                {i.es}
              </button>
            );
          })}
        </div>
        <div className="space-y-3">
          {shuffledEn.map((en) => {
            const done = items.find((i) => i.en === en && matched.includes(i.es));
            return (
              <button
                key={en}
                disabled={!!done || !selectedEs}
                onClick={() => tryMatch(en)}
                className={`w-full px-4 py-4 rounded-2xl font-bold text-lg transition-all ${
                  done
                    ? "bg-[var(--mint)] text-[var(--navy)] opacity-70"
                    : selectedEs
                      ? "bg-white text-[var(--navy)] shadow-[0_4px_0_0_var(--blush)] hover:scale-[1.02]"
                      : "bg-[var(--cream)] text-[var(--navy)]/60"
                }`}
              >
                {done ? "✓ " : ""}
                {en}
              </button>
            );
          })}
        </div>
      </div>

      <div className="h-16 mt-6 flex items-center justify-center">
        {feedback === "correct" && (
          <div
            className="animate-pop flex items-center gap-2 font-extrabold px-5 py-3 rounded-full"
            style={{ background: "var(--mint)", color: "var(--navy)" }}
          >
            <span className="text-2xl" aria-hidden>
              ⭐
            </span>
            ¡Muy bien! Great job!
          </div>
        )}
        {feedback === "gentle" && (
          <div
            className="animate-soft-fade flex items-center gap-2 font-semibold px-5 py-3 rounded-full"
            style={{ background: "var(--blush)", color: "var(--navy)" }}
          >
            <span aria-hidden>💜</span>
            Try again — you&apos;ve got this.
          </div>
        )}
      </div>
    </div>
  );
}

function Reward({ stars, onNext }: { stars: number; onNext: () => void }) {
  const total = 5;
  const pct = Math.min(100, (stars / total) * 100);
  return (
    <Card className="text-center">
      <div className="flex justify-center gap-2 mb-4" aria-label={`${stars} stars earned`}>
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className="text-4xl animate-twinkle"
            style={{
              animationDelay: `${i * 0.15}s`,
              filter: i < stars ? "none" : "grayscale(1) opacity(0.3)",
            }}
            aria-hidden
          >
            ⭐
          </span>
        ))}
      </div>
      <h2 className="text-3xl md:text-4xl font-black">You did amazing today! 🎉</h2>
      <div className="mt-4 flex items-center justify-center gap-3">
        <Image
          src="/valentina.png"
          alt=""
          width={64}
          height={64}
          className="w-16 h-16"
        />
        <p
          className="text-left font-semibold max-w-xs"
          style={{ color: "color-mix(in oklab, var(--navy) 75%, transparent)" }}
        >
          &ldquo;Estoy orgullosa de vos.&rdquo; — I&apos;m so proud of you. —
          Valentina
        </p>
      </div>

      <div className="mt-6 max-w-sm mx-auto">
        <div
          className="h-4 rounded-full overflow-hidden"
          style={{ background: "var(--blush)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{ width: `${pct}%`, background: "var(--purple)" }}
          />
        </div>
        <p
          className="mt-2 text-sm font-bold"
          style={{ color: "color-mix(in oklab, var(--navy) 60%, transparent)" }}
        >
          Lesson 1 of 10 — Saludos Argentinos
        </p>
      </div>

      <div className="mt-8 flex justify-center">
        <BigButton onClick={onNext}>Show parents 👨‍👩‍👧</BigButton>
      </div>
    </Card>
  );
}

function Parent({ onRestart }: { onRestart: () => void }) {
  return (
    <Card>
      <div className="flex items-center gap-3 mb-2">
        <span
          className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"
          style={{ background: "var(--mint)", color: "var(--navy)" }}
        >
          For parents
        </span>
      </div>
      <h2 className="text-2xl md:text-3xl font-black">Today&apos;s lesson summary</h2>
      <p
        className="mt-2"
        style={{ color: "color-mix(in oklab, var(--navy) 70%, transparent)" }}
      >
        A gentle look at what your child explored.
      </p>

      <div className="mt-6 grid gap-4">
        <SummaryRow
          title="What they learned"
          body="Five Argentinian greetings: Hola, Chau, Che, Dale, ¿Cómo andás?"
          icon="📚"
        />
        <SummaryRow
          title="Emotional regulation"
          body="Before learning, your child practiced a calm-down breathing routine to feel safe and ready."
          icon="💜"
        />
        <SummaryRow
          title="Our values"
          body="Argentina, family, inclusion, and emotional safety — for every child, including those on the autism spectrum."
          icon="🤝"
        />
      </div>

      <p
        className="mt-6 text-sm italic"
        style={{ color: "color-mix(in oklab, var(--navy) 60%, transparent)" }}
      >
        This experience was designed with educational and psychology guidance.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center">
        <Link
          href="/register"
          className="px-8 py-5 rounded-3xl text-xl md:text-2xl font-extrabold transition-transform text-white shadow-[0_8px_0_0_var(--purple-dark)] active:translate-y-1 active:shadow-[0_2px_0_0_var(--purple-dark)]"
          style={{ background: "var(--purple)" }}
        >
          Suscribite para más lecciones ✨
        </Link>
        <BigButton variant="soft" onClick={onRestart}>
          Back to start
        </BigButton>
      </div>
    </Card>
  );
}

function SummaryRow({
  title,
  body,
  icon,
}: {
  title: string;
  body: string;
  icon: string;
}) {
  return (
    <div
      className="flex gap-4 items-start rounded-2xl p-4"
      style={{ background: "var(--cream)" }}
    >
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 bg-white"
        aria-hidden
      >
        {icon}
      </div>
      <div>
        <h3 className="font-extrabold text-lg">{title}</h3>
        <p
          className="font-medium"
          style={{ color: "color-mix(in oklab, var(--navy) 75%, transparent)" }}
        >
          {body}
        </p>
      </div>
    </div>
  );
}
