import puppeteer, { Browser, Page } from 'puppeteer'

type Kata = {
  id: string,
  completedAt: string,
  completedLanguages: string[] 
}

export class CodeWars {
  private username = process.env.CODEWARS_USERNAME
  private cookies = []
  private browser: Browser | undefined
  private page: Page | undefined
  
  constructor() {}

  async init() {
    this.browser = await puppeteer.launch()
    this.page = await this.browser.newPage()
    await this.login()
    // await this.getChallengeSolution("59d9ff9f7905dfeed50000b0")
  }

  private async login() {
    const page = this.page!
    await page.goto("https://www.codewars.com/users/sign_in")
    await page.type("#user_email", process.env.CODEWARS_USER_EMAIL)
    await page.type("#user_password", process.env.CODEWARS_USER_PASSWORD)
    await page.click("button[type='submit']")
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
    const page = this.page
    await page?.goto(`https://www.codewars.com/kata/${challengeId}/solutions/typescript/me/newest`)
    await page?.waitForSelector("#solutions_list", { timeout: 60000 })
    const solution = await page?.$eval("#solutions_list pre:first-of-type", (el) => el.textContent);
    console.log(solution)
    return solution
  }
}