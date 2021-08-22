import cache from "./cache";
import asyncNames from "../constants/asyncNames";

const getNumOfTotalQuestionsTrueFalse = async (
  categoryId: string,
  gameType: string,
  numOfTotalQuestions: number,
  setNumOfTotalQuestions: Function,
  timer: string,
  timeOut: boolean
) => {
  let strOfTotQuestions = "";
  if (gameType === "TrueFalse") {
    strOfTotQuestions = await cache.get(
      asyncNames.numOfTotQuestionsTrueFalseMixed
    );
  }

  if (categoryId === "c1") {
    strOfTotQuestions = await cache.get(
      `${asyncNames.numOfTotQuestionsTrueFalseOne}${timer}`
    );
  }
  if (categoryId === "c2") {
    strOfTotQuestions = await cache.get(
      `${asyncNames.numOfTotQuestionsTrueFalseTwo}${timer}`
    );
  }
  if (categoryId === "c3") {
    strOfTotQuestions = await cache.get(
      `${asyncNames.numOfTotQuestionsTrueFalseThree}${timer}`
    );
  }
  if (categoryId === "c4") {
    strOfTotQuestions = await cache.get(
      `${asyncNames.numOfTotQuestionsTrueFalseFour}${timer}`
    );
  }

  let newValue = 0;

  if (!!strOfTotQuestions && !timeOut) {
    newValue = +strOfTotQuestions + 1;
    setNumOfTotalQuestions(newValue);
  } else if (!strOfTotQuestions && !timeOut) {
    newValue = numOfTotalQuestions + 1;
    setNumOfTotalQuestions(newValue);
  } else if (timeOut) {
    newValue = numOfTotalQuestions;
  }

  // Remove old value and set new one in cache
  const val = String(newValue);
  if (gameType === "TrueFalse") {
    await cache.remove(asyncNames.numOfTotQuestionsTrueFalseMixed);
    await cache.set(asyncNames.numOfTotQuestionsTrueFalseMixed, val);
  }

  if (categoryId === "c1") {
    await cache.remove(`${asyncNames.numOfTotQuestionsTrueFalseOne}${timer}`);
    await cache.set(
      `${asyncNames.numOfTotQuestionsTrueFalseOne}${timer}`,
      val
    );
  }
  if (categoryId === "c2") {
    await cache.remove(`${asyncNames.numOfTotQuestionsTrueFalseTwo}${timer}`);
    await cache.set(
      `${asyncNames.numOfTotQuestionsTrueFalseTwo}${timer}`,
      val
    );
  }
  if (categoryId === "c3") {
    await cache.remove(`${asyncNames.numOfTotQuestionsTrueFalseThree}${timer}`);
    await cache.set(
      `${asyncNames.numOfTotQuestionsTrueFalseThree}${timer}`,
      val
    );
  }
  if (categoryId === "c4") {
    await cache.remove(`${asyncNames.numOfTotQuestionsTrueFalseFour}${timer}`);
    await cache.set(
      `${asyncNames.numOfTotQuestionsTrueFalseFour}${timer}`,
      val
    );
  }
};
export default getNumOfTotalQuestionsTrueFalse;