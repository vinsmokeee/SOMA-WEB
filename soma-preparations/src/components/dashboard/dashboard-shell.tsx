"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/logo";
import { dashboardNav } from "@/components/dashboard/nav";
import { cn } from "@/lib/utils";

/**
 * Student portal shell: sidebar on large screens, compact top bar plus a
 * bottom tab bar on phones (feels like a mobile app).
 */
export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const active = (href: string) => (href === "/dashboard" ? pathname === href : pathname.startsWith(href));

  return (
    <div className="flex min-h-dvh bg-muted/40">
      <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col border-r border-border bg-background lg:flex">
        <div className="flex h-16 items-center px-5">
          <Logo href="/dashboard" />
        </div>
        <nav aria-label="Student portal" className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
          {dashboardNav.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              aria-current={active(href) ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active(href) ? "bg-brand-soft text-accent-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="size-4.5" aria-hidden />
              {label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-border p-4 text-xs leading-relaxed text-muted-foreground">
          Preview of the student portal. Sign-in arrives in Milestone 2.
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/90 px-4 backdrop-blur-md lg:hidden">
          <Logo href="/dashboard" />
        </header>
        <main className="flex-1 px-4 pt-6 pb-28 sm:px-6 lg:px-10 lg:pt-10 lg:pb-12">{children}</main>
      </div>

      <nav
        aria-label="Student portal (mobile)"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
      >
        <ul className="grid grid-cols-5">
          {dashboardNav
            .filter((i) => i.mobile)
            .map(({ mobile, href, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active(href) ? "page" : undefined}
                  className={cn(
                    "flex flex-col items-center gap-1 py-2.5 text-[0.68rem] font-medium",
                    active(href) ? "text-brand" : "text-muted-foreground"
                  )}
                >
                  <Icon className="size-5" aria-hidden />
                  {mobile}
                </Link>
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
}
