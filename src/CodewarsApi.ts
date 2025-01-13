export interface ICodewarsApi {
  getUserCompletedChallenges(username: string): Promise<any>
  getChallengeDetails(challengeId: string): Promise<any>
}

export class CodewarsApi {
  constructor() {
  }

  public async getUserCompletedChallenges(username: string) {
    let katas: Kata[] = []
    let pages = 1
    for (let i = 0; i < pages; i++) {
      const res = await fetch(`https://www.codewars.com/api/v1/users/${username}/code-challenges/completed?page=${i}`)
      const resJson = await res.json()
      pages = resJson.totalPages
      katas = [...katas, ...resJson.data]
    }

    console.log(katas.length)
    return katas
  }

  public async getChallengeDetails(challengeId: string) {
    const res = await fetch(`https://www.codewars.com/api/v1/code-challenges/${challengeId}`)
    const resJson = await res.json()
    return resJson
  }
}

type Kata = {
  id: string,
  completedAt: string,
  completedLanguages: string[]
}