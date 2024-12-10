declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      CODEWARS_USERNAME: string;
      CODEWARS_USER_EMAIL: string;
      CODEWARS_USER_PASSWORD: string;
      GITHUB_PASSKEY: string;
      GITHUB_REPO_NAME: string;
      GITHUB_USERNAME: string;
    }
  }
}

export {}