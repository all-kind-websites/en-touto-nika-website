import '../../styles/UI/choice-text.scss';

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
    if (key === choiceText)
      question = selectedQuestion[key]
    else if (key === choiceText)
      question = selectedQuestion[key]
    else if (key === choiceText)
      question = selectedQuestion[key]
    else if (key === choiceText)
      question = selectedQuestion[key]
  }
  return (
    <div
      className='choice-text'
      onClick={async () => {
        await cache.set(choice, true);
        setChoiceSave(true);
        setTimeout(() => {
          saveAnswer();
        }, 400);
      }}
    >
      <div className='choice-container' >
        <h4 className='choice-letter' >{choiceLetter}</h4>
        <p className='choice-question'>
          {question}
        </p>
      </div>
    </div>
  );
};


export default ChoiceText;