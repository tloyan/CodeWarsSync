export class User {
  challengeLoader: any;

  constructor(private username: string, challengeLoader: any) {
    this.challengeLoader = challengeLoader;
  }

  async getChallenges() {
    return await this.challengeLoader.getUserChallenges(this.username);
  }
}