import Link from "next/link";
import { ArrowRight, ClipboardList, Info, Lock, Sparkles, Target, Trophy, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { bcseStages, premiumPackage } from "@/lib/site";

const subjects = bcseStages.find((s) => s.slug === "pe")!.coverage.items;

const stats = [
  { label: "Attempts", icon: ClipboardList },
  { label: "Average score", icon: TrendingUp },
  { label: "Best score", icon: Trophy },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Honest preview notice */}
      <div className="flex gap-3 rounded-xl border border-border bg-background p-4 text-sm text-muted-foreground">
        <Info className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
        <p>
          <span className="font-medium text-foreground">Preview.</span> This is the layout of the student dashboard. Accounts,
          examinations and results are not connected yet, so no real data is shown.
        </p>
      </div>

      {/* Welcome */}
      <section className="flex flex-col gap-5 rounded-2xl border border-border bg-background p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <p className="eyebrow">Welcome</p>
          <h1 className="mt-2 font-heading text-3xl tracking-[-0.01em] sm:text-4xl">Good to see you, student.</h1>
          <p className="mt-2 text-muted-foreground">Start with Stage I, the Preliminary Examination, with a free mock test.</p>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-border px-4 py-3">
          <span className="grid size-9 place-items-center rounded-lg bg-muted">
            <Lock className="size-4 text-muted-foreground" aria-hidden />
          </span>
          <div>
            <p className="text-xs text-muted-foreground">Access</p>
            <p className="text-sm font-semibold">Free plan</p>
          </div>
        </div>
      </section>

      {/* Stats: empty until real attempts exist */}
      <section aria-label="Your progress" className="grid grid-cols-3 gap-3 sm:gap-4">
        {stats.map(({ label, icon: Icon }) => (
          <div key={label} className="rounded-2xl border border-border bg-background p-4 sm:p-6">
            <Icon className="size-4 text-muted-foreground" aria-hidden />
            <p className="mt-4 font-heading text-3xl tabular-nums text-muted-foreground/60 sm:text-4xl">–</p>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{label}</p>
          </div>
        ))}
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* Available examinations */}
        <section className="rounded-2xl border border-border bg-background p-6 sm:p-7">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">BCSE preparation</h2>
          </div>
          <ul className="mt-5 space-y-3">
            {bcseStages.map((exam) => (
              <li key={exam.slug} className="flex items-start gap-4 rounded-xl border border-border p-4 sm:items-center">
                <span className="grid h-10 min-w-10 place-items-center rounded-lg bg-primary px-2 text-xs font-semibold tracking-wider text-primary-foreground">
                  {exam.code}
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="font-medium">{exam.stage}: {exam.title}</p>
                    <p className="text-sm text-muted-foreground">{exam.format}</p>
                  </div>
                  <Badge variant="outline" className="w-fit shrink-0 rounded-full text-xs text-muted-foreground">
                    Coming soon
                  </Badge>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Premium */}
        <section className="flex flex-col rounded-2xl bg-primary p-6 text-primary-foreground sm:p-7">
          <Sparkles className="size-5 text-primary-foreground/70" aria-hidden />
          <h2 className="mt-4 font-heading text-3xl">Go Premium</h2>
          <p className="mt-2 text-sm leading-relaxed text-primary-foreground/70">
            Premium mock examinations, detailed explanations and performance analytics.
          </p>
          <p className="mt-5 font-heading text-5xl">
            {premiumPackage.currency} {premiumPackage.price}
          </p>
          <p className="mt-1 text-xs text-primary-foreground/60">{premiumPackage.access}</p>
          <Link
            href="/#pricing"
            className={buttonVariants({ variant: "secondary", size: "lg", className: "mt-6 h-11 bg-background text-foreground hover:bg-background/90" })}
          >
            See what&apos;s included <ArrowRight className="size-4" />
          </Link>
        </section>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent attempts: empty state */}
        <section className="rounded-2xl border border-border bg-background p-6 sm:p-7">
          <h2 className="text-base font-semibold">Recent attempts</h2>
          <div className="mt-5 rounded-xl border border-dashed border-border px-6 py-10 text-center">
            <ClipboardList className="mx-auto size-6 text-muted-foreground" aria-hidden />
            <p className="mt-3 font-medium">No attempts yet</p>
            <p className="mt-1 text-sm text-muted-foreground">Your mock examination attempts will appear here.</p>
          </div>
        </section>

        {/* Subject-wise performance: empty bars */}
        <section className="rounded-2xl border border-border bg-background p-6 sm:p-7">
          <h2 className="text-base font-semibold">PE subject-wise performance</h2>
          <ul className="mt-5 space-y-4">
            {subjects.map((s) => (
              <li key={s}>
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span>{s}</span>
                  <span className="shrink-0 text-muted-foreground">No data</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-muted" />
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Recommended */}
      <section className="flex flex-col gap-4 rounded-2xl border border-border bg-background p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
        <div className="flex gap-4">
          <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand">
            <Target className="size-5" aria-hidden />
          </span>
          <div>
            <h2 className="font-semibold">Recommended next step</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Take a free mock examination to get your first score and see your strongest and weakest subjects.
            </p>
          </div>
        </div>
        <Link href="/dashboard/mock-tests" className={buttonVariants({ size: "lg", className: "h-11 shrink-0 px-5" })}>
          Go to mock tests
        </Link>
      </section>
    </div>
  );
}
