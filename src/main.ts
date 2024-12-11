import dotenv from "dotenv";
dotenv.config();

import { CodeWars } from './CodeWars.js';
import { Repository } from './Repository.js';

async function main() {
  // console.log(process.env.CODEWARS_USERNAME)
  // const codewars = new CodeWars()
  // await codewars.init()
  // console.log(codewars.getChallengeToUpdate().length)




  // getUserKatas
  // getPrevUserKatas
  // getNotUpdatedUserKatas
  // getNotUpdatedUserKatasWithDescriptionAndSolution

  // addDescriptionKataFile
  // addSolutionKataFile
  // commitKata
  // Loop Katas

  // push
  const repo = new Repository()
  await repo.init()
  // repo.add("test1.txt", "test1content")
  // repo.add("test2.txt", "test2content")
  repo.add("test3.txt", "test3content")
  await repo.commit("test commit")
  await repo.push()
}

main()