import cache from "./cache";
import asyncNames from "../constants/asyncNames";

const getGameStatusMulti = (setGamesStatus: Function) => {

  let questionsMultiOne: Array<object> = [];
  let questionsMultiTwo: Array<object> = [];
  let questionsMultiThree: Array<object> = [];
  let questionsMultiFour: Array<object> = [];
  let questionsMultiOneNoTimer: Array<object> = [];
  let questionsMultiTwoNoTimer: Array<object> = [];
  let questionsMultiThreeNoTimer: Array<object> = [];
  let questionsMultiFourNoTimer: Array<object> = [];

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

export default getGameStatusMulti;