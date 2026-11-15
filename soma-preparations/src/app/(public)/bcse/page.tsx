import type { Metadata } from "next";
import { SectionHeading } from "@/components/site/section-heading";
import { StageCard } from "@/components/site/stage-card";
import { bcse, bcseStages } from "@/lib/site";

export const metadata: Metadata = {
  title: "BCSE Preparation",
  description: bcse.headline,
};

export default function BcsePage() {
  return (
    <>
      <section className="container-page py-16 sm:py-24">
        <SectionHeading eyebrow="BCSE Preparation" title={bcse.headline} />
        <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
          {[
            { term: "RCSC", def: "Royal Civil Service Commission: the institution that conducts the examination." },
            { term: "BCSE", def: "Bhutan Civil Service Examination: the examination itself, held in two stages." },
            { term: "PE → ME", def: "Stage I is the Preliminary Examination; Stage II is the Main Examination." },
          ].map((d) => (
            <div key={d.term} className="bg-card p-5 sm:p-6">
              <dt className="font-heading text-2xl">{d.term}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{d.def}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {bcseStages.map((stage) => (
            <StageCard key={stage.slug} stage={stage} headingLevel="h2" />
          ))}
        </div>
      </section>
    </>
  );
}
