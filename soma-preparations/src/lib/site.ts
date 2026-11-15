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
    "Prepare for both stages of the Bhutan Civil Service Examination (PE and ME) with structured mock tests, written-answer practice and performance insights.",
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
  { label: "BCSE Preparation", href: "/bcse" },
  { label: "Free practice", href: "/#free-practice" },
  { label: "Pricing", href: "/#pricing" },
  { label: "About", href: "/about" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "BCSE Preparation",
    items: [
      { label: "Stage I: Preliminary (PE)", href: "/bcse/pe" },
      { label: "Stage II: Main (ME)", href: "/bcse/me" },
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

/**
 * Examination structure. Terminology used everywhere:
 *   RCSC = Royal Civil Service Commission (the institution)
 *   BCSE = Bhutan Civil Service Examination (the examination RCSC conducts)
 *   PE   = Preliminary Examination, Stage I of the BCSE
 *   ME   = Main Examination, Stage II of the BCSE
 *
 * This is marketing copy only. Formats, papers, marks and durations are
 * configured as data (see docs/EXAMINATION-ARCHITECTURE.md), never hardcoded.
 */
export const bcse = {
  code: "BCSE",
  name: "Bhutan Civil Service Examination",
  conductedBy: "Royal Civil Service Commission (RCSC)",
  headline: "Prepare for both stages of the Bhutan Civil Service Examination with Soma Preparations.",
  href: "/bcse",
} as const;

/** Where a piece of information or content comes from. Shown to students as a label. */
export const contentOrigins = {
  official: { label: "Official RCSC information", description: "Taken from an RCSC announcement, syllabus or notice, with the source linked." },
  historical: { label: "Historical paper or format", description: "From a previous year. It may not reflect the current examination." },
  original: { label: "Original Soma question", description: "Written by Soma Preparations in the style of the examination." },
  expert: { label: "Expert-created material", description: "Lessons and model answers prepared by subject experts for Soma." },
} as const;

export type ContentOrigin = keyof typeof contentOrigins;

export type OfficialSource = { title: string; url: string };

export type BcseStage = {
  slug: "pe" | "me";
  code: "PE" | "ME";
  stage: string;
  title: string;
  shortTitle: string;
  description: string;
  format: string;
  cta: string;
  href: string;
  /** What Soma provides for this stage. */
  resources: string[];
  /** Areas (PE) or categories (ME) with where the list comes from. */
  coverage: {
    heading: string;
    items: string[];
    origin: ContentOrigin;
    /** True only when checked against a linked official source. Unverified lists are labelled as such. */
    verified: boolean;
    note?: string;
    source?: OfficialSource;
  };
};

export const bcseStages: BcseStage[] = [
  {
    slug: "pe",
    code: "PE",
    stage: "Stage I",
    title: "Preliminary Examination (PE)",
    shortTitle: "PE Preparation",
    description:
      "Prepare for the Preliminary Examination with topic-wise lessons, practice questions and realistic, timed mock examinations.",
    format: "Objective-type questions",
    cta: "Explore PE",
    href: "/bcse/pe",
    resources: ["Topic-wise lessons", "Practice questions", "Timed mock examinations", "Answer explanations", "Performance analytics", "Revision tools"],
    coverage: {
      heading: "Areas tested",
      origin: "official",
      verified: true,
      items: [
        "English communication",
        "Dzongkha communication",
        "Logic, analytical and problem-solving skills",
        "Data interpretation",
        "General awareness and current affairs",
      ],
      source: { title: "RCSC: Preliminary Examination", url: "https://rcsc.gov.bt/preliminary-examination/" },
    },
  },
  {
    slug: "me",
    code: "ME",
    stage: "Stage II",
    title: "Main Examination (ME)",
    shortTitle: "ME Preparation",
    description:
      "Prepare for the Main Examination in your category with paper-wise study materials, written-answer practice, model answers and expert feedback.",
    format: "Category-specific written papers",
    cta: "Explore ME",
    href: "/bcse/me",
    resources: [
      "Subject-specific learning materials",
      "Paper-wise preparation",
      "Written and essay answer practice",
      "Model answers and marking rubrics",
      "Expert feedback and evaluation",
      "Viva voce preparation",
    ],
    coverage: {
      heading: "Planned categories",
      origin: "official",
      verified: false,
      items: ["Administrative", "Finance", "Education (PGDE)", "Dzongkha", "Technical", "B.Ed."],
      note: "Categories, papers, syllabi and marks follow the latest RCSC notification and are confirmed before each examination year.",
    },
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
