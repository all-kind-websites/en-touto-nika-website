import React from "react";

export default setTimer = (
  seconds,
  setSeconds,
  numOfTotalQuestions,
  minutes,
  setCorrectChoice,
  setChoiceSave,
  saveAnswer,
  setMinutes,
  choiceSave,
  stadiumIsFinished,
  timerAnimation,
  timerOpacity
) => {
  const myInterval = setInterval(() => {
    if (seconds > 0) {
      setSeconds((seconds) => seconds - 1);
    }
    // Use also numOfTotalQuestions to not triger when game starts
    // and all is 0.
    if (seconds === 0 && numOfTotalQuestions >= 1) {
      if (minutes === 0 && numOfTotalQuestions >= 1) {
        clearInterval(myInterval);
        timerAnimation.setValue(1);
        timerOpacity.setValue(0);
        setCorrectChoice(false);
        setChoiceSave(true);
        saveAnswer();
      } else {
        setMinutes((minutes) => minutes - 1);
        setSeconds(59);
      }
    }
  }, 1000);
  if (stadiumIsFinished) {
    clearInterval(myInterval);
  }
  if (choiceSave) {
    timerAnimation.stopAnimation();
    timerOpacity.stopAnimation();
    clearInterval(myInterval);
  }
  return { myInterval };
};
