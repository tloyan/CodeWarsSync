
import { CodeWars } from './CodeWars';

async function main() {
  const codewars = new CodeWars()
  await codewars.init()
  console.log(codewars.getChallengeToUpdate().length)
  // getUserKatas
  // getPrevUserKatas
  // getNotUpdatedUserKatas
  // getNotUpdatedUserKatasWithDescriptionAndSolution

  // addDescriptionKataFile
  // addSolutionKataFile
  // commitKata
  // Loop Katas

  // push
}

main()