

import { Link } from "react-router-dom";
import LinkText from "../../components/UI/LinkText";

interface ShowAnswerTrueFalseProps {
  setShowAnswer: Function,
  lastQuestion: number,
  numOfRemainQuestions: number,
  setStadiumIsFinished: Function,
  nextQuestion: Function,
  currentGuestionAnswer: string,
  currentGuestionSource: string,
}

const ShowAnswerTrueFalse = ({
  setShowAnswer,
  lastQuestion,
  numOfRemainQuestions,
  setStadiumIsFinished,
  nextQuestion,
  currentGuestionAnswer,
  currentGuestionSource,
}: ShowAnswerTrueFalseProps) => {
  return (
    <section>
      <div >
        <div >
          <img
            src="assets/panagia-glykofilousa.jpg"
            alt='icon of Theotokos'
          />
        </div>
        <div
          onClick={() => {
            setShowAnswer(false);
            if (lastQuestion || numOfRemainQuestions === 0) {
              setStadiumIsFinished(true);
            } else {
              nextQuestion();
            }
          }}
        >
          {/* <MaterialIcons
            name="queue-play-next"
            size={Math.ceil(width * 0.09)}
            color={Colours.maroon}
          /> */}
        </div>
      </div>
      <p >{currentGuestionAnswer}</p>
      <Link to={currentGuestionSource}>
        {!!currentGuestionSource && (
          <LinkText>{currentGuestionSource}</LinkText>
        )}
      </Link>
    </section>
  );
};

export default ShowAnswerTrueFalse;
