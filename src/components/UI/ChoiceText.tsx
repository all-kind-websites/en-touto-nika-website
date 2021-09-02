import colors from '../../constants/colors';
import '../../styles/UI/choice-text.scss';

import cache from "../../utils/cache";
interface ChoiceTextProps {
  choiceIsMade: boolean,
  choice: string,
  choiceLetter: string,
  disabled: boolean,
  choiceText: string,
  selectedQuestion: any,
  saveAnswer: Function,
  setChoiceSave: Function,
  setStyle: Function,
}

const ChoiceText = ({
  choiceIsMade,
  choice,
  choiceLetter,
  disabled,
  choiceText,
  selectedQuestion,
  saveAnswer,
  setChoiceSave,
  setStyle,
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

  const styles = {
    choice: {
      color: colors.maroon,
      marginTop: 10,
      marginBottom: 4,
      textAlign: "left",
    },
    choiceIsMade: {
      flex: 1,
      padding: 10,
      marginVertical: 2,
      marginHorizontal: 2,
      borderRadius: 10,
      shadowColor: "white",
      shadowOpacity: 0.6,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 10,
      backgroundColor: "rgba(210,105,30, 0.5)", // if choice correct green color
    },
    none: {}
  }

  return (
    <div
      className={`choice-text ${disabled ? 'disabled' : ''}`}
      onClick={async () => {
        console.log('click');
        await cache.set(choice, true);
        setStyle(true);
        setChoiceSave(true);
        setTimeout(() => {
          saveAnswer();
        }, 400);
      }}
    >
      <div className='choice-container' >
        <h4 className='choice-letter' >{choiceLetter}</h4>
        <p className='choice-question' style={choiceIsMade ? styles.choiceIsMade : styles.none}>
          {question}
        </p>
      </div>
    </div>
  );
};




export default ChoiceText;