import { useEffect, useState } from "react";
import { BookOpen, Flame, TrendingUp, Target, Brain, ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { showToast } from "@/components/ToastContainer";

function getStreak(): number {
  const stored = localStorage.getItem("lf_streak");
  return stored ? parseInt(stored, 10) : 3;
}

function getXP(): number {
  const stored = localStorage.getItem("lf_xp");
  return stored ? parseInt(stored, 10) : 420;
}

const weakAreas = ["Recursion", "Binary Trees", "Dynamic Programming"];
const recommended = { title: "Graph Traversal", subtitle: "BFS & DFS explained simply", progress: 0 };

export default function Dashboard() {
  const [streak, setStreak] = useState(getStreak);
  const [xp, setXP] = useState(getXP);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Fake loading delay
    const t = setTimeout(() => {
      setLoaded(true);
      showToast("Welcome back! Let's keep learning 📚", "info");
    }, 400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    localStorage.setItem("lf_streak", String(streak));
    localStorage.setItem("lf_xp", String(xp));
  }, [streak, xp]);

  const xpPercent = Math.min((xp / 1000) * 100, 100);

  return (
    <main className="mx-auto max-w-6xl px-5 py-8">
      {/* Header */}
      <div className={`mb-8 transition-all duration-500 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <h1 className="font-heading text-3xl font-bold text-foreground">
          Hey there! 👋
        </h1>
        <p className="mt-1 text-muted-foreground">Here's your learning snapshot for today.</p>
      </div>

      {/* XP Bar */}
      <div className={`mb-8 rounded-2xl border border-border bg-card p-5 shadow-card transition-all duration-500 delay-100 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <div className="flex items-center justify-between mb-2">
          <span className="font-heading font-semibold text-foreground text-sm">Level Progress</span>
          <span className="text-xs text-muted-foreground">{xp} / 1000 XP</span>
        </div>
        <div className="h-3.5 w-full rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-lavender-glow transition-all duration-1000 ease-out"
            style={{ width: loaded ? `${xpPercent}%` : "0%" }}
          />
        </div>
      </div>

      {/* Cards grid — intentionally asymmetric */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {/* Today's Focus — spans 2 */}
        <div className={`md:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-500 delay-150 hover:shadow-hover hover:-translate-y-0.5 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
              <Target className="h-5 w-5 text-primary" />
            </div>
            <h2 className="font-heading text-lg font-semibold text-foreground">Today's Focus</h2>
          </div>
          <p className="text-muted-foreground text-sm mb-4">Continue with your current topic to maintain momentum.</p>
          <Link
            to="/learning"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:shadow-soft hover:scale-[1.02]"
          >
            Continue Learning <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Daily Streak */}
        <div className={`rounded-2xl border border-border bg-card p-5 shadow-card transition-all duration-500 delay-200 hover:shadow-hover hover:-translate-y-0.5 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="flex items-center gap-2 mb-2">
            <Flame className="h-5 w-5 text-streak" />
            <h2 className="font-heading font-semibold text-foreground">Streak</h2>
          </div>
          <p className="text-4xl font-bold font-heading text-streak">{streak}</p>
          <p className="text-xs text-muted-foreground mt-1">days in a row 🔥</p>
        </div>

        {/* Progress Snapshot */}
        <div className={`rounded-2xl border border-border bg-card p-5 shadow-card transition-all duration-500 delay-250 hover:shadow-hover hover:-translate-y-0.5 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-5 w-5 text-success" />
            <h2 className="font-heading font-semibold text-foreground text-sm">Progress</h2>
          </div>
          <div className="space-y-2">
            {["Arrays", "Sorting", "Linked Lists"].map((topic, i) => (
              <div key={topic} className="flex items-center gap-2">
                <div className="h-2 flex-1 rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full rounded-full bg-success transition-all duration-700"
                    style={{ width: loaded ? `${85 - i * 20}%` : "0%" }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-14 text-right">{85 - i * 20}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weak Areas */}
        <div className={`md:col-span-2 rounded-2xl border border-border bg-card p-5 shadow-card transition-all duration-500 delay-300 hover:shadow-hover hover:-translate-y-0.5 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="flex items-center gap-2 mb-3">
            <Brain className="h-5 w-5 text-primary" />
            <h2 className="font-heading font-semibold text-foreground">Weak Areas</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {weakAreas.map((area) => (
              <Link
                key={area}
                to="/learning"
                className="rounded-xl border border-destructive/20 bg-destructive/5 px-3 py-1.5 text-sm font-medium text-destructive transition-all hover:bg-destructive/10 hover:scale-[1.03]"
              >
                {area}
              </Link>
            ))}
          </div>
        </div>

        {/* Recommended */}
        <div className={`rounded-2xl border border-border bg-card p-5 shadow-card transition-all duration-500 delay-350 hover:shadow-hover hover:-translate-y-0.5 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <span className="text-xs font-semibold text-primary bg-primary/10 rounded-full px-2 py-0.5">Suggested</span>
          </div>
          <h3 className="font-heading font-semibold text-foreground text-sm mb-1">{recommended.title}</h3>
          <p className="text-xs text-muted-foreground mb-3">{recommended.subtitle}</p>
          <Link
            to="/learning"
            className="text-xs font-semibold text-primary hover:underline"
          >
            Start →
          </Link>
        </div>

        {/* Sticky note */}
        <div className={`rounded-2xl bg-sticky border border-sticky-dark/10 p-5 shadow-card rotate-[-1deg] transition-all duration-500 delay-400 hover:rotate-0 hover:shadow-hover ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <p className="font-handwritten text-xl text-sticky-dark leading-snug">
            Keep going, you're improving! 🌟
          </p>
          <p className="font-handwritten text-sm text-sticky-dark/60 mt-2">— your study buddy</p>
        </div>
      </div>
    </main>
  );
}
