type ChallengeDetailsType = {
  id: string;
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
  solution: string;
  completedAt: string;
}

import path from 'path';
import { Kata } from './Sync.js';

export class FileToCommit {
  constructor(private challengeDetails: ChallengeDetailsType, private challengesHistory: Kata[]) {}

  readme() {
    const challengeDetails = this.challengeDetails
    return {
      path: `${challengeDetails.rank.id}/${challengeDetails.language}/${challengeDetails.slug}/problem.md`,
      content: challengeDetails.description
    }
  }

  solution() {
    const challengeDetails = this.challengeDetails
    return {
      path: `${challengeDetails.rank.id}/${challengeDetails.language}/${challengeDetails.slug}/solution.${this.getExtention(challengeDetails.language)}`,
      content: challengeDetails.solution
    }
  }

  history() {
    const challengeDetails = this.challengeDetails

    const hChallenge = this.challengesHistory.find(({id}) => id === challengeDetails.id)

    if (hChallenge) {
      const newHChallenge = {
        id: challengeDetails.id,
        completedLanguages: hChallenge.completedLanguages.includes(challengeDetails.language) ? [...hChallenge.completedLanguages] : [...hChallenge.completedLanguages, challengeDetails.language],
        completedAt: challengeDetails.completedAt
      }
      const hIndex = this.challengesHistory.findIndex(({id}) => id === challengeDetails.id)
      this.challengesHistory[hIndex] = newHChallenge
    } else {
      this.challengesHistory.push({
        id: challengeDetails.id,
        completedLanguages: [challengeDetails.language],
        completedAt: challengeDetails.completedAt
      })
    }

    return {
      path: "history.json",
      content: JSON.stringify(this.challengesHistory)
    }
  }

  getExtention(language: string) {
    return { "typescript": "ts", "python": "py", "javascript": "js" }[language]
  }
}