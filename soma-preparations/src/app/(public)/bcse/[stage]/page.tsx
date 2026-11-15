import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { OriginLabel } from "@/components/site/origin-label";
import { bcse, bcseStages } from "@/lib/site";

const findStage = (slug: string) => bcseStages.find((s) => s.slug === slug);

export function generateStaticParams() {
  return bcseStages.map((s) => ({ stage: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/bcse/[stage]">): Promise<Metadata> {
  const { stage } = await params;
  const s = findStage(stage);
  return s ? { title: `${s.title}: BCSE ${s.stage}`, description: s.description } : { title: "BCSE Preparation" };
}

export default async function BcseStagePage({ params }: PageProps<"/bcse/[stage]">) {
  const { stage: slug } = await params;
  const stage = findStage(slug);
  if (!stage) notFound();
  const other = bcseStages.find((s) => s.slug !== stage.slug)!;

  return (
    <>
      <section className="container-page py-14 sm:py-20">
        <Link href={bcse.href} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> BCSE Preparation
        </Link>
        <div className="mt-8 flex items-center gap-3">
          <span className="grid h-11 min-w-11 place-items-center rounded-xl bg-primary px-3 text-sm font-semibold tracking-wider text-primary-foreground">
            {stage.code}
          </span>
          <span className="eyebrow">Bhutan Civil Service Examination · {stage.stage}</span>
        </div>
        <h1 className="mt-5 max-w-3xl font-heading text-[2.6rem] leading-[1.05] tracking-[-0.02em] sm:text-6xl">{stage.title}</h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{stage.description}</p>
        <Badge variant="outline" className="mt-6 rounded-full px-3 py-1 text-xs font-medium text-muted-foreground">
          Preparation resources in development
        </Badge>
      </section>

      <section className="border-t border-border bg-muted/40 py-14 sm:py-20">
        <div className="container-page grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h2 className="text-lg font-semibold">{stage.coverage.heading}</h2>
            <ul className="mt-5 space-y-3">
              {stage.coverage.items.map((item) => (
                <li key={item} className="flex gap-3 text-[0.95rem]">
                  <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden /> {item}
                </li>
              ))}
            </ul>
            <OriginLabel className="mt-6" origin={stage.coverage.origin} verified={stage.coverage.verified} source={stage.coverage.source} />
            {stage.coverage.note && <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{stage.coverage.note}</p>}
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h2 className="text-lg font-semibold">What Soma will provide</h2>
            <ul className="mt-5 space-y-3">
              {stage.resources.map((r) => (
                <li key={r} className="flex gap-3 text-[0.95rem]">
                  <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden /> {r}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
              Every question and lesson is labelled by origin: official RCSC information, historical papers, original Soma questions
              or expert-created material.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page py-14 sm:py-16">
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-border p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <p className="eyebrow">BCSE · {other.stage}</p>
            <p className="mt-1.5 font-heading text-2xl">{other.title}</p>
          </div>
          <Link href={other.href} className={buttonVariants({ variant: "outline", size: "lg", className: "h-11 px-5" })}>
            {other.cta} <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
