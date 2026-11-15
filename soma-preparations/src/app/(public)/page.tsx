import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Check,
  ClipboardCheck,
  Clock3,
  LayoutGrid,
  ListChecks,
  UserPlus,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExamPreview } from "@/components/site/exam-preview";
import { SectionHeading } from "@/components/site/section-heading";
import { examCategories, freeTier, premiumPackage, site } from "@/lib/site";
import { cn } from "@/lib/utils";

const examFeatures = [
  { icon: Clock3, title: "Timed like the real thing", text: "A countdown runs for the whole paper, so you learn to pace yourself under exam conditions." },
  { icon: LayoutGrid, title: "Question palette", text: "Jump to any question and see at a glance what is answered, unanswered or marked for review." },
  { icon: ClipboardCheck, title: "Clear results", text: "See correct, incorrect and unanswered questions, your score and the time you took." },
  { icon: BarChart3, title: "Performance insights", text: "Track your scores across attempts and find the subjects that need more work." },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_28rem_at_85%_-10%,var(--brand-soft),transparent_70%)]"
        />
        <div className="container-page relative grid items-center gap-12 pt-14 pb-16 sm:pt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pt-24 lg:pb-24">
          <div>
            <p className="eyebrow mb-5 inline-flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-brand" aria-hidden />
              {site.tagline}
            </p>
            <h1 className="font-heading text-[2.9rem] leading-[1.02] tracking-[-0.02em] text-foreground sm:text-6xl lg:text-[4.4rem]">
              Your Preparation <span className="italic text-brand">Starts Here.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">{site.description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/register" className={buttonVariants({ size: "lg", className: "h-12 px-6 text-[0.95rem]" })}>
                Start Practising <ArrowRight className="size-4" />
              </Link>
              <Link href="/exams" className={buttonVariants({ variant: "outline", size: "lg", className: "h-12 px-6 text-[0.95rem]" })}>
                Explore Examinations
              </Link>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {["Free registration", "Computer-based mock exams", "Works on any phone"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Check className="size-4 text-brand" aria-hidden /> {t}
                </li>
              ))}
            </ul>
          </div>
          <ExamPreview className="lg:translate-y-2" />
        </div>
      </section>

      {/* EXAMINATION CATEGORIES */}
      <section id="exams" className="scroll-mt-20 border-t border-border bg-muted/40 py-20 sm:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Examinations"
            title="Choose your examination"
            description="Structured preparation for Bhutan's competitive examinations, starting with the Preliminary Examination and RCSC examinations."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {examCategories.map((exam) => (
              <article
                key={exam.slug}
                className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-[0_1px_2px_rgba(16,24,20,.04)] transition-shadow hover:shadow-[0_18px_40px_-24px_rgba(16,24,20,.35)] sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-11 min-w-11 place-items-center rounded-xl bg-primary px-3 text-sm font-semibold tracking-wider text-primary-foreground">
                    {exam.code}
                  </span>
                  <Badge variant="outline" className="rounded-full text-xs font-medium text-muted-foreground">
                    Mock tests & practice
                  </Badge>
                </div>
                <h3 className="mt-6 font-heading text-3xl tracking-[-0.01em]">{exam.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{exam.description}</p>
                {exam.areas.length > 0 && (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {exam.areas.map((a) => (
                      <li key={a} className="rounded-full border border-border bg-background px-3 py-1 text-xs text-foreground/80">
                        {a}
                      </li>
                    ))}
                  </ul>
                )}
                <Link
                  href={exam.href}
                  className={buttonVariants({ variant: "outline", size: "lg", className: "mt-8 h-11 self-start px-5 group-hover:border-foreground/30" })}
                >
                  {exam.cta} <ArrowRight className="size-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* EXAM EXPERIENCE */}
      <section className="py-20 sm:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="The examination experience"
            title="Practise the way you will be tested"
            description="Soma's mock examinations are built to feel like sitting a real computer-based paper, on a laptop or on your phone."
          />
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {examFeatures.map(({ icon: Icon, title, text }) => (
              <div key={title} className="bg-card p-6 sm:p-7">
                <span className="grid size-10 place-items-center rounded-lg bg-brand-soft text-brand">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-5 text-base font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FREE PRACTICE */}
      <section id="free-practice" className="scroll-mt-20 border-t border-border bg-muted/40 py-20 sm:py-24">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Free practice"
              title="Try before you decide"
              description="Register for free and attempt sample mock examinations. See how the platform works and where you stand, before you spend anything."
            />
            <Link href="/register" className={buttonVariants({ size: "lg", className: "mt-8 h-12 px-6 text-[0.95rem]" })}>
              Register free <ArrowRight className="size-4" />
            </Link>
          </div>
          <ol className="grid gap-4">
            {[
              { icon: UserPlus, title: "Create a free account", text: "Register with your name and email." },
              { icon: ListChecks, title: "Attempt a free mock test", text: "Timed, computer-based, with a question palette." },
              { icon: BarChart3, title: "See your results", text: "Your score, correct and incorrect answers, and time taken." },
            ].map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="flex gap-4 rounded-2xl border border-border bg-card p-5">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-border text-foreground">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-semibold tracking-wider text-muted-foreground">STEP {i + 1}</p>
                  <h3 className="mt-0.5 font-semibold">{title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="scroll-mt-20 py-20 sm:py-24">
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="Pricing"
            title="Simple, one-time pricing"
            description="Start free. Upgrade once to unlock the full premium preparation package."
          />
          <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
            <PlanCard
              name={freeTier.name}
              price="Nu. 0"
              note="Free forever"
              benefits={freeTier.benefits}
              cta="Register free"
              href="/register"
            />
            <PlanCard
              featured
              name={premiumPackage.name}
              price={`${premiumPackage.currency} ${premiumPackage.price}`}
              note={`${premiumPackage.billing} · ${premiumPackage.access}`}
              benefits={premiumPackage.benefits}
              cta="Get Premium"
              href="/register"
            />
          </div>
          <p className="mx-auto mt-6 max-w-xl text-center text-xs leading-relaxed text-muted-foreground">
            Premium access applies to the package you purchase. Future examination packages may be offered separately.
          </p>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="scroll-mt-20 border-t border-border bg-primary py-20 text-primary-foreground sm:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <div>
            <p className="eyebrow mb-3 text-primary-foreground/60">About Soma</p>
            <h2 className="font-heading text-[2.15rem] leading-[1.08] tracking-[-0.015em] sm:text-5xl">
              Built in Bhutan, for Bhutanese graduates.
            </h2>
          </div>
          <div className="space-y-4 text-base leading-relaxed text-primary-foreground/75 sm:text-lg">
            <p>
              Soma Preparations exists to help graduates prepare for Bhutan&apos;s competitive examinations with confidence, through
              well-structured practice, realistic mock examinations and honest feedback on their progress.
            </p>
            <p>
              As the platform grows, we aim to create work for Bhutanese graduates in question development, research, editing and
              content verification.
            </p>
            <Link href="/about" className="inline-flex items-center gap-2 pt-2 text-sm font-medium text-primary-foreground hover:underline">
              Read more about Soma <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 sm:py-24">
        <div className="container-page">
          <div className="flex flex-col items-start justify-between gap-8 rounded-3xl border border-border bg-muted/40 p-8 sm:p-12 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <h2 className="font-heading text-3xl leading-tight tracking-[-0.01em] sm:text-4xl">Start preparing today.</h2>
              <p className="mt-3 text-muted-foreground">
                Registration is free. Attempt a sample mock examination and see how it feels.
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Link href="/register" className={buttonVariants({ size: "lg", className: "h-12 px-6 text-[0.95rem]" })}>
                Start Practising
              </Link>
              <Link href="/exams" className={buttonVariants({ variant: "outline", size: "lg", className: "h-12 px-6 text-[0.95rem]" })}>
                Explore Examinations
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function PlanCard({
  name,
  price,
  note,
  benefits,
  cta,
  href,
  featured = false,
}: {
  name: string;
  price: string;
  note: string;
  benefits: readonly string[];
  cta: string;
  href: string;
  featured?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl border bg-card p-7 sm:p-8",
        featured ? "border-foreground shadow-[0_24px_60px_-28px_rgba(16,24,20,.45)]" : "border-border"
      )}
    >
      {featured && (
        <Badge className="absolute -top-3 left-7 rounded-full bg-brand px-3 py-1 text-xs text-brand-foreground">Recommended</Badge>
      )}
      <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">{name}</h3>
      <p className="mt-4 font-heading text-6xl tracking-[-0.02em]">{price}</p>
      <p className="mt-2 text-sm text-muted-foreground">{note}</p>
      <ul className="mt-7 flex-1 space-y-3 border-t border-border pt-7">
        {benefits.map((b) => (
          <li key={b} className="flex gap-3 text-[0.95rem]">
            <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
            {b}
          </li>
        ))}
      </ul>
      <Link
        href={href}
        className={buttonVariants({ variant: featured ? "default" : "outline", size: "lg", className: "mt-8 h-12 text-[0.95rem]" })}
      >
        {cta}
      </Link>
    </div>
  );
}
