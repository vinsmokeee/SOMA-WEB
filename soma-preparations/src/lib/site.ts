/**
 * Central brand and content configuration for SOMA PREPARATIONS.
 * Marketing copy, navigation and pricing live here so they stay consistent
 * across pages and can be changed without touching components.
 */

export const site = {
  name: "SOMA PREPARATIONS",
  shortName: "Soma",
  tagline: "Prepare. Practice. Progress.",
  description:
    "Prepare for Bhutan's competitive examinations with structured mock tests, practice questions and performance insights.",
  logo: {
    full: "/images/soma-logo.png", // official logo, unmodified
    trimmed: "/images/soma-logo-trimmed.png", // same logo, empty margin removed
    mark: "/images/soma-mark.png", // symbol only, for small sizes
  },
  contactEmail: "", // set when a business email exists
  /** Social profiles: leave empty until the accounts exist; empty ones are hidden. */
  social: {
    facebook: "",
    instagram: "",
    tiktok: "",
    youtube: "",
  },
  disclaimer:
    "Soma Preparations is an independent examination preparation platform. It is not affiliated with, endorsed by or connected to the Royal Civil Service Commission or any other Bhutanese government agency.",
} as const;

export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Examinations", href: "/exams" },
  { label: "Free practice", href: "/#free-practice" },
  { label: "Pricing", href: "/#pricing" },
  { label: "About", href: "/about" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Examinations",
    items: [
      { label: "PE preparation", href: "/exams/pe" },
      { label: "RCSC preparation", href: "/exams/rcsc" },
      { label: "Free mock tests", href: "/#free-practice" },
      { label: "Pricing", href: "/#pricing" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About Soma", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Terms and conditions", href: "/terms" },
      { label: "Privacy policy", href: "/privacy" },
    ],
  },
];

export type ExamCategory = {
  slug: "pe" | "rcsc";
  code: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  /** Areas named in the RCSC's published description of the examination. */
  areas: string[];
};

export const examCategories: ExamCategory[] = [
  {
    slug: "pe",
    code: "PE",
    title: "PE Preparation",
    description:
      "Prepare for the Preliminary Examination with structured practice questions and realistic mock examinations.",
    cta: "Explore PE",
    href: "/exams/pe",
    // Source: RCSC "Preliminary Examination" page (rcsc.gov.bt), which lists these skill areas.
    areas: [
      "English communication",
      "Dzongkha communication",
      "Logic & analytical ability",
      "Problem solving & data interpretation",
      "General awareness & current affairs",
    ],
  },
  {
    slug: "rcsc",
    code: "RCSC",
    title: "RCSC Preparation",
    description:
      "Improve your examination readiness through practice tests and structured preparation resources.",
    cta: "Explore RCSC",
    href: "/exams/rcsc",
    areas: [],
  },
];

export const premiumPackage = {
  name: "Premium Preparation",
  price: 499,
  currency: "Nu.",
  billing: "One-time payment",
  access: "Lifetime access to this package and its updates",
  benefits: [
    "Premium mock examinations",
    "Additional practice questions",
    "Detailed answer explanations",
    "Performance analytics",
    "Full attempt history",
    "Updates to the purchased package",
  ],
} as const;

export const freeTier = {
  name: "Free",
  price: 0,
  benefits: [
    "Free registration",
    "Sample questions",
    "Designated free mock examinations",
    "Basic results",
  ],
} as const;
