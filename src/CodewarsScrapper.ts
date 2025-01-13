import { Browser } from 'puppeteer';
import { BrowserDriver } from './BrowserDriver';

export interface ICodewarsScrapper {
  getUserChallengeSolution(challengeId: string, language: string): Promise<string>
}

export class CodewarsScrapper {
  constructor(private browserDriver: BrowserDriver) { }

  public async getUserChallengeSolution(challengeId: string, language: string) {
    const page = await this.browserDriver.browser?.newPage()
    await page?.goto(`https://www.codewars.com/kata/${challengeId}/solutions/${language}/me/newest`)
    await page?.waitForSelector("#solutions_list", { timeout: 60000 })
    const solution = await page?.$eval("#solutions_list pre:first-of-type", (el) => el.textContent);
    await page?.close()
    return solution
  }
}