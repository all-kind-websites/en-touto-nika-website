
// import Colours from "../../constants/Colours";

import TopMenu from "../UI/TopMenu";
import ChoiceText from "../UI/ChoiceText";
import DetailedAnswer from "../UI/DetailedAnswer";
import { Question } from "../../models/question";
import colors from "../../constants/colors";
// import OptionsModalMulti from "./OptionsModalMulti";
interface showQuestionProps {
  alfaIsTrue: boolean,
  betaIsTrue: boolean,
  gammaIsTrue: boolean,
  deltaIsTrue: boolean,
  categoryId: string,
  gameType: string,
  choiceSave: boolean,
  correctChoice: boolean,
  onRefresh: Function,
  refreshing: number,
  saveAnswer: Function,
  showAnswer: Function,
  numOfDownloadedQuestions: number,
  numOfTotalQuestions: number,
  selectedQuestion: Question,
  quit: Function,
  setChoiceSave: Function,
  setNumOfTotalQuestions: Function,
  setShowAnswer: Function,
  setStadiumIsFinished: Function,
  timer: boolean,
  totalPoints: number
}

const showQuestion = (
  alfaIsTrue: string,
  betaIsTrue: string,
  gammaIsTrue: string,
  deltaIsTrue: string,
  checkAlfa: boolean,
  checkBeta: boolean,
  categoryId: boolean,
  gameType: string,
  checkGamma: boolean,
  checkDelta: boolean,
  choiceSave: boolean,
  correctChoice: boolean,
  refreshing: boolean,
  saveAnswer: Function,
  showAnswer: boolean,
  numOfDownloadedQuestions: number,
  numOfTotalQuestions: number,
  selectedQuestion: Question | null,
  quit: Function,
  setCheckAlfa: Function,
  setCheckBeta: Function,
  setCheckGamma: Function,
  setCheckDelta: Function,
  setChoiceSave: Function,
  setNumOfTotalQuestions: Function,
  setShowAnswer: Function,
  setStadiumIsFinished: Function,
  timer: boolean,
  totalPoints: number
) => {
  let categoryTitle = "";
  if (!!selectedQuestion) {
    if (selectedQuestion.categoryIds === "c1") {
      categoryTitle = "Καινή Διαθήκη";
    } else if (selectedQuestion.categoryIds === "c2") {
      categoryTitle = "Παλαιά Διαθήκη";
    } else if (selectedQuestion.categoryIds === "c3") {
      categoryTitle = "Συναξάρι";
    } else if (selectedQuestion.categoryIds === "c4") {
      categoryTitle = "Αγιοπνευματική ζωή";
    }
  }

  for (const key in selectedQuestion) {
    return (
      <section>
        <TopMenu
          categoryTitle={categoryTitle}
          showAnswer={showAnswer}
          numOfDownloadedQuestions={numOfDownloadedQuestions}
          numOfTotalQuestions={numOfTotalQuestions}
          // onRefresh={onRefresh}
          setStadiumIsFinished={setStadiumIsFinished}
          totalPoints={totalPoints}

        />

        {showAnswer ? <DetailedAnswer selectedQuestion={selectedQuestion} /> : null}
        <article style={{ marginBottom: 20 }} >
          <h4 style={{ marginLeft: 10, marginBottom: 20, fontFamily: "MS Tahoma", color: colors.maroon, width: 500 }} >
            {selectedQuestion.title}
          </h4>
          <ChoiceText
            choiceIsMade={checkAlfa}
            choice={alfaIsTrue}
            choiceLetter={"A"}
            disabled={choiceSave}
            choiceText={"choice_Alpha"}
            selectedQuestion={selectedQuestion}
            saveAnswer={saveAnswer}
            setStyle={setCheckAlfa}
            setChoiceSave={setChoiceSave}
          />
          <ChoiceText
            choiceIsMade={checkBeta}
            choice={betaIsTrue}
            choiceLetter={"B"}
            disabled={choiceSave}
            choiceText={"choice_Beta"}
            selectedQuestion={selectedQuestion}
            saveAnswer={saveAnswer}
            setStyle={setCheckBeta}
            setChoiceSave={setChoiceSave}
          />
          <ChoiceText
            choiceIsMade={checkGamma}
            choice={gammaIsTrue}
            choiceLetter={"Γ"}
            disabled={choiceSave}
            choiceText={"choice_Gamma"}
            selectedQuestion={selectedQuestion}
            saveAnswer={saveAnswer}
            setStyle={setCheckGamma}
            setChoiceSave={setChoiceSave}
          />
          <ChoiceText
            choiceIsMade={checkDelta}
            choice={deltaIsTrue}
            choiceLetter={"Δ"}
            disabled={choiceSave}
            choiceText={"choice_Delta"}
            selectedQuestion={selectedQuestion}
            saveAnswer={saveAnswer}
            setStyle={setCheckDelta}
            setChoiceSave={setChoiceSave}
          />
        </article>
      </section>
    );
  }
};

export default showQuestion;