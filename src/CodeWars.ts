import fakeHistory from "../history"

type Kata = {
  id: string,
  completedAt: string,
  completedLanguages: string[] 
}

export class CodeWars {
  private username = "tloyan"
  private katas: Kata[] = []
  private history: Kata[] = []

  public async init() {
    await this.getCompletedChallenges()
    await this.getChallengeHistory()
  }

  private async getCompletedChallenges() {
    let katas: Kata[] = []
    let pages = 1
    for (let i = 0; i < pages; i++) {
      const res = await fetch(`https://www.codewars.com/api/v1/users/${this.username}/code-challenges/completed?page=${i}`)
      const resJson = await res.json()
      pages = resJson.totalPages
      katas = [...katas, ...resJson.data]
    }

    this.katas = katas
    console.log(katas.length)
    return katas
  }

  getChallengeToUpdate() {
    return this.katas.filter(kata => {
      const hkata = this.history.find(hk => hk.id === kata.id)
      if (!hkata) {
        return true /* new challenge */
      } else if (hkata && hkata.completedAt !== kata.completedAt) {
        return true /* kata updated or new language used to solve this kata */
      }
      return false
    })
  }

  private getChallengeHistory() {
    const history: Kata[] = fakeHistory
    this.history = history
  }

  getKatasSolution() {}
}