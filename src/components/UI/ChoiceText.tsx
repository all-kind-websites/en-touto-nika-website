

import cache from "../../utils/cache";
interface ChoiceTextProps {
  choice: string,
  choiceLetter: string,
  choiceSave: boolean,
  choiceText: string,
  selectedQuestion: any,
  saveAnswer: Function,
  setChoiceSave: Function,
}

const ChoiceText = ({
  choice,
  choiceLetter,
  choiceSave,
  choiceText,
  selectedQuestion,
  saveAnswer,
  setChoiceSave,
}: ChoiceTextProps) => {
  let question = '';
  let key: any;

  for (key in selectedQuestion) {
    if (selectedQuestion[key] === "choice_Alpha")
      question = selectedQuestion[key]
    else if (selectedQuestion[key] === "choice_Beta")
      question = selectedQuestion[key]
    else if (selectedQuestion[key] === "choice_Gamma")
      question = selectedQuestion[key]
    else if (selectedQuestion[key] === "choice_Delta")
      question = selectedQuestion[key]
  }

  return (
    <>
      <section

        onClick={async () => {
          await cache.set(choice, true);
          setChoiceSave(true);
          setTimeout(() => {
            saveAnswer();
          }, 400);
        }}
      >
        <div>
          <h4 >{choiceLetter}</h4>
          <p >
            {question}
          </p>
        </div>
      </section>
    </>
  );
};


export default ChoiceText;