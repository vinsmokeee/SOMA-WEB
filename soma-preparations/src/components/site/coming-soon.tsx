import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

/** Honest placeholder for pages that belong to a later milestone. */
export function ComingSoon({
  title,
  description,
  milestone,
  children,
}: {
  title: string;
  description: string;
  milestone?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="container-page py-20 sm:py-28">
      <div className="mx-auto max-w-xl text-center">
        <Badge variant="outline" className="mb-5 rounded-full px-3 py-1 text-xs font-medium text-muted-foreground">
          {milestone ? `Coming in ${milestone}` : "Coming soon"}
        </Badge>
        <h1 className="font-heading text-4xl leading-tight tracking-[-0.015em] sm:text-5xl">{title}</h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{description}</p>
        {children}
        <Link href="/" className={buttonVariants({ variant: "outline", size: "lg", className: "mt-8 h-11 px-5" })}>
          <ArrowLeft className="size-4" /> Back to home
        </Link>
      </div>
    </section>
  );
}
