import { CodewarsLoader } from './CodewarsLoader';
import { Repository } from './Repository';
import { Challenge } from './types/challenge';
import { ChallengeDetails } from './types/challengeDetails';

export class User {
  constructor(private username: string, private challengeLoader: CodewarsLoader, private repository: Repository) { }

  async getPlatformChallenges(): Promise<Challenge[]> {
    return await this.challengeLoader.getUserCompletedChallenges(this.username);
  }

  async getRepositoryChallenges(): Promise<Array<Challenge & ChallengeDetails>> {
    try {
      const challengeJSON = await this.repository.getFile("challenges.json");
      const challenges = JSON.parse(challengeJSON);
      if (Array.isArray(challenges)) {
        return challenges;
      }
      throw new Error("Invalid challenges.json");
    } catch (error) {
      return [];
    }

  }
}