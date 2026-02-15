import { useState, useEffect, useCallback } from "react";
import { showToast } from "@/components/ToastContainer";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is the time complexity of accessing an element in an array by index?",
    options: ["O(n)", "O(1)", "O(log n)", "O(n²)"],
    correct: 1,
    explanation: "Arrays store elements in contiguous memory, so accessing by index is a direct memory offset calculation — constant time O(1).",
  },
  {
    id: 2,
    question: "Which sorting algorithm uses the divide-and-conquer approach?",
    options: ["Bubble Sort", "Insertion Sort", "Merge Sort", "Selection Sort"],
    correct: 2,
    explanation: "Merge sort divides the array into halves, recursively sorts each half, then merges them — a classic divide-and-conquer pattern.",
  },
  {
    id: 3,
    question: "In a binary tree, what is the maximum number of children a node can have?",
    options: ["1", "2", "3", "Unlimited"],
    correct: 1,
    explanation: "A binary tree allows at most two children per node: a left child and a right child.",
  },
  {
    id: 4,
    question: "What technique uses two variables that move through data to find a solution?",
    options: ["Dynamic Programming", "Greedy Algorithm", "Two Pointer Technique", "Backtracking"],
    correct: 2,
    explanation: "The two-pointer technique uses two variables (pointers) that traverse the data, often from opposite ends, to solve problems efficiently.",
  },
  {
    id: 5,
    question: "What is the best-case time complexity of Bubble Sort?",
    options: ["O(n²)", "O(n log n)", "O(n)", "O(1)"],
    correct: 2,
    explanation: "When the array is already sorted and an optimization flag is used, Bubble Sort only needs one pass through the array — O(n).",
  },
];

export default function Quiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [animState, setAnimState] = useState<"idle" | "correct" | "incorrect">("idle");

  const q = questions[currentQ];
  const progress = ((currentQ + (answered ? 1 : 0)) / questions.length) * 100;

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
  };

  const handleSubmit = () => {
    if (selected === null) return;
    setAnswered(true);

    const isCorrect = selected === q.correct;
    setAnimState(isCorrect ? "correct" : "incorrect");

    if (isCorrect) {
      setScore((s) => s + 1);
      showToast("Correct! 🎉", "success");
      // Add XP
      const currentXP = parseInt(localStorage.getItem("lf_xp") || "420", 10);
      localStorage.setItem("lf_xp", String(currentXP + 20));
    } else {
      showToast("Not quite — check the explanation below.", "error");
    }

    setTimeout(() => setAnimState("idle"), 600);
  };

  const handleNext = () => {
    if (currentQ + 1 >= questions.length) {
      setFinished(true);
      showToast(`Quiz complete! Score: ${score}/${questions.length}`, "info");
    } else {
      setCurrentQ((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <main className="mx-auto max-w-2xl px-5 py-16 text-center animate-slide-up">
        <div className="rounded-3xl border border-border bg-card p-10 shadow-hover">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Quiz Complete! 🎊</h1>
          <p className="text-5xl font-bold font-heading text-primary my-6">
            {score}/{questions.length}
          </p>
          <p className="text-muted-foreground mb-6">
            {score === questions.length
              ? "Perfect score! You really know your stuff."
              : score >= questions.length / 2
              ? "Good job! Keep practicing to improve."
              : "Keep studying — you'll get there!"}
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={handleRestart}
              className="rounded-2xl bg-primary px-6 py-3 font-heading font-semibold text-primary-foreground shadow-soft transition-all hover:shadow-hover hover:scale-[1.02]"
            >
              Try Again
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-5 py-10">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-muted-foreground">Question {currentQ + 1} of {questions.length}</span>
          <span className="text-xs font-semibold text-primary">{Math.round(progress)}%</span>
        </div>
        <div className="h-2.5 w-full rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-lavender-glow transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className={`rounded-2xl border border-border bg-card p-7 shadow-card animate-slide-up
        ${animState === "correct" ? "animate-correct-pulse" : ""}
        ${animState === "incorrect" ? "animate-shake" : ""}`}
      >
        <h2 className="font-heading text-xl font-bold text-foreground mb-6">{q.question}</h2>

        <div className="space-y-3">
          {q.options.map((opt, idx) => {
            let optionStyle = "border-border bg-card hover:bg-secondary hover:border-primary/30";

            if (answered) {
              if (idx === q.correct) {
                optionStyle = "border-success bg-success-light text-success";
              } else if (idx === selected && idx !== q.correct) {
                optionStyle = "border-destructive bg-destructive/10 text-destructive";
              } else {
                optionStyle = "border-border bg-muted/50 text-muted-foreground opacity-60";
              }
            } else if (idx === selected) {
              optionStyle = "border-primary bg-primary/10 text-primary ring-2 ring-primary/20";
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={answered}
                className={`w-full flex items-center gap-3 rounded-xl border-2 px-4 py-3.5 text-left text-sm font-medium transition-all duration-200 ${optionStyle}
                  ${!answered ? "cursor-pointer hover:scale-[1.01]" : "cursor-default"}`}
              >
                <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold
                  ${idx === selected && !answered ? "bg-primary text-primary-foreground" :
                    answered && idx === q.correct ? "bg-success text-primary-foreground" :
                    answered && idx === selected ? "bg-destructive text-primary-foreground" :
                    "bg-secondary text-muted-foreground"}`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                {opt}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {answered && (
          <div className="mt-5 rounded-xl bg-secondary/50 border border-border p-4 animate-slide-up">
            <p className="text-xs font-semibold text-muted-foreground mb-1">Explanation</p>
            <p className="text-sm text-foreground leading-relaxed">{q.explanation}</p>
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3">
          {!answered ? (
            <button
              onClick={handleSubmit}
              disabled={selected === null}
              className={`rounded-xl px-6 py-2.5 font-heading font-semibold transition-all
                ${selected !== null
                  ? "bg-primary text-primary-foreground shadow-soft hover:shadow-hover hover:scale-[1.02]"
                  : "bg-muted text-muted-foreground cursor-not-allowed"}`}
            >
              Check Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="rounded-xl bg-primary px-6 py-2.5 font-heading font-semibold text-primary-foreground shadow-soft transition-all hover:shadow-hover hover:scale-[1.02]"
            >
              {currentQ + 1 >= questions.length ? "See Results" : "Next Question →"}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
