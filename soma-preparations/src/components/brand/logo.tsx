import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Brand lock-up: the official SOMA symbol (unmodified, white background,
 * which matches the site) next to the business name in text.
 */
export function Logo({ className, href = "/", preload = false }: { className?: string; href?: string; preload?: boolean }) {
  return (
    <Link href={href} className={cn("group flex items-center gap-2.5", className)} aria-label={`${site.name}, home`}>
      <Image
        src={site.logo.mark}
        alt=""
        width={40}
        height={40}
        preload={preload}
        className="size-9 shrink-0 sm:size-10"
      />
      <span className="flex flex-col leading-none">
        <span className="text-[0.95rem] font-semibold tracking-[0.22em] text-foreground">SOMA</span>
        <span className="mt-1 text-[0.6rem] font-medium tracking-[0.28em] text-muted-foreground">PREPARATIONS</span>
      </span>
    </Link>
  );
}
