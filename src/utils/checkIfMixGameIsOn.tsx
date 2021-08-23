import cache from "./cache";
import asyncNames from "../constants/asyncNames";

const checkIfMixGameIsOn = (
  navigation: any,
  setDisableTimerButton: Function,
  setModalVisible: Function,
  gameType: string,
  timer: any
) => {
  let mixGameIsOn = false,
    mixGameIsOnNoTimer = false,
    mixGameIsOnTF = false,
    mixGameIsOnNoTimerTF = false;

  const checking = async () => {
    if (gameType === "Multi") {
      mixGameIsOn = await cache.get(asyncNames.mixGameIsOnMulti);
      mixGameIsOnNoTimer = await cache.get(asyncNames.mixGameIsOnMultiNoTimer);

      if (mixGameIsOn || mixGameIsOnNoTimer) setModalVisible(true);
    } else if (gameType === "TrueFalse") {
      mixGameIsOnTF = await cache.get(asyncNames.mixGameIsOnTrueFalse);
      mixGameIsOnNoTimerTF = await cache.get(
        asyncNames.mixGameIsOnTrueFalseNoTimer
      );

      if (mixGameIsOnTF || mixGameIsOnNoTimerTF) setModalVisible(true);
    }
  };
  return {
    checking,
    mixGameIsOn,
    mixGameIsOnNoTimer,
    mixGameIsOnTF,
    mixGameIsOnNoTimerTF,
  };
};

export default checkIfMixGameIsOn;