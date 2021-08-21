import cache from "./cache";
import asyncNames from "../constants/asyncNames/asyncNames";
import navNames from "../constants/navNames/navNames";

export default startMixGame = async (
  navigation,
  categoryIsChosen,
  timer,
  gameType
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
          name: navNames.noTimerTrueFalseMixedGame,
          params: { gameType, timer },
        });
      }
    }
  }
};
