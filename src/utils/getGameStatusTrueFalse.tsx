import cache from "./cache";
import strings from "../constants/strings";

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
    questionsTrueFalseOne = await cache.get(strings.questionsTrueFalseOne);
    questionsTrueFalseTwo = await cache.get(strings.questionsTrueFalseTwo);
    questionsTrueFalseThree = await cache.get(
      strings.questionsTrueFalseThree
    );
    questionsTrueFalseFour = await cache.get(strings.questionsTrueFalseFour);
    questionsTrueFalseOneNoTimer = await cache.get(
      strings.questionsTrueFalseOneNoTimer
    );
    questionsTrueFalseTwoNoTimer = await cache.get(
      strings.questionsTrueFalseTwoNoTimer
    );
    questionsTrueFalseThreeNoTimer = await cache.get(
      strings.questionsTrueFalseThreeNoTimer
    );
    questionsTrueFalseFourNoTimer = await cache.get(
      strings.questionsTrueFalseFourNoTimer
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
