import cache from "./cache";
import asyncNames from "../constants/asyncNames";

const saveCacheNumOfTotalQuestionsMulti = async (
  categoryId: string,
  numOfTotalQuestions: number,
  timer: boolean
) => {
  let savedNumOfTotQuestions = 0;
  if (timer) {
    if (categoryId === "c1") {
      savedNumOfTotQuestions = await cache.get(
        asyncNames.numOfTotQuestionsMultiOne
      );
    } else if (categoryId === "c2") {
      savedNumOfTotQuestions = await cache.get(
        asyncNames.numOfTotQuestionsMultiTwo
      );
    } else if (categoryId === "c3") {
      savedNumOfTotQuestions = await cache.get(
        asyncNames.numOfTotQuestionsMultiThree
      );
    } else if (categoryId === "c4") {
      savedNumOfTotQuestions = await cache.get(
        asyncNames.numOfTotQuestionsMultiFour
      );
    }
  } else {
    if (categoryId === "c1") {
      savedNumOfTotQuestions = await cache.get(
        asyncNames.numOfTotQuestionsMultiOneNoTimer
      );
    } else if (categoryId === "c2") {
      savedNumOfTotQuestions = await cache.get(
        asyncNames.numOfTotQuestionsMultiTwoNoTimer
      );
    } else if (categoryId === "c3") {
      savedNumOfTotQuestions = await cache.get(
        asyncNames.numOfTotQuestionsMultiThreeNoTimer
      );
    } else if (categoryId === "c4") {
      savedNumOfTotQuestions = await cache.get(
        asyncNames.numOfTotQuestionsMultiFourNoTimer
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
      await cache.remove(asyncNames.numOfTotQuestionsMultiOne);
      await cache.set(asyncNames.numOfTotQuestionsMultiOne, value);
    } else if (categoryId === "c2") {
      await cache.remove(asyncNames.numOfTotQuestionsMultiTwo);
      await cache.set(asyncNames.numOfTotQuestionsMultiTwo, value);
    } else if (categoryId === "c3") {
      await cache.remove(asyncNames.numOfTotQuestionsMultiThree);
      await cache.set(asyncNames.numOfTotQuestionsMultiThree, value);
    } else if (categoryId === "c4") {
      await cache.remove(asyncNames.numOfTotQuestionsMultiFour);
      await cache.set(asyncNames.numOfTotQuestionsMultiFour, value);
    }
  } else {
    if (categoryId === "c1") {
      await cache.remove(asyncNames.numOfTotQuestionsMultiOneNoTimer);
      await cache.set(asyncNames.numOfTotQuestionsMultiOneNoTimer, value);
    } else if (categoryId === "c2") {
      await cache.remove(asyncNames.numOfTotQuestionsMultiTwoNoTimer);
      await cache.set(asyncNames.numOfTotQuestionsMultiTwoNoTimer, value);
    } else if (categoryId === "c3") {
      await cache.remove(asyncNames.numOfTotQuestionsMultiThreeNoTimer);
      await cache.set(asyncNames.numOfTotQuestionsMultiThreeNoTimer, value);
    } else if (categoryId === "c4") {
      await cache.remove(asyncNames.numOfTotQuestionsMultiFourNoTimer);
      await cache.set(asyncNames.numOfTotQuestionsMultiFourNoTimer, value);
    }
  }
};
export default saveCacheNumOfTotalQuestionsMulti;