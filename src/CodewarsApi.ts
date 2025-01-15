import { Challenge } from './types/challenge'
import { ChallengeDetails } from './types/challengeDetails'

export interface ICodewarsApi {
  getUserCompletedChallenges(username: string): Promise<Challenge[]>
  getChallengeDetails(challengeId: string): Promise<ChallengeDetails>
}

export class CodewarsApi {
  constructor() {
  }

  public async getUserCompletedChallenges(username: string): Promise<Challenge[]> {
    let challenges: Challenge[] = []
    let pages = 1
    for (let i = 0; i < pages; i++) {
      const res = await fetch(`https://www.codewars.com/api/v1/users/${username}/code-challenges/completed?page=${i}`)
      const resJson = await res.json()
      pages = resJson.totalPages
      challenges = [...challenges, ...resJson.data]
    }

    return challenges
  }

  public async getChallengeDetails(challengeId: string): Promise<ChallengeDetails> {
    const res = await fetch(`https://www.codewars.com/api/v1/code-challenges/${challengeId}`)
    const resJson = await res.json()
    return resJson
  }
}