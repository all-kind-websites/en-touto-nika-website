import cache from "./cache";
import asyncNames from "../constants/asyncNames";

const getGameStatusTrueFalse = (setGamesStatus: Function) => {
  let questionsTrueFalseOne: Array<object> = [],
    questionsTrueFalseTwo: Array<object> = [],
    questionsTrueFalseThree: Array<object> = [],
    questionsTrueFalseFour: Array<object> = [],
    questionsTrueFalseOneNoTimer: Array<object> = [],
    questionsTrueFalseTwoNoTimer: Array<object> = [],
    questionsTrueFalseThreeNoTimer: Array<object> = [],
    questionsTrueFalseFourNoTimer: Array<object> = [];

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

export default getGameStatusTrueFalse;
