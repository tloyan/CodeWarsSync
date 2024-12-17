import { CodeWars } from './CodeWars.js';
import { FileToCommit } from './FileToCommit.js';
import { Repository } from './Repository.js';

export type Kata = {
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

  async init() {
    await this.repo.init()
    await this.codewars.init()
    this.challenges = await this.codewars.getCompletedChallenges()
    this.challengesHistory = await this.getChallengeHistory()
    // this.challengeToUpdate = this.getChallengeToUpdate()
    this.challengeToUpdate = [this.getChallengeToUpdate()[0], this.getChallengeToUpdate()[1]]
    console.log(this.challengeToUpdate)
  }

  async sync() {
    for await (const [pFile, sFile, hFile] of this.getFilesToCommit()) {
      console.log("history:", this.challengesHistory)
      this.repo.add(pFile.path, pFile.content)
      this.repo.add(sFile.path, sFile.content)
      this.repo.add(hFile.path, hFile.content)
      console.log("commit: commit kata solution")
      await this.repo.commit("commit kata solution")
      await this.repo.push()
    }
  }


  async *getFilesToCommit() {
    for (const challenge of this.challengeToUpdate) {
      const challengeDetails = await this.codewars.getChallengeDetails(challenge.id)
      for (const language of challenge.completedLanguages) {
        const solution = await this.codewars.getChallengeSolution(challenge.id, language)
        const completedAt = this.challenges.find(({ id }) => id === challenge.id)?.completedAt
        const ftc = new FileToCommit({ ...challengeDetails, language: language, solution: solution, completedAt: completedAt }, this.challengesHistory)
        yield [ftc.readme(), ftc.solution(), ftc.history()]
      }
    }
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
    } catch (error) {
      return []
    }
  }

  async run() { }
}