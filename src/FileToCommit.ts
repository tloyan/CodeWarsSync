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

import { Kata } from './Sync';
import { getReadmeTemplate } from './fileTemplate';
import { Challenge } from './types/challenge';

import { EXTENSIONS } from './types/extensions';

export class FileToCommit {
  constructor(private challengeDetails: ChallengeDetailsType, private challengesHistory: Kata[]) { }

  getRankFolder(): string {
    const rankId = this.challengeDetails.rank.id
    const absoluteRank = Math.abs(rankId)
    return rankId < 0 ? `${absoluteRank}kyu` : `${absoluteRank}dan`
  }

  readme() {
    const challengeDetails = this.challengeDetails
    return {
      path: `${this.getRankFolder()}/${challengeDetails.language}/${challengeDetails.slug}/readme.md`,
      content: getReadmeTemplate(challengeDetails as unknown as Challenge)
    }
  }

  solution() {
    const challengeDetails = this.challengeDetails
    return {
      path: `${this.getRankFolder()}/${challengeDetails.language}/${challengeDetails.slug}/solution.${this.getExtention(challengeDetails.language)}`,
      content: challengeDetails.solution
    }
  }

  commit() {
    return `${this.getRankFolder()}/${this.challengeDetails.language}/${this.challengeDetails.slug}`
  }

  history() {
    const challengeDetails = this.challengeDetails
    const hChallenge = this.challengesHistory.find(({ id }) => id === challengeDetails.id)

    if (hChallenge) {
      const newHChallenge = {
        id: challengeDetails.id,
        completedLanguages: hChallenge.completedLanguages.includes(challengeDetails.language) ? [...hChallenge.completedLanguages] : [...hChallenge.completedLanguages, challengeDetails.language],
        completedAt: challengeDetails.completedAt
      }
      const hIndex = this.challengesHistory.findIndex(({ id }) => id === challengeDetails.id)
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
    console.log("test: => ", EXTENSIONS["javascript"])
    const ext = EXTENSIONS[language.toLowerCase() as keyof typeof EXTENSIONS]
    if (!ext) throw new Error(`Language non supporté: ${language}`)
    return ext
  }
}