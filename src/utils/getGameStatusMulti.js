import cache from "./cache";
import asyncNames from "../constants/asyncNames/asyncNames";

export default (setGamesStatus) => {

  let questionsMultiOne = null;
  let questionsMultiTwo = null;
  let questionsMultiThree = null;
  let questionsMultiFour = null;
  let questionsMultiOneNoTimer = null;
  let questionsMultiTwoNoTimer = null;
  let questionsMultiThreeNoTimer = null;
  let questionsMultiFourNoTimer = null;

  const checkCategories = async () => {
    questionsMultiOne = await cache.get(asyncNames.questionsMultiOne);
    questionsMultiTwo = await cache.get(asyncNames.questionsMultiTwo);
    questionsMultiThree = await cache.get(asyncNames.questionsMultiThree);
    questionsMultiFour = await cache.get(asyncNames.questionsMultiFour);
    questionsMultiOneNoTimer = await cache.get(
      asyncNames.questionsMultiOneNoTimer
    );
    questionsMultiTwoNoTimer = await cache.get(
      asyncNames.questionsMultiTwoNoTimer
    );
    questionsMultiThreeNoTimer = await cache.get(
      asyncNames.questionsMultiThreeNoTimer
    );
    questionsMultiFourNoTimer = await cache.get(
      asyncNames.questionsMultiFourNoTimer
    );
  };

  checkCategories().then(() => {
    if (
      !!questionsMultiOne ||
      !!questionsMultiTwo ||
      !!questionsMultiThree ||
      !!questionsMultiFour ||
      !!questionsMultiOneNoTimer ||
      !!questionsMultiTwoNoTimer ||
      !!questionsMultiThreeNoTimer ||
      !!questionsMultiFourNoTimer
    ) {
      setGamesStatus({
        questionsMultiOne: !!questionsMultiOne,
        questionsMultiTwo: !!questionsMultiTwo,
        questionsMultiThree: !!questionsMultiThree,
        questionsMultiFour: !!questionsMultiFour,
        questionsMultiOneNoTimer: !!questionsMultiOneNoTimer,
        questionsMultiTwoNoTimer: !!questionsMultiTwoNoTimer,
        questionsMultiThreeNoTimer: !!questionsMultiThreeNoTimer,
        questionsMultiFourNoTimer: !!questionsMultiFourNoTimer,
      });
    }
  });
};
