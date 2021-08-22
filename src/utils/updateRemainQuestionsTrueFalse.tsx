import cache from "./cache";
import asyncNames from "../constants/asyncNames";

const updateRemainQuestionsTrueFalse = async (
  categoryId: string,
  gameType: string,
  numOfRemainQuestions: number,
  setNumOfRemainQuestions: Function,
  timer: string
) => {
  let strOfRemainQuestions = "";
  if (gameType === "TrueFalse" && !categoryId) {
    strOfRemainQuestions = await cache.get(
      asyncNames.numOfRemainQuestionsTrueFalseMixed
    );
  }

  if (categoryId === "c1") {
    strOfRemainQuestions = await cache.get(
      `${asyncNames.numOfRemainQuestionsTrueFalseOne}${timer}`
    );
  }
  if (categoryId === "c2") {
    strOfRemainQuestions = await cache.get(
      `${asyncNames.numOfRemainQuestionsTrueFalseTwo}${timer}`
    );
  }
  if (categoryId === "c3") {
    strOfRemainQuestions = await cache.get(
      `${asyncNames.numOfRemainQuestionsTrueFalseThree}${timer}`
    );
  }
  if (categoryId === "c4") {
    strOfRemainQuestions = await cache.get(
      `${asyncNames.numOfRemainQuestionsTrueFalseFour}${timer}`
    );
  }

  let newValue = 0;
  if (strOfRemainQuestions !== null) {
    newValue = +strOfRemainQuestions - 1;
    setNumOfRemainQuestions(+strOfRemainQuestions - 1);
  } else {
    newValue = numOfRemainQuestions - 1;
    setNumOfRemainQuestions(numOfRemainQuestions - 1);
  }

  // Remove old value and set new one in cache
  const value = String(newValue);
  if (gameType === "TrueFalse" && !categoryId) {
    await cache.remove(asyncNames.numOfRemainQuestionsTrueFalseMixed);
    await cache.set(asyncNames.numOfRemainQuestionsTrueFalseMixed, value);
  }

  if (categoryId === "c1") {
    await cache.remove(
      `${asyncNames.numOfRemainQuestionsTrueFalseOne}${timer}`
    );
    await cache.set(
      `${asyncNames.numOfRemainQuestionsTrueFalseOne}${timer}`,
      newValue
    );
  }
  if (categoryId === "c2") {
    await cache.remove(
      `${asyncNames.numOfRemainQuestionsTrueFalseTwo}${timer}`
    );
    await cache.set(
      `${asyncNames.numOfRemainQuestionsTrueFalseTwo}${timer}`,
      newValue
    );
  }
  if (categoryId === "c3") {
    await cache.remove(
      `${asyncNames.numOfRemainQuestionsTrueFalseThree}${timer}`
    );
    await cache.set(
      `${asyncNames.numOfRemainQuestionsTrueFalseThree}${timer}`,
      newValue
    );
  }
  if (categoryId === "c4") {
    await cache.remove(
      `${asyncNames.numOfRemainQuestionsTrueFalseFour}${timer}`
    );
    await cache.set(
      `${asyncNames.numOfRemainQuestionsTrueFalseFour}${timer}`,
      newValue
    );
  }
};

export default updateRemainQuestionsTrueFalse