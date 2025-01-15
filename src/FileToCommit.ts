import { getReadmeTemplate } from './fileTemplate';
import { Challenge } from './types/challenge';
import { ChallengeDetails } from './types/challengeDetails';

import { EXTENSIONS } from './types/extensions';

export class FileToCommit {
  constructor(private challengeDetails: ChallengeDetails & { language: string, solution: string, completedAt: string }, private challengesHistory: Array<Challenge & ChallengeDetails>) { }

  getRankFolder(): string {
    const rankName = this.challengeDetails.rank?.name || "unranked"
    return rankName.toLowerCase().replace(/\s/g, "-")
  }

  readme() {
    const challengeDetails = this.challengeDetails
    return {
      path: `${this.getRankFolder()}/${challengeDetails.language}/${challengeDetails.slug}/readme.md`,
      content: getReadmeTemplate(challengeDetails)
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
    return `${this.challengeDetails.language}: ${this.getRankFolder()} -- ${this.challengeDetails.slug}`
  }

  history() {
    const challengeDetails = this.challengeDetails
    const hChallenge = this.challengesHistory.find(({ id }) => id === challengeDetails.id)

    if (hChallenge) {
      const newHChallenge = {
        ...challengeDetails,
        completedLanguages: hChallenge.completedLanguages.includes(challengeDetails.language) ? [...hChallenge.completedLanguages] : [...hChallenge.completedLanguages, challengeDetails.language],
        completedAt: challengeDetails.completedAt
      }
      const hIndex = this.challengesHistory.findIndex(({ id }) => id === challengeDetails.id)
      this.challengesHistory[hIndex] = newHChallenge
    } else {
      this.challengesHistory.push({
        ...challengeDetails,
        completedLanguages: [challengeDetails.language],
        completedAt: challengeDetails.completedAt
      })
    }

    return {
      path: "challenges.json",
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