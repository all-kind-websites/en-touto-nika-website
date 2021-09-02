import '../../styles/UI/top-menu.scss';

interface TopMenuProps {
  categoryTitle: string,
  showAnswer: boolean,
  numOfDownloadedQuestions: number,
  numOfTotalQuestions: number,
  // onRefresh: Function,
  setStadiumIsFinished: Function,
  totalPoints: number,
}
const TopMenu = ({
  categoryTitle,
  showAnswer,
  numOfDownloadedQuestions,
  numOfTotalQuestions,
  // onRefresh,
  setStadiumIsFinished,
  totalPoints,
}: TopMenuProps) => {
  return (
    <article className='top-menu' >
      <h3 className='category-title' >
        {categoryTitle}
      </h3>
      <div className='questions-container' >
        <h4 >Ερωτήσεις</h4>
        <h5 >
          {numOfTotalQuestions} / {numOfDownloadedQuestions - 1}
        </h5>
      </div>
      <div className='icon-container' >
        <img
          src="assets/panagia-glykofilousa.jpg"
          alt='icon of Theotokos'
        />
      </div>
      <div className='right-container' >
        <h4 >Σωστές</h4>
        <h5 >{totalPoints}</h5>
      </div>
    </article >
  );
};

export default TopMenu;