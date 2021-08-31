import cache from "./cache";
import asyncNames from "../constants/asyncNames";
import navNames from "../constants/navNames";
import { history } from '../App';

const startMixGame = async (
  categoryIsChosen: boolean,
  gameType: string,
  timer: boolean
) => {
  console.log('startMixGame', categoryIsChosen, gameType, timer);
  if (categoryIsChosen) {
    if (gameType === "Multi") {
      if (timer) {
        await cache.set(asyncNames.useTimerMultiMixed, true);
        history.replace(navNames.mixMultiGameWithTimer)
      }
      if (!timer) {
        await cache.set(asyncNames.useTimerMultiMixed, false);
        history.replace(navNames.mixMultiGameNoTimer)

      }
    } else if (gameType === "TrueFalse") {
      if (timer) {
        await cache.set(asyncNames.useTimerTrueFalseMixed, true);
        history.replace(navNames.mixTrueFalseGameWithTimer)

        if (!timer) {
          await cache.set(asyncNames.useTimerTrueFalseMixed, false);
          history.replace(navNames.mixTrueFalseGameNoTimer)

        }
      }
    }
  }
};
export default startMixGame;