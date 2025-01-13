import dotenv from "dotenv";
dotenv.config();

import { User } from "./User";
import { BrowserDriver } from './BrowserDriver';
import { CodewarsLoader } from './CodewarsLoader';
import { Repository } from './Repository';

async function main() {
  const browser = new BrowserDriver()
  await browser.open()
  await browser.login() // doest know where to put login actually (CodeWars or BrowserDriver)
  try {
    const browserCookie = await browser.browser?.cookies()
    const _session_id = browserCookie?.find(({ name }) => name === "_session_id")
    if (!_session_id) {
      throw new Error("Not logged in")
    }

    const codewarsLoader: CodewarsLoader = new CodewarsLoader(browser)
    const repository = new Repository(process.env.GITHUB_USERNAME, process.env.GITHUB_REPO_NAME)

    const user = new User(process.env.CODEWARS_USER as string, codewarsLoader, repository)

    await browser.close()
  } catch (error) {
    await browser.close()
  }

  // get user's codewars challenges - User
  // get user's challenges from history - User

  // get challenges to update - Sync (self)
  // for each challenge to update - Sync (self)

  // get challenge details - Challenge -> CodeWars -> BrowserDriver

  // for each completed language
  // get challenge solution - Challenge -> CodeWars -> BrowserDriver

  // create file problem.md - FileToCommit
  // add file to repository - Repository
  // create file solution.ext - FileToCommit
  // add file to repository - Repository
  // create / update file challenges.json  
  // add file to repository - Repository
  // commit file to repository - Repository
  // push to repository - Repository

  // commit file to repository - Repository
  // push to repository
}

main()