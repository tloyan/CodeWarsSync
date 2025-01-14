import dotenv from "dotenv";
dotenv.config();

import { User } from "./User";
import { BrowserDriver } from './BrowserDriver';
import { CodewarsLoader } from './CodewarsLoader';
import { Repository } from './Repository';
import { Synchronizer } from './Synchronizer';

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
    await repository.init()

    const user = new User(process.env.CODEWARS_USERNAME as string, codewarsLoader, repository)

    const synchronizer = new Synchronizer(user, codewarsLoader, repository)
    await synchronizer.sync()

    await browser.close()
  } catch (error) {
    console.error(error)
    await browser.close()
  }
}

main()