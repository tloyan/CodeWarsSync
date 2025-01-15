import { CodewarsLoader } from './CodewarsLoader';
import { FileToCommit } from './FileToCommit';
import { Repository } from './Repository';
import { Challenge } from './types/challenge';
import { User } from './User';

export class Synchronizer {
  constructor(private user: User, private challengeLoader: CodewarsLoader, private repository: Repository) { }

  async sync() {
    const newChallenges = await this.getNewChallenges();
    let repositoryChallenges = await this.user.getRepositoryChallenges();
    for (const challenge of newChallenges) {
      const challengeDetails = await this.challengeLoader.getChallengeDetails(challenge.id);
      for (const language of challenge.completedLanguages) {
        const schallengeSolution = await this.challengeLoader.getUserChallengeSolution(challenge.id, language);
        const ftc = new FileToCommit({ ...challengeDetails, language: language, solution: schallengeSolution, completedAt: challenge.completedAt }, repositoryChallenges);
        const readme = ftc.readme();
        const solution = ftc.solution();
        const history = ftc.history();
        this.repository.add(readme.path, readme.content);
        this.repository.add(solution.path, solution.content);
        this.repository.add(history.path, history.content);
        await this.repository.commit(ftc.commit());
        await this.repository.push();
      }

    }
  }

  async getNewChallenges() {
    const platformChallenges = await this.user.getPlatformChallenges();
    const repositoryChallenges = await this.user.getRepositoryChallenges();

    return platformChallenges.filter((challenge: Challenge) => {
      return !repositoryChallenges.find((repoChallenge: Challenge) => repoChallenge.id === challenge.id || repoChallenge.completedAt === challenge.completedAt);
    });
  }
}