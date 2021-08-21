export default calculateInitialTimeTrueFalse = (
  index,
  questionTitle,
  setSeconds,
  setMilliSeconds,
  setMinutes
) => {
  if (!!questionTitle[index]) {
    const quest = questionTitle[index];

    const questionlength = Math.floor(quest.length / 7);

    const minutesToGo = Math.floor(questionlength / 60);
    const secondsToGo = questionlength - minutesToGo * 60;
    setMinutes(minutesToGo);
    setSeconds(secondsToGo);
    setMilliSeconds((minutesToGo * 60 + secondsToGo) * 1000);
  }
};
