import cache from "./cache";
import strings from "../constants/strings";

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
    questionsMultiOne = await cache.get(strings.questionsMultiOne);
    questionsMultiTwo = await cache.get(strings.questionsMultiTwo);
    questionsMultiThree = await cache.get(strings.questionsMultiThree);
    questionsMultiFour = await cache.get(strings.questionsMultiFour);
    questionsMultiOneNoTimer = await cache.get(
      strings.questionsMultiOneNoTimer
    );
    questionsMultiTwoNoTimer = await cache.get(
      strings.questionsMultiTwoNoTimer
    );
    questionsMultiThreeNoTimer = await cache.get(
      strings.questionsMultiThreeNoTimer
    );
    questionsMultiFourNoTimer = await cache.get(
      strings.questionsMultiFourNoTimer
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