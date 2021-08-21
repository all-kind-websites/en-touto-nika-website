import cache from "./cache";
import asyncNames from "../constants/asyncNames/asyncNames";

export default updateNumOfTotalQuestions = async (
  numOfTotalQuestions,
  setNumOfTotalQuestions,
  timer,
  gameType,
  categoryId
) => {
  setNumOfTotalQuestions(numOfTotalQuestions + 1);
  const numOfTot = numOfTotalQuestions.toString();
  if (timer) {
    if (categoryId == "c1") {
      await cache.remove(asyncNames.numOfTotQuestionsMultiOne);
      await cache.set(asyncNames.numOfTotQuestionsMultiOne, numOfTot);
    } else if (categoryId == "c2") {
      await cache.remove(asyncNames.numOfTotQuestionsMultiTwo);
      await cache.set(asyncNames.numOfTotQuestionsMultiTwo, numOfTot);
    } else if (categoryId == "c3") {
      await cache.remove(asyncNames.numOfTotQuestionsMultiThree);
      await cache.set(asyncNames.numOfTotQuestionsMultiThree, numOfTot);
    } else if (categoryId == "c4") {
      await cache.remove(asyncNames.numOfTotQuestionsMultiFour);
      await cache.set(asyncNames.numOfTotQuestionsMultiFour, numOfTot);
    }
  } else {
    if (categoryId == "c1") {
      await cache.remove(asyncNames.numOfTotQuestionsMultiOneNoTimer);
      await cache.set(asyncNames.numOfTotQuestionsMultiOneNoTimer, numOfTot);
    } else if (categoryId == "c2") {
      await cache.remove(asyncNames.numOfTotQuestionsMultiTwoNoTimer);
      await cache.set(asyncNames.numOfTotQuestionsMultiTwoNoTimer, numOfTot);
    } else if (categoryId == "c3") {
      await cache.remove(asyncNames.numOfTotQuestionsMultiThreeNoTimer);
      await cache.set(asyncNames.numOfTotQuestionsMultiThreeNoTimer, numOfTot);
    } else if (categoryId == "c4") {
      await cache.remove(asyncNames.numOfTotQuestionsMultiFourNoTimer);
      await cache.set(asyncNames.numOfTotQuestionsMultiFourNoTimer, numOfTot);
    }
  }
};
