import { Bookmark, ChevronLeft, ChevronRight, Clock3 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Static illustration of the computer-based examination screen for the
 * homepage. It is not interactive; the real engine arrives in Milestone 4.
 */
const options = ["20%", "25%", "30%", "80%"];

// Palette states for questions 1–30: a = answered, m = marked for review, c = current, u = unanswered
const palette = Array.from({ length: 30 }, (_, i) => {
  const n = i + 1;
  if (n === 23) return "c";
  if (n > 23) return "u";
  return n === 8 || n === 17 ? "m" : "a";
});

export function ExamPreview({ className }: { className?: string }) {
  return (
    <figure
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-border bg-card shadow-[0_1px_2px_rgba(16,24,20,.04),0_24px_60px_-24px_rgba(16,24,20,.28)]",
        className
      )}
      aria-label="Illustration of the Soma examination screen"
    >
      {/* Exam top bar */}
      <div className="flex items-center justify-between gap-3 border-b border-border bg-muted/50 px-4 py-3 sm:px-5">
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-foreground">PE Mock Examination</p>
          <p className="text-[0.7rem] text-muted-foreground">Problem solving · Question 23 of 100</p>
        </div>
        <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 font-mono text-xs font-semibold tabular-nums text-foreground">
          <Clock3 className="size-3.5 text-brand" aria-hidden />
          01:42:16
        </div>
      </div>
      <div className="h-1 bg-border">
        <div className="h-full w-[23%] bg-brand" />
      </div>

      <div className="grid gap-5 p-4 sm:p-5 lg:grid-cols-[1fr_auto]">
        {/* Question */}
        <div className="min-w-0">
          <p className="text-[0.95rem] leading-relaxed text-foreground">
            A shopkeeper buys a kira for Nu. 4,000 and sells it for Nu. 5,000. What is the profit percentage?
          </p>
          <ul className="mt-4 space-y-2">
            {options.map((o, i) => (
              <li
                key={o}
                className={cn(
                  "flex items-center gap-3 rounded-lg border px-3 py-2.5 text-sm",
                  i === 1 ? "border-brand bg-brand-soft font-medium text-foreground" : "border-border text-foreground/85"
                )}
              >
                <span
                  className={cn(
                    "grid size-6 shrink-0 place-items-center rounded-full border text-[0.7rem] font-semibold",
                    i === 1 ? "border-brand bg-brand text-brand-foreground" : "border-border text-muted-foreground"
                  )}
                >
                  {"ABCD"[i]}
                </span>
                {o}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-border px-2.5 py-1.5 text-xs text-muted-foreground">
              <Bookmark className="size-3.5" aria-hidden /> Mark for review
            </span>
            <span className="flex gap-2">
              <span className="inline-flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-xs text-foreground">
                <ChevronLeft className="size-3.5" aria-hidden /> Previous
              </span>
              <span className="inline-flex items-center gap-1 rounded-lg bg-primary px-2.5 py-1.5 text-xs text-primary-foreground">
                Next <ChevronRight className="size-3.5" aria-hidden />
              </span>
            </span>
          </div>
        </div>

        {/* Question palette */}
        <div className="hidden w-[11.5rem] lg:block">
          <p className="eyebrow mb-2.5">Questions</p>
          <div className="grid grid-cols-6 gap-1.5">
            {palette.map((s, i) => (
              <span
                key={i}
                className={cn(
                  "grid aspect-square place-items-center rounded-md text-[0.62rem] font-semibold tabular-nums",
                  s === "a" && "bg-brand text-brand-foreground",
                  s === "m" && "bg-warning/25 text-foreground ring-1 ring-warning",
                  s === "c" && "bg-background text-foreground ring-2 ring-foreground",
                  s === "u" && "bg-muted text-muted-foreground"
                )}
              >
                {i + 1}
              </span>
            ))}
          </div>
          <ul className="mt-3 space-y-1.5 text-[0.65rem] text-muted-foreground">
            <li className="flex items-center gap-2"><span className="size-2.5 rounded-sm bg-brand" /> Answered</li>
            <li className="flex items-center gap-2"><span className="size-2.5 rounded-sm bg-warning/25 ring-1 ring-warning" /> Marked for review</li>
            <li className="flex items-center gap-2"><span className="size-2.5 rounded-sm bg-muted ring-1 ring-border" /> Not answered</li>
          </ul>
        </div>
      </div>
      <figcaption className="sr-only">Preview of a timed, computer-based mock examination with a question palette.</figcaption>
    </figure>
  );
}
