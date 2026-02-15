import { useState } from "react";
import { Check, Lock, ChevronDown, ChevronRight, BookOpen, Circle, CheckCircle2 } from "lucide-react";
import { showToast } from "@/components/ToastContainer";

interface Lesson {
  id: string;
  title: string;
  locked: boolean;
  completed: boolean;
}

interface Topic {
  id: string;
  title: string;
  lessons: Lesson[];
}

const topics: Topic[] = [
  {
    id: "arrays",
    title: "Arrays & Strings",
    lessons: [
      { id: "a1", title: "Introduction to Arrays", locked: false, completed: true },
      { id: "a2", title: "Two Pointer Technique", locked: false, completed: true },
      { id: "a3", title: "Sliding Window", locked: false, completed: false },
      { id: "a4", title: "Prefix Sums", locked: true, completed: false },
    ],
  },
  {
    id: "sorting",
    title: "Sorting Algorithms",
    lessons: [
      { id: "s1", title: "Bubble Sort", locked: false, completed: true },
      { id: "s2", title: "Merge Sort", locked: false, completed: false },
      { id: "s3", title: "Quick Sort", locked: true, completed: false },
    ],
  },
  {
    id: "trees",
    title: "Trees & Graphs",
    lessons: [
      { id: "t1", title: "Binary Tree Basics", locked: false, completed: false },
      { id: "t2", title: "Tree Traversals", locked: true, completed: false },
      { id: "t3", title: "BST Operations", locked: true, completed: false },
    ],
  },
];

const lessonContent: Record<string, { explanation: string; keywords: string[]; example: string }> = {
  a1: {
    explanation: "An array is a contiguous block of memory that stores elements of the same type. Arrays allow O(1) access by index but O(n) insertion and deletion in the worst case.",
    keywords: ["contiguous memory", "O(1) access", "index-based"],
    example: "const nums = [1, 2, 3, 4, 5];\nconsole.log(nums[2]); // Output: 3\n\n// Inserting at index 1\nnums.splice(1, 0, 10);\n// nums is now [1, 10, 2, 3, 4, 5]",
  },
  a2: {
    explanation: "The two-pointer technique uses two pointers that move through the array, often from opposite ends, to solve problems in O(n) time instead of O(n²).",
    keywords: ["two pointers", "O(n) time", "sorted arrays"],
    example: "function twoSum(nums, target) {\n  let left = 0, right = nums.length - 1;\n  while (left < right) {\n    const sum = nums[left] + nums[right];\n    if (sum === target) return [left, right];\n    if (sum < target) left++;\n    else right--;\n  }\n}",
  },
  a3: {
    explanation: "The sliding window technique maintains a window of elements that slides across the array. It's great for problems involving subarrays or substrings of a fixed or variable size.",
    keywords: ["window", "subarray", "optimization"],
    example: "function maxSubarraySum(nums, k) {\n  let sum = 0;\n  for (let i = 0; i < k; i++) sum += nums[i];\n  let max = sum;\n  for (let i = k; i < nums.length; i++) {\n    sum += nums[i] - nums[i - k];\n    max = Math.max(max, sum);\n  }\n  return max;\n}",
  },
  s1: {
    explanation: "Bubble sort repeatedly steps through the list, compares adjacent elements, and swaps them if they're in the wrong order. It's simple but inefficient with O(n²) time complexity.",
    keywords: ["comparison sort", "O(n²)", "stable sort"],
    example: "function bubbleSort(arr) {\n  for (let i = 0; i < arr.length; i++) {\n    for (let j = 0; j < arr.length - i - 1; j++) {\n      if (arr[j] > arr[j+1]) {\n        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];\n      }\n    }\n  }\n  return arr;\n}",
  },
  s2: {
    explanation: "Merge sort divides the array in half recursively, sorts each half, and merges them back together. It guarantees O(n log n) time complexity.",
    keywords: ["divide and conquer", "O(n log n)", "recursive"],
    example: "function mergeSort(arr) {\n  if (arr.length <= 1) return arr;\n  const mid = Math.floor(arr.length / 2);\n  const left = mergeSort(arr.slice(0, mid));\n  const right = mergeSort(arr.slice(mid));\n  return merge(left, right);\n}",
  },
  t1: {
    explanation: "A binary tree is a hierarchical data structure where each node has at most two children: left and right. The topmost node is called the root.",
    keywords: ["root node", "left child", "right child", "hierarchical"],
    example: "class TreeNode {\n  constructor(val) {\n    this.val = val;\n    this.left = null;\n    this.right = null;\n  }\n}\n\nconst root = new TreeNode(1);\nroot.left = new TreeNode(2);\nroot.right = new TreeNode(3);",
  },
};

