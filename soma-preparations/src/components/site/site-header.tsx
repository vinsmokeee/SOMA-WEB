"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { buttonVariants } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { mainNav } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const isActive = (href: string) => !href.includes("#") && (pathname === href || pathname.startsWith(href + "/"));

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo preload />

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                isActive(item.href) && "text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link href="/login" className={buttonVariants({ variant: "ghost", size: "lg", className: "px-3.5" })}>
            Log in
          </Link>
          <Link href="/register" className={buttonVariants({ size: "lg", className: "px-4" })}>
            Register free
          </Link>
        </div>

        <Sheet>
          <SheetTrigger
            className={buttonVariants({ variant: "ghost", size: "icon-lg", className: "md:hidden" })}
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent side="right" className="w-[86%] max-w-sm gap-0 p-0">
            <SheetHeader className="px-5 pt-5 pb-4">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <Logo />
            </SheetHeader>
            <Separator />
            <nav aria-label="Mobile" className="flex flex-col px-3 py-3">
              {mainNav.map((item) => (
                <SheetClose
                  key={item.href}
                  render={<Link href={item.href} />}
                  className="rounded-lg px-3 py-3.5 text-base font-medium text-foreground transition-colors hover:bg-muted"
                >
                  {item.label}
                </SheetClose>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-2.5 border-t border-border p-5">
              <SheetClose render={<Link href="/register" />} className={buttonVariants({ size: "lg", className: "h-11 text-[0.95rem]" })}>
                Register free
              </SheetClose>
              <SheetClose render={<Link href="/login" />} className={buttonVariants({ variant: "outline", size: "lg", className: "h-11 text-[0.95rem]" })}>
                Log in
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
