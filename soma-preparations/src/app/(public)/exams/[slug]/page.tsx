import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { ComingSoon } from "@/components/site/coming-soon";
import { examCategories } from "@/lib/site";

export function generateStaticParams() {
  return examCategories.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps<"/exams/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const exam = examCategories.find((e) => e.slug === slug);
  return { title: exam?.title ?? "Examination" };
}

export default async function ExamCategoryPage({ params }: PageProps<"/exams/[slug]">) {
  const { slug } = await params;
  const exam = examCategories.find((e) => e.slug === slug);
  if (!exam) notFound();

  return (
    <ComingSoon title={exam.title} description={exam.description} milestone="Milestone 4">
      {exam.areas.length > 0 && (
        <div className="mx-auto mt-8 max-w-md rounded-2xl border border-border bg-muted/40 p-5 text-left">
          <p className="eyebrow mb-3">Areas tested, as described by the RCSC</p>
          <ul className="space-y-2">
            {exam.areas.map((a) => (
              <li key={a} className="flex gap-2.5 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden /> {a}
              </li>
            ))}
          </ul>
        </div>
      )}
    </ComingSoon>
  );
}
