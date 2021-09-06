import cache from "./cache";
import strings from "../constants/strings";

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
      strings.numOfTotQuestionsTrueFalseMixed
    );
  }

  if (categoryId === "c1") {
    strOfTotQuestions = await cache.get(
      `${strings.numOfTotQuestionsTrueFalseOne}${timer}`
    );
  }
  if (categoryId === "c2") {
    strOfTotQuestions = await cache.get(
      `${strings.numOfTotQuestionsTrueFalseTwo}${timer}`
    );
  }
  if (categoryId === "c3") {
    strOfTotQuestions = await cache.get(
      `${strings.numOfTotQuestionsTrueFalseThree}${timer}`
    );
  }
  if (categoryId === "c4") {
    strOfTotQuestions = await cache.get(
      `${strings.numOfTotQuestionsTrueFalseFour}${timer}`
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
    await cache.remove(strings.numOfTotQuestionsTrueFalseMixed);
    await cache.set(strings.numOfTotQuestionsTrueFalseMixed, val);
  }

  if (categoryId === "c1") {
    await cache.remove(`${strings.numOfTotQuestionsTrueFalseOne}${timer}`);
    await cache.set(
      `${strings.numOfTotQuestionsTrueFalseOne}${timer}`,
      val
    );
  }
  if (categoryId === "c2") {
    await cache.remove(`${strings.numOfTotQuestionsTrueFalseTwo}${timer}`);
    await cache.set(
      `${strings.numOfTotQuestionsTrueFalseTwo}${timer}`,
      val
    );
  }
  if (categoryId === "c3") {
    await cache.remove(`${strings.numOfTotQuestionsTrueFalseThree}${timer}`);
    await cache.set(
      `${strings.numOfTotQuestionsTrueFalseThree}${timer}`,
      val
    );
  }
  if (categoryId === "c4") {
    await cache.remove(`${strings.numOfTotQuestionsTrueFalseFour}${timer}`);
    await cache.set(
      `${strings.numOfTotQuestionsTrueFalseFour}${timer}`,
      val
    );
  }
};
export default getNumOfTotalQuestionsTrueFalse;