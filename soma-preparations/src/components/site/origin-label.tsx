import { BadgeCheck, CircleDashed, ExternalLink, History, PenLine, UserRoundCheck } from "lucide-react";
import { contentOrigins, type ContentOrigin, type OfficialSource } from "@/lib/site";
import { cn } from "@/lib/utils";

const icons = { official: BadgeCheck, historical: History, original: PenLine, expert: UserRoundCheck } as const;

/**
 * Shows students where a piece of information comes from: official RCSC
 * information, a historical paper, an original Soma question or expert
 * material. Official information that has not been checked against a linked
 * source is labelled as pending verification.
 */
export function OriginLabel({
  origin,
  verified = true,
  source,
  className,
}: {
  origin: ContentOrigin;
  verified?: boolean;
  source?: OfficialSource;
  className?: string;
}) {
  const pending = origin === "official" && !verified;
  const Icon = pending ? CircleDashed : icons[origin];
  return (
    <p className={cn("flex flex-wrap items-center gap-x-2 gap-y-1 text-xs", "text-muted-foreground", className)}>
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-medium",
          pending ? "border-warning/60 bg-warning/10 text-foreground" : origin === "official" ? "border-brand/30 bg-brand-soft text-accent-foreground" : "border-border bg-background text-foreground/80"
        )}
      >
        <Icon className="size-3.5" aria-hidden />
        {pending ? "Pending verification with RCSC" : contentOrigins[origin].label}
      </span>
      {source && !pending && (
        <a href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline-offset-4 hover:text-foreground hover:underline">
          Source: {source.title} <ExternalLink className="size-3" aria-hidden />
        </a>
      )}
    </p>
  );
}
