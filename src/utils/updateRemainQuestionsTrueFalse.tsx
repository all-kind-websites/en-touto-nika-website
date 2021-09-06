import cache from "./cache";
import strings from "../constants/strings";

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
      strings.numOfRemainQuestionsTrueFalseMixed
    );
  }

  if (categoryId === "c1") {
    strOfRemainQuestions = await cache.get(
      `${strings.numOfRemainQuestionsTrueFalseOne}${timer}`
    );
  }
  if (categoryId === "c2") {
    strOfRemainQuestions = await cache.get(
      `${strings.numOfRemainQuestionsTrueFalseTwo}${timer}`
    );
  }
  if (categoryId === "c3") {
    strOfRemainQuestions = await cache.get(
      `${strings.numOfRemainQuestionsTrueFalseThree}${timer}`
    );
  }
  if (categoryId === "c4") {
    strOfRemainQuestions = await cache.get(
      `${strings.numOfRemainQuestionsTrueFalseFour}${timer}`
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
    await cache.remove(strings.numOfRemainQuestionsTrueFalseMixed);
    await cache.set(strings.numOfRemainQuestionsTrueFalseMixed, value);
  }

  if (categoryId === "c1") {
    await cache.remove(
      `${strings.numOfRemainQuestionsTrueFalseOne}${timer}`
    );
    await cache.set(
      `${strings.numOfRemainQuestionsTrueFalseOne}${timer}`,
      newValue
    );
  }
  if (categoryId === "c2") {
    await cache.remove(
      `${strings.numOfRemainQuestionsTrueFalseTwo}${timer}`
    );
    await cache.set(
      `${strings.numOfRemainQuestionsTrueFalseTwo}${timer}`,
      newValue
    );
  }
  if (categoryId === "c3") {
    await cache.remove(
      `${strings.numOfRemainQuestionsTrueFalseThree}${timer}`
    );
    await cache.set(
      `${strings.numOfRemainQuestionsTrueFalseThree}${timer}`,
      newValue
    );
  }
  if (categoryId === "c4") {
    await cache.remove(
      `${strings.numOfRemainQuestionsTrueFalseFour}${timer}`
    );
    await cache.set(
      `${strings.numOfRemainQuestionsTrueFalseFour}${timer}`,
      newValue
    );
  }
};

export default updateRemainQuestionsTrueFalse