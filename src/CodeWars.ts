import fakeHistory from "../history.js"

type Kata = {
  id: string,
  completedAt: string,
  completedLanguages: string[] 
}

export class CodeWars {
  private username = process.env.CODEWARS_USERNAME
  private accessToken = null
  
  constructor() {}

  async init() {
    /*
      Does not work
      Problem: cross origin blocked request or cloudflare ...
      Solution: use puppeteer to make request as normal end user on navigator
    */ 
    this.login()
  }

  private async login() {
    // const headers = {
    //   "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
    //   "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
    //   "Accept-Language": "en-US,en;q=0.9",
    // };

    // const res = await fetch("https://www.codewars.com/users/sign_in", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     user: {
    //       email: process.env.CODEWARS_USER_EMAIL,
    //       password: process.env.CODEWARS_USER_PASSWORD
    //     }
    //   }),
    //   headers: headers
    // })
    // console.log(res)
  }

  public async getCompletedChallenges() {
    let katas: Kata[] = []
    let pages = 1
    for (let i = 0; i < pages; i++) {
      const res = await fetch(`https://www.codewars.com/api/v1/users/${this.username}/code-challenges/completed?page=${i}`)
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

  public async getChallengeSolution(challengeId: string) {

  }
}