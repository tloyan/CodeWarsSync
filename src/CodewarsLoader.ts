import { Browser } from 'puppeteer';
import { CodewarsApi, ICodewarsApi } from './CodewarsApi';
import { CodewarsScrapper, ICodewarsScrapper } from './CodewarsScrapper';
import { BrowserDriver } from './BrowserDriver';

export class CodewarsLoader implements ICodewarsApi, ICodewarsScrapper {
  private codewarsApi: CodewarsApi;
  private codeWarsScrapper: CodewarsScrapper

  constructor(browserDriver: BrowserDriver) {
    this.codewarsApi = new CodewarsApi();
    this.codeWarsScrapper = new CodewarsScrapper(browserDriver);
  }

  public getChallengeDetails(challengeId: string): Promise<any> {
    return this.codewarsApi.getChallengeDetails(challengeId);
  }

  public getUserCompletedChallenges(username: string): Promise<any> {
    return this.codewarsApi.getUserCompletedChallenges(username);
  }

  public getUserChallengeSolution(challengeId: string, language: string): Promise<any> {
    return this.codeWarsScrapper.getUserChallengeSolution(challengeId, language);
  }
}