import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { CurrentYear } from "@/components/site/current-year";
import { footerNav, site } from "@/lib/site";

const socialLabels: Record<keyof typeof site.social, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube",
};

export function SiteFooter() {
  const socials = (Object.keys(site.social) as (keyof typeof site.social)[]).filter((k) => site.social[k]);

  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{site.tagline}</p>
          {socials.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-4 text-sm">
              {socials.map((k) => (
                <li key={k}>
                  <a href={site.social[k]} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                    {socialLabels[k]}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        {footerNav.map((group) => (
          <div key={group.title}>
            <h2 className="eyebrow">{group.title}</h2>
            <ul className="mt-4 space-y-2.5">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-foreground/80 transition-colors hover:text-foreground">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-3 py-6 text-xs leading-relaxed text-muted-foreground md:flex-row md:items-start md:justify-between md:gap-10">
          <p className="shrink-0">© <CurrentYear /> {site.name}</p>
          <p className="max-w-2xl md:text-right">{site.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
