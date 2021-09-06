import cache from "./cache";
import strings from "../constants/strings";

const checkIfMixGameIsOn = (
  gameType: string,
  setModalVisible: Function,
) => {
  let mixGameIsOn = false,
    mixGameIsOnNoTimer = false,
    mixGameIsOnTF = false,
    mixGameIsOnNoTimerTF = false;

  const checking = async () => {
    if (gameType === "Multi") {
      mixGameIsOn = await cache.get(strings.mixGameIsOnMulti);
      mixGameIsOnNoTimer = await cache.get(strings.mixGameIsOnMultiNoTimer);

      if (mixGameIsOn || mixGameIsOnNoTimer) setModalVisible(true);
    } else if (gameType === "TrueFalse") {
      mixGameIsOnTF = await cache.get(strings.mixGameIsOnTrueFalse);
      mixGameIsOnNoTimerTF = await cache.get(
        strings.mixGameIsOnTrueFalseNoTimer
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