export type ProjectCategory =
  | "Hospitality"
  | "Residential"
  | "Facade"
  | "Landscape"
  | "Public Realm"
  | "Mixed-Use";

export type Project = {
  slug: string;
  name: string;
  location: string;
  category: ProjectCategory;
  client: string;
  scope: string;
  year: number;
  heroImage: string;
  gallery: string[];
  overview: string;
  designConcept: string;
  credits: { role: string; name: string }[];
};

export type TeamMember = {
  name: string;
  role: string;
  photo: string;
  bio?: string;
};

export type NewsArticle = {
  slug: string;
  title: string;
  date: string;
  category: string;
  coverImage: string;
  excerpt: string;
  body: string;
};

export type Client = {
  name: string;
  logo: string;
};

export type TimelineMilestone = {
  year: number;
  era: string;
  title: string;
  description: string;
  image?: string;
};
