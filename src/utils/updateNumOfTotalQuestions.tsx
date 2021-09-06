import cache from "./cache";
import strings from "../constants/strings";

const updateNumOfTotalQuestions = async (
  numOfTotalQuestions: number,
  setNumOfTotalQuestions: Function,
  timer: boolean,
  gameType: any,
  categoryId: string
) => {
  setNumOfTotalQuestions(numOfTotalQuestions + 1);
  const numOfTot = numOfTotalQuestions.toString();
  if (timer) {
    if (categoryId === "c1") {
      await cache.remove(strings.numOfTotQuestionsMultiOne);
      await cache.set(strings.numOfTotQuestionsMultiOne, numOfTot);
    } else if (categoryId === "c2") {
      await cache.remove(strings.numOfTotQuestionsMultiTwo);
      await cache.set(strings.numOfTotQuestionsMultiTwo, numOfTot);
    } else if (categoryId === "c3") {
      await cache.remove(strings.numOfTotQuestionsMultiThree);
      await cache.set(strings.numOfTotQuestionsMultiThree, numOfTot);
    } else if (categoryId === "c4") {
      await cache.remove(strings.numOfTotQuestionsMultiFour);
      await cache.set(strings.numOfTotQuestionsMultiFour, numOfTot);
    }
  } else {
    if (categoryId === "c1") {
      await cache.remove(strings.numOfTotQuestionsMultiOneNoTimer);
      await cache.set(strings.numOfTotQuestionsMultiOneNoTimer, numOfTot);
    } else if (categoryId === "c2") {
      await cache.remove(strings.numOfTotQuestionsMultiTwoNoTimer);
      await cache.set(strings.numOfTotQuestionsMultiTwoNoTimer, numOfTot);
    } else if (categoryId === "c3") {
      await cache.remove(strings.numOfTotQuestionsMultiThreeNoTimer);
      await cache.set(strings.numOfTotQuestionsMultiThreeNoTimer, numOfTot);
    } else if (categoryId === "c4") {
      await cache.remove(strings.numOfTotQuestionsMultiFourNoTimer);
      await cache.set(strings.numOfTotQuestionsMultiFourNoTimer, numOfTot);
    }
  }
};
export default updateNumOfTotalQuestions;