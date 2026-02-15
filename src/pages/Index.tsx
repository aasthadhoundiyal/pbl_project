import { Link } from "react-router-dom";
import { ArrowRight, Zap, Brain, Target, TrendingUp, Sparkles, Star } from "lucide-react";
import { MouseEvent } from "react";

function HeroBlob({ className }: { className: string }) {
  return (
    <div
      className={`absolute rounded-full opacity-30 blur-3xl ${className}`}
      style={{ background: "linear-gradient(135deg, hsl(var(--lavender)), hsl(var(--lavender-glow)))" }}
    />
  );
}

function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground ${className}`}>
      {children}
    </span>
  );
}

const features = [
  {
    icon: Brain,
    title: "Adaptive Learning",
    desc: "Content adjusts to your pace and understanding. No more one-size-fits-all.",
    badge: "AI",
    size: "large" as const,
  },
  {
    icon: Target,
    title: "Weak Area Focus",
    desc: "Identifies gaps in your knowledge and creates targeted practice sessions.",
    badge: "SMART",
    size: "medium" as const,
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    desc: "Visual stats that actually make sense. See your growth over time.",
    badge: null,
    size: "medium" as const,
  },
  {
    icon: Zap,
    title: "Quick Quizzes",
    desc: "Bite-sized assessments with instant feedback and explanations.",
    badge: "NEW",
    size: "small" as const,
  },
];

const sizeClasses = {
  large: "col-span-2 row-span-2 p-7",
  medium: "col-span-1 row-span-1 p-5",
  small: "col-span-1 row-span-1 p-5",
};

export default function Landing() {
  const handleRipple = (e: MouseEvent<HTMLAnchorElement>) => {
    const btn = e.currentTarget;
    const ripple = document.createElement("span");
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    ripple.className = "absolute rounded-full bg-primary-foreground/30 animate-ripple pointer-events-none";
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  return (
    <main className="min-h-screen overflow-hidden">
      {/* Hero */}
      <section className="relative mx-auto flex max-w-6xl flex-col-reverse items-center gap-10 px-5 pb-16 pt-20 md:flex-row md:gap-16 md:pt-28">
        {/* Blobs */}
        <HeroBlob className="h-72 w-72 -left-20 top-10 animate-float" />
        <HeroBlob className="h-56 w-56 right-10 bottom-0 animate-float-slow" />

        {/* Text */}
        <div className="relative z-10 flex-1 space-y-6">
          <Badge className="animate-slide-up">
            <Sparkles className="h-3 w-3" /> Built for curious minds
          </Badge>

          <h1 className="text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl animate-slide-up stagger-1">
            Your Learning,{" "}
            <span className="bg-gradient-to-r from-primary to-lavender-glow bg-clip-text text-transparent">
              Your Way
            </span>
          </h1>

          <p className="max-w-md text-lg leading-relaxed text-muted-foreground animate-slide-up stagger-2">
            A learning platform that actually gets you. It adapts, tracks your progress,
            and makes studying feel less like a chore.
          </p>

          <div className="flex flex-wrap gap-3 animate-slide-up stagger-3">
            <Link
              to="/dashboard"
              onClick={handleRipple}
              className="relative overflow-hidden inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 font-heading font-semibold text-primary-foreground shadow-soft transition-all duration-200 hover:shadow-hover hover:scale-[1.03]"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/learning"
              onClick={handleRipple}
              className="relative overflow-hidden inline-flex items-center gap-2 rounded-2xl border-2 border-border bg-card px-6 py-3 font-heading font-semibold text-foreground transition-all duration-200 hover:border-primary hover:shadow-soft"
            >
              Explore Topics
            </Link>
          </div>

          <p className="font-handwritten text-lg text-muted-foreground animate-slide-up stagger-4">
            ✨ No sign-up needed — jump right in!
          </p>
        </div>

        {/* Visual side — CSS shapes */}
        <div className="relative flex-1 flex items-center justify-center min-h-[320px]">
          {/* Main card */}
          <div className="relative z-10 w-56 rounded-3xl bg-card p-5 shadow-hover animate-float border border-border">
            <div className="mb-3 flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-primary/20 flex items-center justify-center">
                <Star className="h-4 w-4 text-primary" />
              </div>
              <span className="font-heading font-semibold text-sm text-foreground">Today's Progress</span>
            </div>
            <div className="h-3 w-full rounded-full bg-secondary overflow-hidden">
              <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-primary to-lavender-glow animate-progress-fill" />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">75% completed</p>
          </div>

          {/* Floating small cards */}
          <div className="absolute -top-2 -right-4 z-20 rounded-2xl bg-success/10 border border-success/20 px-3 py-2 animate-float-slow">
            <span className="text-sm font-semibold text-success">🔥 5-day streak</span>
          </div>

          <div className="absolute -bottom-4 -left-6 z-20 rounded-2xl bg-sticky border border-sticky-dark/20 px-3 py-2 shadow-card rotate-[-3deg]">
            <span className="font-handwritten text-base text-sticky-dark">You got this! 💪</span>
          </div>

          {/* Background shapes */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full border-2 border-dashed border-primary/20 animate-[spin_30s_linear_infinite]" />
          <div className="absolute top-8 left-4 h-4 w-4 rounded-full bg-primary/30" />
          <div className="absolute bottom-12 right-8 h-6 w-6 rounded-lg bg-streak/30 rotate-12" />
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-5 pb-24">
        <h2 className="mb-2 text-center font-heading text-3xl font-bold text-foreground">
          What makes it different
        </h2>
        <p className="mb-12 text-center text-muted-foreground">
          Not just another flashcard app.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className={`group relative rounded-2xl border border-border bg-card shadow-card transition-all duration-300 hover:shadow-hover hover:-translate-y-1 animate-slide-up
                  ${f.size === "large" ? "sm:col-span-2 lg:col-span-2 p-7" : "p-5"}
                  stagger-${i + 1}`}
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  {f.badge && (
                    <Badge className="bg-primary/10 text-primary">{f.badge}</Badge>
                  )}
                </div>
                <h3 className="mb-1 font-heading text-lg font-semibold text-foreground">{f.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-5 pb-24 text-center">
        <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-secondary to-lavender-light p-10 border border-border">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Ready to start learning?</h2>
          <p className="text-muted-foreground mb-6">Jump into your dashboard and pick up where you left off.</p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-2xl bg-primary px-8 py-3.5 font-heading font-semibold text-primary-foreground shadow-soft transition-all duration-200 hover:shadow-hover hover:scale-[1.03]"
          >
            Open Dashboard <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
