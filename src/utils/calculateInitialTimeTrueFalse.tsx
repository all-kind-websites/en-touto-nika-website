const calculateInitialTimeTrueFalse = (
  index: number,
  questionTitle: Array<string>,
  setSeconds: Function,
  setMilliSeconds: Function,
  setMinutes: Function
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
export default calculateInitialTimeTrueFalse
