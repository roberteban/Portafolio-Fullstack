export interface Repository {
  _id?: string;
  name: string;
  description: string;
  technologies: string[];
  url: string;
  image?: string;
  githubUpdatedAt: Date;
  language?: string;
  stars?: number;
  forks?: number;
}
