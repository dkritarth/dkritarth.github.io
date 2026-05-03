/** Hash-route targets for the SPA (`#/`, `#/about`, …). */
export type SitePage = 'home' | 'about' | 'research' | 'projects' | 'education' | 'notes';

export interface Publication {
  title: string;
  authors: string;
  venue: string;
  year: string;
  link?: string;
  status?: string;
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
  /** Comma-separated team roster in publication order */
  team: string;
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

export interface BlogPost {
  title: string;
  subtitle: string;
  date: string;
  content: string[];
  tags: string[];
}