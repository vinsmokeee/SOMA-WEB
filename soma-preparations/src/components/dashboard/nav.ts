import {
  BarChart3,
  BookOpenCheck,
  ClipboardList,
  FileClock,
  GraduationCap,
  LayoutDashboard,
  Receipt,
  Target,
  UserRound,
  type LucideIcon,
} from "lucide-react";

export type DashboardNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Short label for the mobile bottom bar (only items with one are shown there). */
  mobile?: string;
  /** Milestone in which the page becomes functional. */
  milestone?: string;
};

export const dashboardNav: DashboardNavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, mobile: "Home" },
  { label: "PE preparation", href: "/dashboard/pe", icon: GraduationCap, milestone: "Milestone 4" },
  { label: "RCSC preparation", href: "/dashboard/rcsc", icon: BookOpenCheck, milestone: "Milestone 4" },
  { label: "Mock tests", href: "/dashboard/mock-tests", icon: ClipboardList, mobile: "Tests", milestone: "Milestone 4" },
  { label: "Subject practice", href: "/dashboard/practice", icon: Target, mobile: "Practice", milestone: "Milestone 4" },
  { label: "Results & analytics", href: "/dashboard/results", icon: BarChart3, mobile: "Results", milestone: "Milestone 4" },
  { label: "Attempt history", href: "/dashboard/history", icon: FileClock, milestone: "Milestone 4" },
  { label: "Purchases", href: "/dashboard/purchases", icon: Receipt, milestone: "Milestone 6" },
  { label: "Profile", href: "/dashboard/profile", icon: UserRound, mobile: "Profile", milestone: "Milestone 2" },
];

export const dashboardSections = dashboardNav.filter((i) => i.href !== "/dashboard");
