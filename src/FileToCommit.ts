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

  readme() {
    const challengeDetails = this.challengeDetails
    return {
      path: `${challengeDetails.rank.id}/${challengeDetails.slug}/problem.md`,
      content: challengeDetails.description
    }
  }

  solution() {
    const challengeDetails = this.challengeDetails
    return {
      path: `${challengeDetails.rank.id}/${challengeDetails.slug}/solution.${this.getExtention(challengeDetails.language)}`,
      content: challengeDetails.solution
    }
  }

  getExtention(language: string) {
    return { "typescript": "ts", "python": "py", "javascript": "js" }[language]
  }
}