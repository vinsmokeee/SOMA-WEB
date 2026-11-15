import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { dashboardSections } from "@/components/dashboard/nav";

const findSection = (section: string) => dashboardSections.find((s) => s.href === `/dashboard/${section}`);

export function generateStaticParams() {
  return dashboardSections.map((s) => ({ section: s.href.split("/").pop()! }));
}

export async function generateMetadata({ params }: PageProps<"/dashboard/[section]">): Promise<Metadata> {
  const { section } = await params;
  return { title: findSection(section)?.label ?? "Student portal" };
}

export default async function DashboardSectionPage({ params }: PageProps<"/dashboard/[section]">) {
  const { section } = await params;
  const item = findSection(section);
  if (!item) notFound();
  const Icon = item.icon;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-2xl border border-dashed border-border bg-background p-8 text-center sm:p-12">
        <span className="mx-auto grid size-12 place-items-center rounded-xl bg-brand-soft text-brand">
          <Icon className="size-6" aria-hidden />
        </span>
        <h1 className="mt-5 font-heading text-3xl tracking-[-0.01em] sm:text-4xl">{item.label}</h1>
        <Badge variant="outline" className="mt-4 rounded-full text-xs text-muted-foreground">
          Available from {item.milestone}
        </Badge>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
          This part of the student portal is not built yet. It will appear here once its milestone is complete.
        </p>
        <Link href="/dashboard" className={buttonVariants({ variant: "outline", size: "lg", className: "mt-7 h-11 px-5" })}>
          <ArrowLeft className="size-4" /> Back to dashboard
        </Link>
      </div>
    </div>
  );
}
