import cache from "./cache";
import asyncNames from "../constants/asyncNames";
import navNames from "../constants/navNames";

const startMixGame = async (
  navigation: any,
  categoryIsChosen: boolean,
  timer: boolean,
  gameType: string
) => {
  if (categoryIsChosen) {
    if (gameType === "Multi") {
      if (timer) {
        await cache.set(asyncNames.useTimerMultiMixed, true);
        navigation.navigate({
          name: navNames.mixedMultiGame,
          params: { gameType, timer },
        });
      }
      if (!timer) {
        await cache.set(asyncNames.useTimerMultiMixed, false);
        navigation.navigate({
          name: navNames.noTimerMixedGame,
          params: { gameType, timer },
        });
      }
    } else if (gameType === "TrueFalse") {
      if (timer) {
        await cache.set(asyncNames.useTimerTrueFalseMixed, true);
        navigation.navigate({
          name: navNames.mixedTrueFalseGame,
          params: { gameType, timer },
        });
      }
      if (!timer) {
        await cache.set(asyncNames.useTimerTrueFalseMixed, false);
        navigation.navigate({
          name: navNames.trueFalseMixedGameNoTimer,
          params: { gameType, timer },
        });
      }
    }
  }
};
export default startMixGame;