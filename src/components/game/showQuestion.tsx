import { Prompt } from 'react-router-dom'

import TopMenu from "../UI/TopMenu";
import ChoiceText from "../UI/ChoiceText";
import DetailedAnswer from "../UI/DetailedAnswer";
import { Question } from "../../models/question";
import colors from "../../constants/colors";

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
  saveAnswer: Function,
  showAnswer: boolean,
  numOfDownloadedQuestions: number,
  numOfTotalQuestions: number,
  onRefresh: Function,
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
  totalPoints: number,
  modalVisible: boolean,

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
      <article style={{ width: 500 }} >
        <Prompt
          when={!choiceSave}
          message='Αν δεν απαντήσετε την ερώτηση θα την χάσετε! Θέλετε να εγκαταλείψετε το παιχνίδι;'
        />
        <TopMenu
          categoryTitle={categoryTitle}
          numOfDownloadedQuestions={numOfDownloadedQuestions}
          numOfTotalQuestions={numOfTotalQuestions}
        />

        {choiceSave ?
          <DetailedAnswer
            onRefresh={onRefresh}
            selectedQuestion={selectedQuestion}
          /> : null
        }

        <section style={{ marginBottom: 20 }} >
          <h4
            style={{
              marginBottom: 20, fontFamily: "MS Tahoma", color: colors.maroon,
              padding: 10, width: 500
            }}
          >
            {selectedQuestion.title}
          </h4>
          <ChoiceText
            choiceIsMade={checkAlfa}
            correctChoice={correctChoice}
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
            correctChoice={correctChoice}
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
            correctChoice={correctChoice}
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
            correctChoice={correctChoice}
            choice={deltaIsTrue}
            choiceLetter={"Δ"}
            disabled={choiceSave}
            choiceText={"choice_Delta"}
            selectedQuestion={selectedQuestion}
            saveAnswer={saveAnswer}
            setStyle={setCheckDelta}
            setChoiceSave={setChoiceSave}
          />
        </section>
      </article>
    );
  }
};

export default showQuestion;