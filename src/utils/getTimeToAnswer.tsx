import cache from "./cache";
import asyncNames from "../constants/asyncNames";

const getTimeToAnswer = (
  minutes: number,
  seconds: number,
  correctChoice: boolean,
  type: string,
  categoryId: string
) => {
  // Above, keep the order:  minutes, seconds,correctChoice, type, categoryId,
  // because categoryId is only needed for MultiChoiceScreen.
  if (correctChoice) {
    let active_TotalTimeLeft = 0;
    if (minutes > 0) {
      active_TotalTimeLeft = minutes * 60 + seconds;
    } else {
      active_TotalTimeLeft = seconds;
    }

    const getTime = async (totalTimeLeft: string) => {
      if (type === "Mixed") {
        await cache.set(asyncNames.lastQuestionSecondsMultiMixed, seconds);
        await cache.set(asyncNames.lastQuestionMinutesMultiMixed, minutes);
      }
      if (type === "MultiChoice") {
        await cache.set(asyncNames.lastQuestionSecondsMulti, seconds);
        await cache.set(asyncNames.lastQuestionMinutesMulti, minutes);
      }
      if (type === "TrueFalse") {
        await cache.set(asyncNames.lastQuestionSecondsTrueFalse, seconds);
        await cache.set(asyncNames.lastQuestionMinutesTrueFalse, minutes);
      }

      const totalTimeLeft_Str = await cache.get(totalTimeLeft);
      await cache.remove(totalTimeLeft);
      let old_TotalTimeLeft_Int = parseInt(totalTimeLeft_Str);
      if (!old_TotalTimeLeft_Int) {
        old_TotalTimeLeft_Int = 0;
      }
      const new_TotalTimeLeft_Int =
        old_TotalTimeLeft_Int + active_TotalTimeLeft;
      const tobeSaved_TotalTimeLeft_Str = new_TotalTimeLeft_Int.toString();
      // console.log(
      //   "getTimeToAnswer",
      //   tobeSaved_TotalTimeLeft_Str,
      //   active_TotalTimeLeft,
      //   seconds
      // );
      await cache.set(totalTimeLeft, tobeSaved_TotalTimeLeft_Str);
    };

    if (categoryId) {
      if (categoryId === "c1") {
        getTime(`totalTimeLeft${type}One`);
      } else if (categoryId === "c2") {
        getTime(`totalTimeLeft${type}Two`);
      } else if (categoryId === "c3") {
        getTime(`totalTimeLeft${type}Three`);
      } else if (categoryId === "c4") {
        getTime(`totalTimeLeft${type}Four`);
      }
    } else {
      getTime(`totalTimeLeft${type}`);
    }
  }
};
export default getTimeToAnswer;