export default function Learning() {
  const [activeTopic, setActiveTopic] = useState("arrays");
  const [activeLesson, setActiveLesson] = useState("a3");
  const [expandedExample, setExpandedExample] = useState(false);
  const [understood, setUnderstood] = useState<Set<string>>(new Set());

  const content = lessonContent[activeLesson];
  const currentTopic = topics.find((t) => t.id === activeTopic);
  const currentLesson = currentTopic?.lessons.find((l) => l.id === activeLesson);

  const handleMarkUnderstood = () => {
    setUnderstood((prev) => new Set(prev).add(activeLesson));
    showToast("Nice! Marked as understood ✅", "success");
  };

  return (
    <main className="mx-auto max-w-6xl px-5 py-8">
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Left nav panel */}
        <aside className="w-full lg:w-72 shrink-0">
          <div className="rounded-2xl border border-border bg-card p-4 shadow-card sticky top-20">
            <h2 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" /> Topics
            </h2>
            <div className="space-y-1">
              {topics.map((topic) => {
                const isActive = topic.id === activeTopic;
                const completedCount = topic.lessons.filter((l) => l.completed || understood.has(l.id)).length;
                return (
                  <div key={topic.id}>
                    <button
                      onClick={() => setActiveTopic(topic.id)}
                      className={`w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all
                        ${isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}
                    >
                      <span className="flex items-center gap-2">
                        {isActive ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                        {topic.title}
                      </span>
                      {/* Progress dots */}
                      <span className="flex gap-1">
                        {topic.lessons.map((l) => (
                          <span
                            key={l.id}
                            className={`h-2 w-2 rounded-full ${
                              l.completed || understood.has(l.id)
                                ? "bg-success"
                                : l.locked
                                ? "bg-muted-foreground/30"
                                : "bg-primary/30"
                            }`}
                          />
                        ))}
                      </span>
                    </button>

                    {/* Lessons */}
                    {isActive && (
                      <div className="ml-4 mt-1 space-y-0.5 animate-slide-up">
                        {topic.lessons.map((lesson) => (
                          <button
                            key={lesson.id}
                            disabled={lesson.locked}
                            onClick={() => {
                              setActiveLesson(lesson.id);
                              setExpandedExample(false);
                            }}
                            className={`w-full flex items-center gap-2 rounded-lg px-3 py-2 text-xs transition-all
                              ${lesson.locked
                                ? "text-muted-foreground/40 cursor-not-allowed"
                                : lesson.id === activeLesson
                                ? "bg-primary text-primary-foreground font-semibold shadow-soft"
                                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                              }`}
                          >
                            {lesson.locked ? (
                              <Lock className="h-3 w-3" />
                            ) : lesson.completed || understood.has(lesson.id) ? (
                              <CheckCircle2 className="h-3 w-3 text-success" />
                            ) : (
                              <Circle className="h-3 w-3" />
                            )}
                            {lesson.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Right content */}
        <div className="flex-1 min-w-0">
          {content ? (
            <div className="animate-slide-up space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <h1 className="font-heading text-2xl font-bold text-foreground mb-1">
                  {currentLesson?.title}
                </h1>
                <p className="text-xs text-muted-foreground mb-4">
                  {currentTopic?.title}
                </p>

                {/* Explanation */}
                <div className="prose prose-sm max-w-none">
                  <p className="text-foreground leading-relaxed">
                    {content.explanation.split(" ").map((word, i) =>
                      content.keywords.some((kw) =>
                        kw.toLowerCase().split(" ").includes(word.toLowerCase().replace(/[.,]/g, ""))
                      ) ? (
                        <span key={i} className="font-semibold text-primary bg-primary/10 rounded px-0.5">
                          {word}{" "}
                        </span>
                      ) : (
                        <span key={i}>{word} </span>
                      )
                    )}
                  </p>
                </div>

                {/* Keywords */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {content.keywords.map((kw) => (
                    <span key={kw} className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Expandable example */}
              <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
                <button
                  onClick={() => setExpandedExample(!expandedExample)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-secondary/50 transition-colors"
                >
                  <span className="font-heading font-semibold text-foreground text-sm">💻 Code Example</span>
                  <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${expandedExample ? "rotate-180" : ""}`} />
                </button>
                {expandedExample && (
                  <div className="px-5 pb-5 animate-slide-up">
                    <pre className="rounded-xl bg-accent text-accent-foreground p-4 text-sm overflow-x-auto font-mono leading-relaxed">
                      {content.example}
                    </pre>
                  </div>
                )}
              </div>

              {/* Mark as understood */}
              <button
                onClick={handleMarkUnderstood}
                disabled={understood.has(activeLesson)}
                className={`flex items-center gap-2 rounded-2xl px-6 py-3 font-heading font-semibold transition-all
                  ${understood.has(activeLesson)
                    ? "bg-success/10 text-success border border-success/20 cursor-default"
                    : "bg-primary text-primary-foreground shadow-soft hover:shadow-hover hover:scale-[1.02]"
                  }`}
              >
                <Check className="h-4 w-4" />
                {understood.has(activeLesson) ? "Understood!" : "Mark as Understood"}
              </button>
            </div>
          ) : (
            <div className="rounded-2xl border border-border bg-card p-10 text-center shadow-card">
              <p className="text-muted-foreground">Select a lesson to begin learning.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
