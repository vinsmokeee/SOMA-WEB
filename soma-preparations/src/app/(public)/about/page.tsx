import type { Metadata } from "next";
import { SectionHeading } from "@/components/site/section-heading";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "About Soma" };

const values = [
  { title: "Realistic practice", text: "Mock examinations that feel like sitting the real paper: timed, computer-based and structured." },
  { title: "Honest feedback", text: "Clear results and explanations, so every attempt shows you what to improve." },
  { title: "Careful content", text: "Questions are written and verified by people, with sources recorded and mistakes corrected quickly." },
];

export default function AboutPage() {
  return (
    <>
      <section className="container-page py-16 sm:py-24">
        <SectionHeading
          eyebrow="About Soma"
          title="Helping Bhutanese graduates prepare with confidence."
          description="Soma Preparations is an online examination preparation platform for graduates preparing for Bhutan's competitive examinations, starting with the Preliminary Examination and RCSC examinations."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl border border-border bg-card p-6">
              <h2 className="font-semibold">{v.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="border-t border-border bg-muted/40 py-16 sm:py-20">
        <div className="container-page max-w-3xl space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
          <h2 className="font-heading text-3xl text-foreground sm:text-4xl">Our long-term vision</h2>
          <p>
            We want Soma to become a trusted place for examination preparation in Bhutan, and to grow beyond the PE and RCSC
            examinations to other competitive and professional examinations.
          </p>
          <p>
            As we grow, we aim to create opportunities for Bhutanese graduates in question development, subject research, editing and
            content verification.
          </p>
          <p className="text-sm">{site.disclaimer}</p>
        </div>
      </section>
    </>
  );
}
