const calculateFinalTimeLeft = (
  lastQuestionMinutesLeft: number,
  lastQuestionSecondsLeft: number,
  totalTimeLeft: number,
  type: string
) => {
  let minutesLeft = Math.floor(
    (+totalTimeLeft + +lastQuestionMinutesLeft + +lastQuestionSecondsLeft) / 60
  );

  let secondsLeft;
  if (type === "TrueFalse") secondsLeft = +totalTimeLeft % 60;
  else secondsLeft = (+totalTimeLeft + +lastQuestionSecondsLeft) % 60;

  if (totalTimeLeft + lastQuestionSecondsLeft < 59)
    secondsLeft = +totalTimeLeft + +lastQuestionSecondsLeft;

  if (lastQuestionSecondsLeft + secondsLeft > 59 && minutesLeft < 1) {
    minutesLeft += Math.ceil((+lastQuestionSecondsLeft + secondsLeft) / 60);
    secondsLeft += Math.ceil(
      ((+lastQuestionSecondsLeft + secondsLeft) / 60) % 60
    );
  }
  return { minutesLeft, secondsLeft };
};

export default calculateFinalTimeLeft;