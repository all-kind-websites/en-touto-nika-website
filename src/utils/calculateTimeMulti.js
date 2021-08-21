export default calculateTime = (
  selectedQuestion,
  setMinutes,
  setSeconds,
  setMilliSeconds
) => {
  const questionlength = Math.floor(
    JSON.stringify(selectedQuestion).length / 30
  );
  const minutesToGo = Math.floor(questionlength / 60);
  const secondsToGo = questionlength - minutesToGo * 60;
  setMinutes(minutesToGo);
  setSeconds(secondsToGo);
  setMilliSeconds((minutesToGo * 60 + secondsToGo) * 1000);
};
