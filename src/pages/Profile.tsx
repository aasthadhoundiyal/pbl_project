import { useState, useEffect } from "react";
import { User, Flame, Zap, BookOpen, Trophy, Sun, Moon } from "lucide-react";
import { showToast } from "@/components/ToastContainer";

export default function Profile() {
  const [username, setUsername] = useState(() => localStorage.getItem("lf_username") || "Student");
  const [editing, setEditing] = useState(false);
  const [tempName, setTempName] = useState(username);
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"));

  const streak = parseInt(localStorage.getItem("lf_streak") || "3", 10);
  const xp = parseInt(localStorage.getItem("lf_xp") || "420", 10);

  const skills = [
    { name: "Arrays", level: 85 },
    { name: "Sorting", level: 65 },
    { name: "Linked Lists", level: 45 },
    { name: "Trees", level: 20 },
    { name: "Graphs", level: 10 },
  ];

  // Streak history (fake last 7 days)
  const streakHistory = [true, true, true, false, true, true, true];
  const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const handleSave = () => {
    setUsername(tempName);
    localStorage.setItem("lf_username", tempName);
    setEditing(false);
    showToast("Username updated! 🎉", "success");
  };

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("lf_theme", next ? "dark" : "light");
    showToast(next ? "Lavender dark mode 🌙" : "Light mode ☀️", "info");
  };

  useEffect(() => {
    const saved = localStorage.getItem("lf_theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  return (
    <main className="mx-auto max-w-3xl px-5 py-10">
      {/* Profile header */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-card mb-6 animate-slide-up">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-lavender-glow text-primary-foreground shadow-soft">
            <User className="h-7 w-7" />
          </div>
          <div className="flex-1">
            {editing ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="rounded-xl border border-input bg-background px-3 py-1.5 text-lg font-heading font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  autoFocus
                  onKeyDown={(e) => e.key === "Enter" && handleSave()}
                />
                <button onClick={handleSave} className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">Save</button>
                <button onClick={() => { setEditing(false); setTempName(username); }} className="rounded-lg bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground">Cancel</button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <h1 className="font-heading text-2xl font-bold text-foreground">{username}</h1>
                <button
                  onClick={() => setEditing(true)}
                  className="text-xs text-primary hover:underline"
                >
                  edit
                </button>
              </div>
            )}
            <p className="text-sm text-muted-foreground mt-0.5">Curious learner since 2024</p>
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card transition-all hover:bg-secondary hover:scale-105"
          >
            {isDark ? <Sun className="h-4 w-4 text-streak" /> : <Moon className="h-4 w-4 text-primary" />}
          </button>
        </div>
      </div>

      {/* Stats cards — asymmetric */}
      <div className="grid grid-cols-2 gap-4 mb-6 md:grid-cols-4">
        <div className="rounded-2xl border border-border bg-card p-4 shadow-card animate-slide-up stagger-1 hover:shadow-hover transition-all">
          <Flame className="h-5 w-5 text-streak mb-1" />
          <p className="text-2xl font-bold font-heading text-foreground">{streak}</p>
          <p className="text-xs text-muted-foreground">Day Streak</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 shadow-card animate-slide-up stagger-2 hover:shadow-hover transition-all">
          <Zap className="h-5 w-5 text-primary mb-1" />
          <p className="text-2xl font-bold font-heading text-foreground">{xp}</p>
          <p className="text-xs text-muted-foreground">Total XP</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 shadow-card animate-slide-up stagger-3 hover:shadow-hover transition-all">
          <BookOpen className="h-5 w-5 text-success mb-1" />
          <p className="text-2xl font-bold font-heading text-foreground">12</p>
          <p className="text-xs text-muted-foreground">Lessons Done</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 shadow-card animate-slide-up stagger-4 hover:shadow-hover transition-all">
          <Trophy className="h-5 w-5 text-sticky-dark mb-1" />
          <p className="text-2xl font-bold font-heading text-foreground">3</p>
          <p className="text-xs text-muted-foreground">Quizzes Aced</p>
        </div>
      </div>

      {/* Skill progress */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-card mb-6 animate-slide-up stagger-3">
        <h2 className="font-heading text-lg font-semibold text-foreground mb-4">Skill Progress</h2>
        <div className="space-y-4">
          {skills.map((skill) => (
            <div key={skill.name}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-foreground">{skill.name}</span>
                <span className="text-xs text-muted-foreground">{skill.level}%</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-lavender-glow transition-all duration-1000 ease-out animate-progress-fill"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Streak history */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-card animate-slide-up stagger-4">
        <h2 className="font-heading text-lg font-semibold text-foreground mb-4">This Week</h2>
        <div className="flex items-end justify-between gap-2">
          {streakHistory.map((active, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <div
                className={`h-10 w-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all
                  ${active
                    ? "bg-gradient-to-br from-streak to-streak/80 text-primary-foreground shadow-soft"
                    : "bg-muted text-muted-foreground"}`}
              >
                {active ? "🔥" : "–"}
              </div>
              <span className="text-[10px] text-muted-foreground">{dayLabels[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
