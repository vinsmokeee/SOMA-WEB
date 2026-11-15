import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/section-heading";
import { examCategories } from "@/lib/site";

export const metadata: Metadata = { title: "Examinations" };

export default function ExamsPage() {
  return (
    <section className="container-page py-16 sm:py-24">
      <SectionHeading
        eyebrow="Examinations"
        title="Examination categories"
        description="Soma starts with preparation for the Preliminary Examination and RCSC examinations. More Bhutanese competitive examinations will be added over time."
      />
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {examCategories.map((exam) => (
          <article key={exam.slug} className="flex flex-col rounded-2xl border border-border bg-card p-6 sm:p-8">
            <span className="grid h-11 w-fit min-w-11 place-items-center rounded-xl bg-primary px-3 text-sm font-semibold tracking-wider text-primary-foreground">
              {exam.code}
            </span>
            <h2 className="mt-6 font-heading text-3xl tracking-[-0.01em]">{exam.title}</h2>
            <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">{exam.description}</p>
            <Link href={exam.href} className={buttonVariants({ variant: "outline", size: "lg", className: "mt-8 h-11 self-start px-5" })}>
              {exam.cta} <ArrowRight className="size-4" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
