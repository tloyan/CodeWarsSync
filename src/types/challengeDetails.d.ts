export type ChallengeDetails = {
  id: string;
  name: string;
  slug: string;
  url: string;
  category: string;
  description: string;
  tags: string[];
  languages: string[];
  rank?: {
    id: number;
    name: string;
    color: string
  };
  createdBy: {
    username: string;
    url: string
  };
  publishedAt: string;
  approvedBy?: {
    username: string;
    url: string
  };
  approvedAt: string;
  totalCompleted: number;
  totalAttempts: number;
  totalStars: number;
  voteScore: number;
  unresolved?: {
    issues: number;
    suggestions: number
  };
}