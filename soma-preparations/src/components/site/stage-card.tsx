import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { OriginLabel } from "@/components/site/origin-label";
import type { BcseStage } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Card for one BCSE stage (PE or ME), used on the homepage and the BCSE page. */
export function StageCard({ stage, headingLevel = "h3", className }: { stage: BcseStage; headingLevel?: "h2" | "h3"; className?: string }) {
  const Heading = headingLevel;
  return (
    <article
      className={cn(
        "group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-[0_1px_2px_rgba(16,24,20,.04)] transition-shadow hover:shadow-[0_18px_40px_-24px_rgba(16,24,20,.35)] sm:p-8",
        className
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-3">
          <span className="grid h-11 min-w-11 place-items-center rounded-xl bg-primary px-3 text-sm font-semibold tracking-wider text-primary-foreground">
            {stage.code}
          </span>
          <span className="eyebrow">BCSE · {stage.stage}</span>
        </span>
        <Badge variant="outline" className="hidden rounded-full text-xs font-medium text-muted-foreground sm:inline-flex">
          {stage.format}
        </Badge>
      </div>
      <Heading className="mt-6 font-heading text-3xl tracking-[-0.01em]">{stage.title}</Heading>
      <p className="mt-3 leading-relaxed text-muted-foreground">{stage.description}</p>

      <div className="mt-6">
        <p className="mb-2.5 text-xs font-semibold text-foreground">{stage.coverage.heading}</p>
        <ul className="flex flex-wrap gap-2">
          {stage.coverage.items.map((a) => (
            <li key={a} className="rounded-full border border-border bg-background px-3 py-1 text-xs text-foreground/80">
              {a}
            </li>
          ))}
        </ul>
        <OriginLabel className="mt-3" origin={stage.coverage.origin} verified={stage.coverage.verified} source={stage.coverage.source} />
      </div>

      <Link
        href={stage.href}
        className={buttonVariants({ variant: "outline", size: "lg", className: "mt-8 h-11 self-start px-5 group-hover:border-foreground/30" })}
      >
        {stage.cta} <ArrowRight className="size-4" />
      </Link>
    </article>
  );
}
