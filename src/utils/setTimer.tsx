const setTimer = (
  seconds: number,
  setSeconds: Function,
  numOfTotalQuestions: number,
  minutes: number,
  setCorrectChoice: Function,
  setChoiceSave: Function,
  saveAnswer: Function,
  setMinutes: Function,
  choiceSave: boolean,
  stadiumIsFinished: boolean,
  timerAnimation: any,
  timerOpacity: any
) => {
  const myInterval = setInterval(() => {
    if (seconds > 0) {
      setSeconds((seconds: number) => seconds - 1);
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
        setMinutes((minutes: number) => minutes - 1);
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

export default setTimer