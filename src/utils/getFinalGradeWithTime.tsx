import cache from "./cache";
import strings from "../constants/strings";

const getFinalGradeWithTime = async (
  type: string,
  lastQuestionMinutesLeft: number,
  lastQuestionSecondsLeft: number,
  setLastQuestionMinutesLeft: Function,
  setLastQuestionSecondsLeft: Function,
  setTotalPointsWithTime: Function,
  totalPoints: number,
  totalTimeLeft: number
) => {
  let lastQuestionSecondsLeftMixed_str = "",
    lastQuestionMinutesLeftMixed_str = "";
  if (type === "Mixed") {
    lastQuestionSecondsLeftMixed_str = await cache.get(
      strings.lastQuestionSecondsMultiMixed
    );
    lastQuestionMinutesLeftMixed_str = await cache.get(
      strings.lastQuestionMinutesMultiMixed
    );
  }
  if (type === "MultiChoice") {
    lastQuestionSecondsLeftMixed_str = await cache.get(
      strings.lastQuestionSecondsMulti
    );
    lastQuestionMinutesLeftMixed_str = await cache.get(
      strings.lastQuestionMinutesMulti
    );
  }
  if (type === "TrueFalse") {
    lastQuestionSecondsLeftMixed_str = await cache.get(
      strings.lastQuestionSecondsTrueFalse
    );
    lastQuestionMinutesLeftMixed_str = await cache.get(
      strings.lastQuestionMinutesTrueFalse
    );
  }

  setLastQuestionSecondsLeft(parseInt(lastQuestionSecondsLeftMixed_str));
  setLastQuestionMinutesLeft(parseInt(lastQuestionMinutesLeftMixed_str));

  let minutesLeft = Math.floor(
    (+totalTimeLeft + +lastQuestionMinutesLeft + +lastQuestionSecondsLeft) / 60
  );

  let secondsLeft = (+totalTimeLeft + +lastQuestionSecondsLeft) % 60;

  if (totalTimeLeft + lastQuestionSecondsLeft < 59)
    secondsLeft = totalTimeLeft + lastQuestionSecondsLeft;

  if (+lastQuestionSecondsLeft + secondsLeft > 59)
    minutesLeft += Math.floor((+lastQuestionSecondsLeft + secondsLeft) / 60);

  let grade = 0;
  // For some reason TrueFalse does not need the minutesLeft or secondsLeft
  if (type === "TrueFalse") {
    grade = (+totalTimeLeft + +totalPoints) * 10;
  } else if (type !== "TrueFalse") {
    if (+minutesLeft === 0) grade = (secondsLeft + +totalPoints) * 10;
    else
      grade = (+totalTimeLeft + minutesLeft + secondsLeft + +totalPoints) * 10;
  }

  const finalGrade = grade.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
  setTotalPointsWithTime(finalGrade);

  // return { grade };
};

export default getFinalGradeWithTime;