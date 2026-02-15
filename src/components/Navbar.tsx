import { useEffect, useRef, MouseEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { BookOpen, LayoutDashboard, Brain, HelpCircle, User, Sparkles } from "lucide-react";

const navItems = [
  { path: "/", label: "Home", icon: Sparkles },
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/learning", label: "Learn", icon: BookOpen },
  { path: "/quiz", label: "Quiz", icon: HelpCircle },
  { path: "/profile", label: "Profile", icon: User },
];

export default function Navbar() {
  const location = useLocation();

  const handleRipple = (e: MouseEvent<HTMLAnchorElement>) => {
    const btn = e.currentTarget;
    const ripple = document.createElement("span");
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    ripple.className = "absolute rounded-full bg-primary/20 animate-ripple pointer-events-none";
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-primary transition-transform group-hover:scale-110">
            <BookOpen className="h-5 w-5" />
          </div>
          <span className="font-heading text-xl font-semibold text-white">
            Learning Platform
          </span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={handleRipple}
                className={`relative overflow-hidden flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-medium transition-all duration-200
                  ${isActive
                    ? "bg-primary text-primary-foreground shadow-soft animate-pulse-glow"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
