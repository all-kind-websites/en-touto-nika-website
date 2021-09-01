
interface TopMenuProps {
  categoryTitle: string,
  showAnswer: boolean,
  numOfDownloadedQuestions: number,
  numOfTotalQuestions: number,
  onRefresh: Function,
  setStadiumIsFinished: Function,
  totalPoints: number,
}
const TopMenu = ({
  categoryTitle,
  showAnswer,
  numOfDownloadedQuestions,
  numOfTotalQuestions,
  onRefresh,
  setStadiumIsFinished,
  totalPoints,
}: TopMenuProps) => {
  return (
    <article >
      <h4 >{categoryTitle}</h4>
      <div >
        <div style={{ flexDirection: "column" }}>
          <h5 >Ερωτήσεις</h5>
          <h6 >
            {numOfTotalQuestions} / {numOfDownloadedQuestions - 1}
          </h6>
        </div>
        <div >
          <img
            src="assets/panagia-glykofilousa.jpg"
            alt='icon of Theotokos'
          />
        </div>
        <div >
          <h5 >Σωστές</h5>
          <h6 >{totalPoints}</h6>
        </div>
      </div>
      <div >
        {showAnswer ? (
          <div
            onClick={
              +numOfDownloadedQuestions - 1 === 0
                ? () => setStadiumIsFinished(true)
                : () => onRefresh
            }

          >
            {/* <MaterialIcons
              name="queue-play-next"
              size={Math.ceil(width * 0.09)}
              color={Colours.maroon}
            /> */}
          </div>
        ) : null}
      </div>
    </article >
  );
};

export default TopMenu;