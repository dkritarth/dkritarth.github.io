/** Path-route targets for the SPA (`/`, `/about/`, …). Legacy `#/about` redirects to `/about/`. */
export type SitePage = 'home' | 'about' | 'research' | 'publications' | 'projects' | 'education' | 'news' | 'blog';

export interface Publication {
  title: string;
  authors: string;
  venue: string;
  year: string;
  link?: string;
  status?: string;
  abstract?: string;
  citation?: string;
  /** Names (as they appear in `authors`) that share first authorship, e.g. ['Liu, E.', 'Dandapat, K.'] */
  equalContribution?: string[];
}

/** One line item in the home page "Currently" section. */
export interface CurrentlyItem {
  title: string;
  description: string;
  link?: ResearchLink;
}

export interface Experience {
  role: string;
  organization: string;
  location: string;
  period: string;
  description: string[];
  technologies?: string[];
}

export interface ResearchLink {
  label: string;
  href: string;
}

/** UB ELN / Credly “Mentored Research” micro-credential for a Peng lab subproject. */
export interface CredlyBadge {
  badgeId: string;
  publicUrl: string;
  issued?: string;
  projectOutcomeUrl?: string;
  projectOutcomeLabel?: string;
}

/**
 * Image shown on Research or Projects pages. Files live under `public/`; `src` is the URL path (e.g. `/data/research/oralscan/fig1.jpg`).
 * See `public/data/research/README.md`.
 */
export interface ContentImage {
  src: string;
  alt: string;
  caption?: string;
}

/** One tractable project stream inside a lab affiliation (OralScan, Peng GNN work, etc.). */
export interface ResearchSubproject {
  id: string;
  name: string;
  period: string;
  /** Line such as PI or product URL */
  context?: string;
  narrative: string[];
  technicalHighlights: string[];
  links?: ResearchLink[];
  /** Credly embed + outcome links for UB ELN mentored research */
  credlyBadge?: CredlyBadge;
  technologies: string[];
  /** Optional attribution line (e.g., named collaborators) */
  collaboratorsNote?: string;
  /** Photos / figures; paths under `public/data/research/{id}/` recommended */
  images?: ContentImage[];
}

/** Lab placement grouping multiple subprojects under one role and institution. */
export interface ResearchPlacement {
  role: string;
  organization: string;
  location: string;
  /** One-sentence scope across subprojects */
  overview?: string;
  /** Lab-wide links (e.g. ELN project profile) shown under the placement header */
  placementLinks?: ResearchLink[];
  subprojects: ResearchSubproject[];
}

export interface Project {
  title: string;
  category: string;
  description: string[];
  technologies: string[];
  stats?: string; // e.g., "98.72% Accuracy"
  links?: ResearchLink[];
  /** Folder key for images: `public/data/projects/{slug}/` — see README */
  slug?: string;
  images?: ContentImage[];
}

/** Hackathons, innovation competitions, and similar programs (often with OralScan). */
export interface CompetitionEntry {
  name: string;
  host?: string;
  /** When the program or competition took place */
  date: string;
  /** Your role, team role, and product */
  role: string;
  /** Optional comma-separated team roster */
  team?: string;
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
  details: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

/** How to label / iconize an outbound link on the News page. */
export type NewsLinkKind = 'website' | 'linkedin' | 'article' | 'paper' | 'github' | 'video';

/** External reference for a news milestone (LinkedIn post, article, project site, etc.). */
export interface NewsLink {
  label: string;
  href: string;
  kind?: NewsLinkKind;
}

/**
 * Milestone for the News page. Optional `images` and `links` enrich the timeline.
 * Photos live under `public/data/news/<id>/` — see `public/data/news/README.md`.
 */
export interface NewsItem {
  /** Stable slug; matches folder name under `public/data/news/`. */
  id: string;
  year: number;
  /** 1–12 for ordering; use 6 for “Spring” mid-year awards if month unknown */
  month: number;
  headline: string;
  /** Optional extra sentence shown under the headline */
  summary?: string;
  /** Figures, screenshots, or photos (e.g. LinkedIn post captures) */
  images?: ContentImage[];
  links?: NewsLink[];
  /** Credly embed for UB ELN Mentored Research milestones */
  credlyBadge?: CredlyBadge;
}

/**
 * A blog post. Content is a semantic HTML string (produced by the `blog-write` skill) rendered by
 * the `BlogProse` component. Optional `hero` and per-slug assets live under `public/data/blog/<slug>/`.
 */
export interface BlogPost {
  /** URL segment + stable id; matches folder under `public/data/blog/<slug>/`. */
  slug: string;
  title: string;
  /** ISO publish date, `YYYY-MM-DD`. */
  date: string;
  /** ISO last-updated date, `YYYY-MM-DD`. */
  updated?: string;
  tags: string[];
  /** 1–2 sentence summary; used on cards and as the meta description. */
  excerpt: string;
  /** Estimated reading time in minutes (~200 wpm). */
  readingMinutes?: number;
  /** Optional lead image shown above the body. */
  hero?: ContentImage;
  /** Semantic HTML body — only the tag set styled by `BlogProse`. No inline styles, no `h1`. */
  content: string;
  /** When true, hidden from the blog list and sitemap. */
  draft?: boolean;
}