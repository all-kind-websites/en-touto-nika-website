import cache from "./cache";
import asyncNames from "../constants/asyncNames/asyncNames";

export default (setGamesStatus) => {
  let questionsTrueFalseOne = null,
    questionsTrueFalseTwo = null,
    questionsTrueFalseThree = null,
    questionsTrueFalseFour = null,
    questionsTrueFalseOneNoTimer = null,
    questionsTrueFalseTwoNoTimer = null,
    questionsTrueFalseThreeNoTimer = null,
    questionsTrueFalseFourNoTimer = null;

  const checkCategories = async () => {
    questionsTrueFalseOne = await cache.get(asyncNames.questionsTrueFalseOne);
    questionsTrueFalseTwo = await cache.get(asyncNames.questionsTrueFalseTwo);
    questionsTrueFalseThree = await cache.get(
      asyncNames.questionsTrueFalseThree
    );
    questionsTrueFalseFour = await cache.get(asyncNames.questionsTrueFalseFour);
    questionsTrueFalseOneNoTimer = await cache.get(
      asyncNames.questionsTrueFalseOneNoTimer
    );
    questionsTrueFalseTwoNoTimer = await cache.get(
      asyncNames.questionsTrueFalseTwoNoTimer
    );
    questionsTrueFalseThreeNoTimer = await cache.get(
      asyncNames.questionsTrueFalseThreeNoTimer
    );
    questionsTrueFalseFourNoTimer = await cache.get(
      asyncNames.questionsTrueFalseFourNoTimer
    );
  };

  checkCategories().then(() => {
    if (
      !!questionsTrueFalseOne ||
      !!questionsTrueFalseTwo ||
      !!questionsTrueFalseThree ||
      !!questionsTrueFalseFour ||
      !!questionsTrueFalseOneNoTimer ||
      !!questionsTrueFalseTwoNoTimer ||
      !!questionsTrueFalseThreeNoTimer ||
      !!questionsTrueFalseFourNoTimer
    ) {
      setGamesStatus({
        questionsTrueFalseOne: !!questionsTrueFalseOne,
        questionsTrueFalseTwo: !!questionsTrueFalseTwo,
        questionsTrueFalseThree: !!questionsTrueFalseThree,
        questionsTrueFalseFour: !!questionsTrueFalseFour,
        questionsTrueFalseOneNoTimer: !!questionsTrueFalseOneNoTimer,
        questionsTrueFalseTwoNoTimer: !!questionsTrueFalseTwoNoTimer,
        questionsTrueFalseThreeNoTimer: !!questionsTrueFalseThreeNoTimer,
        questionsTrueFalseFourNoTimer: !!questionsTrueFalseFourNoTimer,
      });
    }
  });
};
