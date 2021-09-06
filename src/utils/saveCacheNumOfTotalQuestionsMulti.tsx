import cache from "./cache";
import strings from "../constants/strings";

const saveCacheNumOfTotalQuestionsMulti = async (
  categoryId: string,
  numOfTotalQuestions: number,
  timer: boolean
) => {
  let savedNumOfTotQuestions = 0;
  if (timer) {
    if (categoryId === "c1") {
      savedNumOfTotQuestions = await cache.get(
        strings.numOfTotQuestionsMultiOne
      );
    } else if (categoryId === "c2") {
      savedNumOfTotQuestions = await cache.get(
        strings.numOfTotQuestionsMultiTwo
      );
    } else if (categoryId === "c3") {
      savedNumOfTotQuestions = await cache.get(
        strings.numOfTotQuestionsMultiThree
      );
    } else if (categoryId === "c4") {
      savedNumOfTotQuestions = await cache.get(
        strings.numOfTotQuestionsMultiFour
      );
    }
  } else {
    if (categoryId === "c1") {
      savedNumOfTotQuestions = await cache.get(
        strings.numOfTotQuestionsMultiOneNoTimer
      );
    } else if (categoryId === "c2") {
      savedNumOfTotQuestions = await cache.get(
        strings.numOfTotQuestionsMultiTwoNoTimer
      );
    } else if (categoryId === "c3") {
      savedNumOfTotQuestions = await cache.get(
        strings.numOfTotQuestionsMultiThreeNoTimer
      );
    } else if (categoryId === "c4") {
      savedNumOfTotQuestions = await cache.get(
        strings.numOfTotQuestionsMultiFourNoTimer
      );
    }
  }
  let newValue = '';
  if (savedNumOfTotQuestions) {
    newValue = String(+savedNumOfTotQuestions + 1);
    saveToCache(timer, categoryId, newValue);
  } else {
    newValue = String(+numOfTotalQuestions + 1);
    saveToCache(timer, categoryId, newValue);
  }
};

const saveToCache = async (timer: boolean, categoryId: string, value: string) => {
  if (timer) {
    if (categoryId === "c1") {
      await cache.remove(strings.numOfTotQuestionsMultiOne);
      await cache.set(strings.numOfTotQuestionsMultiOne, value);
    } else if (categoryId === "c2") {
      await cache.remove(strings.numOfTotQuestionsMultiTwo);
      await cache.set(strings.numOfTotQuestionsMultiTwo, value);
    } else if (categoryId === "c3") {
      await cache.remove(strings.numOfTotQuestionsMultiThree);
      await cache.set(strings.numOfTotQuestionsMultiThree, value);
    } else if (categoryId === "c4") {
      await cache.remove(strings.numOfTotQuestionsMultiFour);
      await cache.set(strings.numOfTotQuestionsMultiFour, value);
    }
  } else {
    if (categoryId === "c1") {
      await cache.remove(strings.numOfTotQuestionsMultiOneNoTimer);
      await cache.set(strings.numOfTotQuestionsMultiOneNoTimer, value);
    } else if (categoryId === "c2") {
      await cache.remove(strings.numOfTotQuestionsMultiTwoNoTimer);
      await cache.set(strings.numOfTotQuestionsMultiTwoNoTimer, value);
    } else if (categoryId === "c3") {
      await cache.remove(strings.numOfTotQuestionsMultiThreeNoTimer);
      await cache.set(strings.numOfTotQuestionsMultiThreeNoTimer, value);
    } else if (categoryId === "c4") {
      await cache.remove(strings.numOfTotQuestionsMultiFourNoTimer);
      await cache.set(strings.numOfTotQuestionsMultiFourNoTimer, value);
    }
  }
};
export default saveCacheNumOfTotalQuestionsMulti;