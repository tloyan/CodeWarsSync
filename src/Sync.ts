import { CodeWars } from './CodeWars.js';
import { FileToCommit } from './FileToCommit.js';
import { Repository } from './Repository.js';

type Kata = {
  id: string,
  completedAt: string,
  completedLanguages: string[] 
}


export class Sync {
  private repo = new Repository()
  private codewars = new CodeWars()

  private challenges: Kata[] = []
  private challengesHistory: Kata[] = []
  private challengeToUpdate: Kata[] = []
  private filesGroupByCommit: Array<Array<{ path: string, content: string }>> = []

  async init() {
    await this.repo.init()
    this.challenges = await this.codewars.getCompletedChallenges()
    this.challengesHistory = await this.getChallengeHistory()
    // this.challengeToUpdate = this.getChallengeToUpdate()
    this.challengeToUpdate = [this.getChallengeToUpdate()[0], this.getChallengeToUpdate()[1]]
    console.log(this.challengeToUpdate)
  }

  async createFilesToCommit() {
    this.challengeToUpdate.map(async (challenge) => {
      const challengeDetails = await this.codewars.getChallengeDetails(challenge.id)
      challenge.completedLanguages.map(async (language) => {
        const solution = this.codewars.getChallengeSolution(challenge.id)
        // new FileToCommit()
      })
    })
  }

  getChallengeToUpdate() {
    const challengeToUpdate = this.challenges.filter(challenge => {
      const hChallenge = this.challengesHistory.find(hk => hk.id === challenge.id)
      if (!hChallenge) {
        return true /* new challenge */
      } else if (hChallenge && hChallenge.completedAt !== challenge.completedAt) {
        return true /* kata updated or new language used to solve this kata */
      }
      return false
    })
    return challengeToUpdate
  }

  public async getChallengeHistory() {
    try {
      const historyJSON = await this.repo.getFile('history.json')
      const challengesHistory = JSON.parse(historyJSON)
      if (Array.isArray(challengesHistory)) {
        return challengesHistory
      }
      throw new Error("History File Corrupted")
    } catch(error) {
      return []
    }
  }

  async run() {}
}