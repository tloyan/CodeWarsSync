type ChallengeDetailsType = {
  name: string;
  slug: string;
  category: string;
  url: string;
  rank: {
    id: number;
    name: string;
    color: string;
  };
  description: string;
  language: string;
  solution: string
}

export class FileToCommit {
  constructor(private challengeDetails: ChallengeDetailsType) {}

  readme() {}
  solution() {}
  // generate() {
  //   const { name, slug, category, url, rank, description, language, solution } = this.challengeDetails
  // }
}