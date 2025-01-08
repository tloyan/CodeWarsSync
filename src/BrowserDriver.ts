import puppeteer, { Browser } from 'puppeteer';

export class BrowserDriver {
  public browser: Browser | undefined

  async open() {
    this.browser = await puppeteer.launch()
  }

  async close() {
    await this.browser?.close()
  }

  async login() {
    const page = await this.browser?.newPage()
    await page?.goto("https://www.codewars.com/users/sign_in")
    await page?.waitForSelector("#user_email", { timeout: 60000 })
    await page?.type("#user_email", process.env.CODEWARS_USER_EMAIL)
    await page?.type("#user_password", process.env.CODEWARS_USER_PASSWORD)
    await page?.click("button[type='submit']")
    await page?.close()
  }
}